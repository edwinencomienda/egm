<template>
  <div class="width-100-percent">
        <v-card>
            <v-card-title>
            Apps
            <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="apps"
                v-bind:search="search"
                :rows-per-page-items="[ 10, 25, { text:'All', value: -1 } ]"
                :loading=tableLoading
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td>{{ props.item.slug }}</td>
                    <td>{{ props.item.active_theme }}</td>
                    <td>{{ props.item.status }}</td>
                    <td class="text-xs-center">
                        <v-menu bottom left>
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile @click="addPackage(props.item.slug)">
                                    <v-icon sm class="mr-2">work</v-icon>
                                    <v-list-tile-title>Add Package</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>
            </v-data-table>
            <v-dialog v-model="showFormDialog" max-width="550">
              <v-card>
                <form-dialog
                :showFormDialog="showFormDialog"
                :closeFormDialog="closeFormDialog"
                :appSlug="appSlug"
                >
                </form-dialog>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat="flat" @click.native="showFormDialog = false">Cancel</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
            </v-dialog>
        </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FormDialog from '../../common/package/FormDialog'

export default {
  name: 'apps',
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'slug'
        },
        {
          text: 'Active Theme',
          align: 'left',
          value: 'active_theme'
        },
        {
          text: 'Status',
          align: 'left',
          value: 'status'
        }
      ],
      search: '',
      showFormDialog: false,
      appSlug: ''
    }
  },
  computed: {
    ...mapGetters({
      apps: 'partner/apps',
      tableLoading: 'tableLoading'
    })
  },
  components: {
    'form-dialog': FormDialog
  },
  methods: {
    closeFormDialog () {
      this.showFormDialog = false
    },
    addPackage (slug) {
      this.appSlug = slug
      this.showFormDialog = true
    }
  }
}
</script>
