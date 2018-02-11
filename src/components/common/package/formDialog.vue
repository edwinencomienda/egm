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
                  v-if="uploadFromURL"
                  label="URL source"
                  v-model="url_source"
                  :rules="rules.url_source"
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
                v-model="uploadFromURL"
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
                  :rules="rules.display_name"
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
                  :rules="rules.author_uri"
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
              <v-switch label="Must Activate" v-model="form.must_install"></v-switch>
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

export default {
  data () {
    return {
      step: 1,
      stepOneValid: true,
      stepTwoValid: true,
      stepThreeValid: true,
      url_source: '',
      form: {
        must_install: false
      },
      rules: {
        url_source: [(v) => !!v || 'URL source is required'],
        display_name: [(v) => !!v || 'Display Name is required'],
        version: [(v) => !!v || 'Version is required'],
        type: [(v) => !!v || 'Type is required'],
        description: [(v) => !!v || 'Description is required'],
        author: [(v) => !!v || 'Author is required'],
        author_uri: [(v) => !!v || 'Author URI is required']
      },
      mustInstallOptions: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      file: '',
      uploadFromURL: false,
      fileName: '',
      isFileValid: false,
      uploading: false,
      disabled: false,
      finish: false
    }
  },
  props: ['showFormDialog'],
  watch: {
    uploadFromURL () {
      if (this.uploadFromURL === true) {
        this.resetForm()
      }
    },
    url_source () {
      this.onFileChange()
    }
  },
  methods: {
    nextStep () {
      this.step++
    },
    resetForm () {
      this.fileName = ''
      this.isFileValid = false
      this.url_source = ''
      this.uploading = false
    },
    back () {
      this.step--
    },
    chooseFile () {
      document.getElementById('file_input').click()
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
            this.nextStep()
            this.form = response.data
            this.url_source = response.data.Raw
            this.isFileValid = true
          }
        }).catch((error) => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: error
          })
          this.resetForm()
        })
        // this.isFileValid = true
      } else {
        this.isFileValid = false
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Invalid package file extension (must be zip file).'
        })
      }
    },
    savePackage () {
      let data = new FormData()
      data.set('folder_name', this.form.FolderName)
      data.set('display_name', this.form.Name)
      data.set('src', this.url_source)
      data.set('version', this.form.Version)
      data.set('type', this.form.Type)
      data.set('description', this.form.Description)
      data.set('metadata', this.form.Raw)
      data.set('must_install', this.must_install ? this.must_install : 0)
      this.uploading = true
      this.disabled = true
      this.$store.dispatch(types.common.package.PACKAGE_CREATE, data).then((response) => {
        if (response.status === 200) {
          this.$router.replace('/packages')
          swal({
            type: 'success',
            title: 'Package',
            text: 'Created Successfully!'
          })
        }
      }).catch((error) => {
        swal({
          type: 'error',
          title: 'Oops...',
          text: error
        })
        this.uploading = false
        this.resetForm()
      })
    },
    getFileExtension (fileName) {
      let i = fileName.lastIndexOf('.')
      if (i === -1) return false
      return fileName.slice(i)
    }
  }
}
</script>
