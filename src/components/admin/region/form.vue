<template>
    <v-form v-model="valid" ref="form" lazy-validation class="pa-5">
        <v-text-field
            label="Display Name"
            v-model="form.display_name"
            :rules="display_name_rules"
            :counter="30"
            required
        ></v-text-field>
        <v-text-field
            label="ID"
            v-model="form.region_slug"
            :rules="slug_rules"
            :counter="30"
            required
            :disabled="edit ? true : false"
        ></v-text-field>
        <v-text-field
            label="ERM Endpoint"
            v-model="form.erm_endpoint"
            :rules="erm_endpoint_rules"
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
        name: '',
        display_name: '',
        erm_endpoint: '',
        description: ''
      },
      name_rules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 30) || 'Name must be less than 30 characters'
      ],
      slug_rules: [
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
      display_name_rules: [
        (v) => !!v || 'Display Name is required',
        (v) => (v && v.length <= 30) || 'Display Name must be less than 30 characters'
      ],
      erm_endpoint_rules: [
        (v) => !!v || 'ERM Endpoint is required',
        (v) => (v && v.length <= 100) || 'ERM Endpoint must be less than 100 characters'
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
        name: '',
        display_name: '',
        erm_endpoint: '',
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
        let data = this.form
        this.$store.dispatch(types.admin.ADMIN_REGION_CREATE, data).then(() => {
          this.clear()
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
          this.$router.push('/dashboard/regions')
        }).catch(() => {
        // fails
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
        })
      }
    },
    updateItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('LOADING')
        this.$store.dispatch('DISABLE')
        let data = Object.assign({}, this.form)
        this.$store.dispatch(types.admin.ADMIN_REGION_UPDATE, data).then(() => {
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
          this.$router.push('/dashboard/regions')
        }).catch(() => {
        // fails
          this.$store.dispatch('UNLOADING')
          this.$store.dispatch('ENABLE')
        })
      }
    }
  }
}
</script>
