<template>
    <v-form v-model="valid" ref="form" lazy-validation class="pa-5">
        <v-text-field
            label="Name"
            v-model="form.name"
            :rules="name_rules"
            :counter="30"
            required
        ></v-text-field>
        <v-text-field
            label="Display Name"
            v-model="form.display_name"
            :rules="display_name_rules"
            :counter="30"
            required
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
            @click="createItem"
            :disabled="!valid"
        >
        Save
        </v-btn>
        <v-btn @click="clear">Clear</v-btn>
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
    ...mapGetters({
      editItem: 'editItem'
    })
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
    createItem () {
      let data = this.form
      data.slug = Math.random().toString()
      this.$store.dispatch('CREATE_REGION', data).then(() => {
        this.clear()
      }).catch(() => {
      // fails
      })
    },
    
  }
}
</script>
