<template>
  <div class="width-100-percent">
        <v-card>
            <v-card-title>
                Create New Region
                <v-spacer></v-spacer>
                <v-btn color="default" :to="$root.createRoute('/regions')">
                    <v-icon dark left>keyboard_backspace</v-icon>
                    Back
                </v-btn>
            </v-card-title>
            <item-form></item-form>
        </v-card>
  </div>
</template>

<script>
import ItemForm from './Form'

export default {
  created () {
    this.$store.commit('SET_FORM_STATE', 'create')
  },
  components: {
    'item-form': ItemForm
  }
}
</script>
