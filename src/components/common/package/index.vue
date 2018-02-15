<template>
  <div class="width-100-percent">
        <v-card>
            <v-card-title>
            Packages
            <v-spacer></v-spacer>
            <v-btn color="default" @click="createItem">
                <v-icon dark left>add_circle</v-icon>
                New
            </v-btn>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:search="search"
                :rows-per-page-items="[ 10, 25, { text:'All', value: -1 } ]"
                :loading=tableLoading
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td class="text-xs-center">{{ props.item.display_name }}</td>
                    <td class="text-xs-center">{{ props.item.author }}</td>
                    <td class="text-xs-center">{{ props.item.author_uri }}</td>
                    <td class="text-xs-center">{{ props.item.description }}</td>
                    <td class="text-xs-center">{{ props.item.official_uri }}</td>
                    <td class="text-xs-center">
                        <v-menu bottom left>
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile @click="editItem(props.item)">
                                    <v-icon sm>mode_edit</v-icon>
                                    <v-list-tile-title>update</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click="deleteItem(props.item.slug)">
                                    <v-icon sm>delete</v-icon>
                                    <v-list-tile-title>delete</v-list-tile-title>
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
import { types } from '../../../store/types'
import FormDialog from './FormDialog'
import swal from 'sweetalert2'

export default {
  name: 'packages',
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'center',
          value: 'display_name'
        },
        {
          text: 'Authour',
          align: 'center',
          value: 'author'
        },
        {
          text: 'Author URI',
          align: 'center',
          value: 'author_uri'
        },
        {
          text: 'Description',
          align: 'center',
          value: 'description'
        },
        {
          text: 'Official URI',
          align: 'center',
          value: 'official_uri'
        }
      ],
      search: '',
      showFormDialog: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'packages',
      tableLoading: 'tableLoading'
    })
  },
  components: {
    'form-dialog': FormDialog
  },
  created () {
    this.$store.commit('SET_FORM_STATE', '')
  },
  methods: {
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    createItem () {
      this.$store.commit('SET_FORM_STATE', '')
      this.showFormDialog = true
    },
    editItem (data) {
      let prepareData = {
        Slug: data.slug,
        Source: data.src,
        FolderName: data.folder_name,
        Name: data.display_name,
        Description: data.description,
        Version: data.version,
        Type: data.type,
        Author: data.author,
        AuthorURI: data.author_uri,
        PluginURI: data.official_uri,
        Raw: data.metadata,
        mustInstall: data.must_install
      }
      this.$store.commit('SET_EDIT_ITEM', prepareData)
      this.$store.commit('SET_FORM_STATE', 'edit')
      this.showFormDialog = true
    },
    deleteItem (slug) {
      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this record!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (isConfirm) {
        if (isConfirm.value) {
          this.$store.dispatch(types.common.package.PACKAGE_DELETE, { slug }).then(() => {
            this.$root.generalDefaultSuccess(false, 'Deleted')
          }).catch(error => {
            this.$root.generalDefaultError(false, error)
          })
        }
      }.bind(this)).catch(swal.noop)
    },
    closeFormDialog () {
      this.showFormDialog = false
    }
  }
}
</script>
