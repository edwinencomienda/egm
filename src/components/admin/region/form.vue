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
        (v) => (v && v.length <= 30) || 'Name must be less than 30 characters'
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
        this.$store.dispatch('CREATE_REGION', data).then(() => {
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
        this.$store.dispatch('UPDATE_REGION', data).then(() => {
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
