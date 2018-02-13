<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">Upload</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step > 2">Metadata</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Settings</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <div>
            <v-form v-model="stepOneValid" ref="formStepOne" lazy-validation class="pa-2">
              <v-text-field
                  v-if="uploadFromUrl"
                  label="URL source"
                  v-model="urlSource"
                  :rules="rules.urlSource"
                  @keyup="asyncFetch"
                  required
              ></v-text-field>
              <v-btn
                v-else
                :loading="uploading"
                @click="chooseFile"
                color="blue-grey"
                class="white--text"
              >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              {{ fileName }}
              <v-text-field
                  v-show="false"
                  @change.native="onFileChange"
                  id="file_input"
                  type="file"
              ></v-text-field>
              <v-checkbox
                class="mt-4"
                v-model="uploadFromUrl"
                label="Upload from URL"
              ></v-checkbox>
            </v-form>
        </div>
        <v-btn :disabled="!isFileValid" :loading="uploading" color="primary" @click.native="step = 2">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div>
            <v-form v-model="stepOneValid" ref="formStepTwo" lazy-validation class="pa-2">
              <v-text-field
                  label="Display Name"
                  v-model="form.Name"
                  :rules="rules.displayName"
                  required
              ></v-text-field>
              <v-text-field
                  label="Version"
                  v-model="form.Version"
                  :rules="rules.version"
                  required
              ></v-text-field>
              <v-text-field
                  label="Type"
                  v-model="form.Type"
                  :rules="rules.type"
                  required
              ></v-text-field>
              <v-text-field
                  label="Description"
                  v-model="form.Description"
                  :rules="rules.description"
                  required
                  multi-line
              ></v-text-field>
              <v-text-field
                  label="Author"
                  v-model="form.Author"
                  :rules="rules.author"
                  required
              ></v-text-field>
              <v-text-field
                  label="Author URI"
                  v-model="form.AuthorURI"
                  :rules="rules.authorUri"
                  required
              ></v-text-field>
              <v-text-field
                  label="Official URI"
                  v-model="form.PluginURI"
                  required
              ></v-text-field>
            </v-form>
        </div>
        <v-btn color="primary" @click="back">Previous</v-btn>
        <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <div>
            <v-form v-model="stepOneValid" ref="formStepThree" lazy-validation class="pa-2">
              <v-switch label="Must Activate" v-model="form.mustInstall"></v-switch>
            </v-form>
        </div>
        <v-btn color="primary" @click="back">Previous</v-btn>
        <v-btn color="primary" @click="savePackage" :loading="uploading" :disabled="disabled">Finish</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import swal from 'sweetalert2'
import { types } from '../../../store/types'
import _ from 'lodash'

export default {
  data () {
    return {
      step: 1,
      stepOneValid: true,
      stepTwoValid: true,
      stepThreeValid: true,
      urlSource: '',
      form: {
        mustInstall: false
      },
      rules: {
        urlSource: [(v) => !!v || 'URL source is required.'],
        display_name: [(v) => !!v || 'Display Name is required.'],
        version: [(v) => !!v || 'Version is required.'],
        type: [(v) => !!v || 'Type is required.'],
        description: [(v) => !!v || 'Description is required.'],
        author: [(v) => !!v || 'Author is required.'],
        authorUri: [(v) => !!v || 'Author URI is required.']
      },
      file: '',
      uploadFromUrl: false,
      fileName: '',
      isFileValid: false,
      uploading: false,
      disabled: false,
      finish: false,
      rawData: ''
    }
  },
  props: ['closeFormDialog'],
  watch: {
    uploadFromUrl () {
      if (this.uploadFromUrl === true) {
        this.resetForm()
      }
    }
  },
  methods: {
    nextStep () {
      this.step++
    },
    resetForm () {
      this.fileName = ''
      this.isFileValid = false
      this.uploading = false
    },
    back () {
      this.step--
    },
    chooseFile () {
      document.getElementById('file_input').click()
    },
    url () {
      this.uploading = true
      this.$store.dispatch(types.common.package.UPLOAD_FILE, {'src': this.urlSource}).then((response) => {
        if (response.status === 200) {
          this.resetForm()
          this.nextStep()
          this.form = response.data
          this.isFileValid = true
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.resetForm()
      })
    },
    onFileChange (e) {
      this.fileName = e.target.files[0].name
      if (this.getFileExtension(this.fileName) === '.zip') {
        this.uploading = true
        let formData = new FormData()
        formData.append('src', e.target.files[0])
        this.$store.dispatch(types.common.package.UPLOAD_FILE, formData).then((response) => {
          if (response.status === 200) {
            this.resetForm()
            this.form = response.data
            this.nextStep()
            this.isFileValid = true
          }
        }).catch((error) => {
          this.$root.generalDefaultError(false, error)
          this.resetForm()
        })
        // this.isFileValid = true
      } else {
        this.isFileValid = false
        this.$root.generalDefaultError(false, 'Invalid package file extension (must be zip file).')
      }
    },
    savePackage () {
      let data = new FormData()
      data.set('folder_name', this.form.FolderName)
      data.set('display_name', this.form.Name)
      data.set('src', this.form.Source)
      data.set('version', this.form.Version)
      data.set('type', this.form.Type)
      data.set('description', this.form.Description)
      data.set('metadata', JSON.stringify(this.form.Raw))
      data.set('must_install', this.mustInstall ? 1 : 0)
      this.uploading = true
      this.disabled = true
      this.$store.dispatch(types.common.package.PACKAGE_CREATE, data).then((response) => {
        if (response.status === 200) {
          this.closeFormDialog()
          swal({
            type: 'success',
            title: 'Package',
            text: 'Created Successfully!'
          })
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.uploading = false
        this.resetForm()
      })
    },
    getFileExtension (fileName) {
      let i = fileName.lastIndexOf('.')
      return i === -1 ? false : fileName.slice(i)
    },
    asyncFetch: _.debounce(function () {
      this.uploading = true
      this.$store.dispatch(types.common.package.UPLOAD_FILE, {'src': this.urlSource}).then((response) => {
        if (response.status === 200) {
          this.resetForm()
          this.nextStep()
          this.form = response.data
          this.isFileValid = true
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.resetForm()
      })
    }, 300)
  }
}
</script>
