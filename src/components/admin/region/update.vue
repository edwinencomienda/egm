<template>
    <div class="width-100-percent">
        <v-card>
            <v-card-title>
                Update Region
                <v-spacer></v-spacer>
                <v-btn color="default" @click="$router.go(-1)">
                    <v-icon dark left>keyboard_backspace</v-icon>
                    Back
                </v-btn>
            </v-card-title>
            <item-form></item-form>
        </v-card>
    </div>
</template>

<script>
import ItemForm from './form'

export default {
  created () {
    this.$store.commit('SET_FORM_STATE', 'update')
  },
  components: {
    'item-form': ItemForm
  }
}
</script>
