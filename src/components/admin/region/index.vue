<template>
  <div>
        <v-card>
            <v-card-title>
            Regions
            <v-spacer></v-spacer>
            <v-btn color="default" router to="/dashboard/region/create">
                <v-icon dark left>add_circle</v-icon>
                New
            </v-btn>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:search="search"
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td class="text-xs-center">{{ props.item.display_name }}</td>
                    <td class="text-xs-center">{{ clusters(props.item.clusters)  }} </td>
                    <td class="text-xs-center">{{ props.item.erm_endpoint }}</td>
                    <td class="text-xs-center">{{props.item.slug}}</td>
                    <td class="text-xs-center">{{props.item.description}}</td>
                    <td class="text-xs-center">
                        <v-menu bottom left>
                            <v-btn icon slot="activator" >
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile >
                                    <v-icon sm>search</v-icon>
                                    <v-list-tile-title>Clusters</v-list-tile-title>
                                </v-list-tile>
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
        </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'clusters',
  data () {
    return {
      items: [],
      headers: [
        {
          text: 'Name',
          align: 'center',
          value: 'display_name'
        },
        {
          text: 'Clusters',
          align: 'center',
          value: 'clusters'
        },
        {
          text: 'URL',
          align: 'center',
          value: 'erm_endpoint'
        },
        {
          text: 'Slug',
          align: 'center',
          value: 'slug'
        },
        {
          text: 'Description',
          align: 'center',
          value: 'description'
        }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      regions: 'regions'
    })
  },
  created () {
    this.items = this.regions
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
    clusters (data) {
      return data.map(o => o.display_name).join(', ')
    },
    editItem (data) {
      data.region_slug = data.slug
      this.$store.commit('SET_EDIT_ITEM', data)
      this.$router.push('region/edit')
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
          this.$store.dispatch('DELETE_REGION', { slug }).then(() => {
            swal('Successful', 'Deleted', 'success')
          }).catch(() => {
          // fails
          })
        }
      }.bind(this)).catch(swal.noop)
    }
  }
}
</script>
