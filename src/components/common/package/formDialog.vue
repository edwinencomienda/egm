<template>
  <div>
    <v-card-title class="headline">{{ !formState ? 'Upload Package' : 'Update Package' }}</v-card-title>
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
          <v-btn :disabled="!isFileValid && formState !== 'edit'" :loading="uploading" color="primary" @click.native="step = 2">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div>
              <v-form v-model="stepTwoValid" ref="formStepTwo" lazy-validation class="pa-2">
                <v-text-field
                    label="Display Name"
                    v-model="form.Name"
                    :rules="rules.displayName"
                    required
                    :disabled="fieldDisabled"
                ></v-text-field>
                <v-text-field
                    label="Version"
                    v-model="form.Version"
                    :rules="rules.version"
                    :disabled="fieldDisabled"
                ></v-text-field>
                <v-text-field
                    label="Type"
                    v-model="form.Type"
                    :rules="rules.type"
                    :disabled="fieldDisabled"
                ></v-text-field>
                <v-text-field
                    label="Description"
                    v-model="form.Description"
                    :rules="rules.description"
                    :disabled="fieldDisabled"
                    multi-line
                ></v-text-field>
                <v-text-field
                    label="Author"
                    v-model="form.Author"
                    :rules="rules.author"
                    :disabled="fieldDisabled"
                ></v-text-field>
                <v-text-field
                    label="Author URI"
                    v-model="form.authorURI"
                    :rules="rules.authorUri"
                    :disabled="fieldDisabled"
                ></v-text-field>
                <v-text-field
                    label="Official URI"
                    v-model="form.uri"
                    :disabled="fieldDisabled"
                ></v-text-field>
              </v-form>
          </div>
          <v-btn color="primary" @click="back">Previous</v-btn>
          <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>
              <v-form v-model="stepThreeValid" ref="formStepThree" lazy-validation class="pa-2">
                <v-switch label="Must Activate" color="green" v-model="form.mustInstall"></v-switch>
              </v-form>
          </div>
          <v-btn color="primary" @click="back">Previous</v-btn>
          <v-btn color="primary" @click="submitForm" :loading="uploading" :disabled="disabled">Finish</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        slug: '',
        Name: '',
        Description: '',
        Version: '',
        Type: '',
        Author: '',
        AuthorURI: '',
        PluginURI: '',
        mustInstall: true
      },
      rules: {
        urlSource: [(v) => !!v || 'URL source is required.'],
        display_name: [(v) => !!v || 'Display name is required.']
      },
      file: '',
      uploadFromUrl: false,
      fileName: '',
      isFileValid: false,
      uploading: false,
      disabled: false,
      finish: false,
      rawData: '',
      packageSlug: '',
      fieldDisabled: true
    }
  },
  computed: {
    ...mapGetters({
      editItem: 'editItem',
      formState: 'formState'
    })
  },
  props: ['closeFormDialog', 'showFormDialog'],
  watch: {
    showFormDialog () {
      // watch form state if edit then provide edit data else reset
      if (this.formState === 'edit') {
        this.packageSlug = this.editItem.Slug
        this.$refs.formStepTwo.reset()
        this.form = Object.assign({}, this.editItem)
      } else {
        this.resetForm()
      }
      this.step = 1
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
      this.uploadUrl = false
      this.$refs.formStepOne.reset()
      this.$refs.formStepTwo.reset()
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
          this.uploading = false
          this.isFileValid = true
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.resetForm()
      })
    },
    validateFolder (response, folderName) {
      // check if the form state is edit then it will check the file is the same on the current form object.
      if (this.formState === 'edit') {
        if (this.form.FolderName === folderName) {
          this.form = response
          this.form.uri = response.PluginURI || response.ThemeURI || response.URI
          this.nextStep()
          this.isFileValid = true
        } else {
          this.$root.generalDefaultError(false, 'You’re attempting to edit the package with a different one. This might cause issues.')
          this.resetForm()
          this.closeFormDialog()
        }
      } else {
        this.form = response
        this.form.uri = response.PluginURI || response.ThemeURI || response.URI
        this.nextStep()
        this.isFileValid = true
      }
    },
    onFileChange (e) {
      console.log(this.fileName)
      this.fileName = e.target.files[0].name
      if (this.getFileExtension(this.fileName) === '.zip') {
        this.uploading = true
        let formData = new FormData()
        formData.append('src', e.target.files[0])
        this.$store.dispatch(types.common.package.UPLOAD_FILE, formData).then((response) => {
          if (response.status === 200) {
            this.validateFolder(response.data, response.data.FolderName)
            this.uploading = false
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
    prepareData () {
      // prepare data to match naming convention
      let data = new FormData()
      data.set('package_slug', this.packageSlug)
      data.set('folder_name', this.form.FolderName)
      data.set('display_name', this.form.Name)
      data.set('official_uri', this.form.uri)
      data.set('src', this.form.Source ? this.form.Source : this.fileName)
      data.set('author', this.form.Author)
      data.set('author_uri', this.form.AuthorURI)
      data.set('version', this.form.Version)
      data.set('type', this.form.Type)
      data.set('description', this.form.Description)
      data.set('metadata', JSON.stringify(this.form.Raw))
      data.set('must_install', this.form.mustInstall ? 1 : 0)
      return data
    },
    submitForm () {
      if (this.formState !== 'edit') {
        this.savePackage()
      } else {
        this.updatePackage()
      }
    },
    savePackage () {
      let data = this.prepareData() // get prepared data
      this.uploading = true
      this.disabled = true
      this.$store.dispatch(types.common.package.PACKAGE_CREATE, data).then((response) => {
        if (response.status === 200) {
          this.$root.generalDefaultSuccess('Package', 'Created Successfully!')
          this.uploading = false
          this.closeFormDialog()
          this.resetForm()
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.uploading = false
      })
    },
    updatePackage () {
      let data = {
        data: this.prepareData(),
        package_slug: this.packageSlug
      } // get prepared data
      this.uploading = true
      this.disabled = true
      this.$store.dispatch(types.common.package.PACKAGE_UPDATE, data).then((response) => {
        if (response.status === 200) {
          this.closeFormDialog()
          this.$root.generalDefaultSuccess('Package', 'Successfully Updated!')
          this.disabled = false
          this.uploading = false
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.uploading = false
        this.disabled = false
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
          this.validateFolder(response.data, response.data.FolderName)
          this.uploading = false
        }
      }).catch((error) => {
        this.$root.generalDefaultError(false, error)
        this.resetForm()
      })
    }, 300) // every 300 milliseconds will execute the trigger
  }
}
</script>
