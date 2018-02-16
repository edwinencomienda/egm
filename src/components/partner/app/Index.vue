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
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      apps: 'partner/apps',
      tableLoading: 'tableLoading'
    })
  }
}
</script>
