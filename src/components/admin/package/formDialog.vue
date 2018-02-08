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
            <v-form v-model="stepOneValid" ref="form" lazy-validation class="pa-2">
              <v-text-field
                  label="URL source"
                  v-model="form.url_source"
                  :rules="rules.url_source"
                  required
              ></v-text-field>
              <v-checkbox
                v-model="form.upload_from_url"
                label="Upload from URL"
              ></v-checkbox>
            </v-form>
        </div>
        <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div>
            <v-form v-model="stepOneValid" ref="form" lazy-validation class="pa-2">
              <v-text-field
                  label="Display Name"
                  v-model="form.display_name"
                  :rules="rules.display_name"
                  required
              ></v-text-field>
              <v-text-field
                  label="Version"
                  v-model="form.version"
                  :rules="rules.version"
                  required
              ></v-text-field>
              <v-text-field
                  label="Type"
                  v-model="form.type"
                  :rules="rules.type"
                  required
              ></v-text-field>
              <v-text-field
                  label="Description"
                  v-model="form.description"
                  :rules="rules.description"
                  required
                  multi-line
              ></v-text-field>
            </v-form>
        </div>
        <v-btn color="primary" @click="back">Previous</v-btn>
        <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <div>
            <v-form v-model="stepOneValid" ref="form" lazy-validation class="pa-2">
              <v-select
                label="Must Install"
                :items="mustInstallOptions"
                v-model="form.must_install"
              ></v-select>
              <v-text-field
                  label="Developer License Key (Optional)"
                  v-model="form.license_key"
              ></v-text-field>
            </v-form>
        </div>
        <v-btn color="primary" @click="back">Previous</v-btn>
        <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      stepOneValid: true,
      stepTwoValid: true,
      stepThreeValid: true,
      form: {
        url_source: '',
        display_name: '',
        version: '',
        type: '',
        description: '',
        must_install: false
      },
      rules: {
        url_source: [(v) => !!v || 'URL source is required'],
        display_name: [(v) => !!v || 'Display Name is required'],
        version: [(v) => !!v || 'Version is required'],
        type: [(v) => !!v || 'Type is required'],
        description: [(v) => !!v || 'Description is required']
      },
      mustInstallOptions: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ]
    }
  },
  props: ['showFormDialog'],
  methods: {
    back () {
      this.step--
    }
  }
}
</script>
