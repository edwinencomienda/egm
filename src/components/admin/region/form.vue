<template>
    <v-form v-model="valid" ref="form" lazy-validation class="pa-5">
        <v-text-field
            label="Display Name"
            v-model="form.displayName"
            :rules="displayNameRules"
            :counter="30"
            required
        ></v-text-field>
        <v-text-field
            label="ID"
            v-model="form.regionSlug"
            :rules="slugRules"
            :counter="30"
            required
            :disabled="edit ? true : false"
        ></v-text-field>
        <v-text-field
            label="ERM Endpoint"
            v-model="form.ermEndpoint"
            :rules="ermEndpointRules"
            :counter="100"
            required
        ></v-text-field>
        <v-text-field
            label="Description"
            v-model="form.description"
            :counter="300"
            multi-line
        ></v-text-field>
        <v-btn
            @click="submitForm"
            :disabled="DISABLE"
            :loading="LOADING"
        >
        Save
        </v-btn>
        <v-btn @click="clear" :disabled="edit ? true : false">Clear</v-btn>
    </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { types } from '../../../store/types'

export default {
  data () {
    return {
      valid: true,
      edit: false,
      form: {
        regionSlug: '',
        displayName: '',
        ermEndpoint: '',
        description: ''
      },
      slugRules: [
        (v) => !!v || 'ID is required',
        (v) => /^[a-z]+[-a-z0-9]*[a-z0-9]+$/u.test(v) || `
        ID Must begin with a letter,
        ID Must be lowercase,
        ID Must include only letters (a-z), digits (0-9) and "-",
        ID Must end with a letter or digit
        `,
        (v) => (v && v.length > 5) || 'ID must be  than 5 characters',
        (v) => (v && v.length <= 32) || 'ID must be equal or less than 32 characters'
      ],
      displayNameRules: [
        (v) => !!v || 'Display name is required',
        (v) => (v && v.length <= 30) || 'Display name must be less than 30 characters'
      ],
      ermEndpointRules: [
        (v) => !!v || 'ERM endpoint is required',
        (v) => (v && v.length <= 100) || 'ERM endpoint must be less than 100 characters'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'LOADING',
      'editItem',
      'formState',
      'DISABLE'
    ])
  },
  created () {
    if (this.formState === 'update') {
      this.form = this.editItem
      this.edit = true
    }
  },
  methods: {
    clear () {
      this.form = {
        regionSlug: '',
        displayName: '',
        ermEndpoint: '',
        description: ''
      }
      this.$refs.form.reset()
    },
    submitForm () {
      if (this.formState === 'create') {
        this.createItem()
      } else {
        this.updateItem()
      }
    },
    createItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('LOADING')
        this.$store.dispatch('DISABLE')
        let data = new FormData()
        data.set('display_name', this.form.displayName)
        data.set('description', this.form.description)
        data.set('erm_endpoint', this.form.ermEndpoint)
        data.set('region_slug', this.form.regionSlug)
        this.$store.dispatch(types.admin.ADMIN_REGION_CREATE, data).then(() => {
          this.clear()
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
          this.$router.go(-1)
        }).catch(() => {
        // fails
          this.$root.generalDefaultError()
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
        })
      }
    },
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('LOADING')
        this.$store.dispatch('DISABLE')
        let data = new FormData()
        data.set('display_name', this.form.displayName)
        data.set('description', this.form.description)
        data.set('erm_endpoint', this.form.ermEndpoint)
        data.set('region_slug', this.form.regionSlug)
        this.$store.dispatch(types.admin.ADMIN_REGION_UPDATE, data).then(() => {
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
          this.$router.go(-1)
        }).catch(() => {
        // fails
          this.$root.generalDefaultError()
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
        })
      }
    }
  }
}
</script>
