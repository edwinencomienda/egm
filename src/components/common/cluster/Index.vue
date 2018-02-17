<template>
  <div class="width-100-percent">
        <v-card>
            <v-card-title>
            Clusters
            <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="clusters"
                v-bind:search="search"
                :rows-per-page-items="[ 10, 25, { text:'All', value: -1 } ]"
                :loading=tableLoading
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td>{{ props.item.slug }}</td>
                    <td>{{ props.item.display_name }}</td>
                    <td>{{ props.item.public_dns }}</td>
                    <td>{{ props.item.public_ipv4 }}</td>
                    <td class="text-xs-center" v-if="userRole === 'partner'">
                        <v-menu bottom left>
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile @click="viewApps(props.item)">
                                    <v-icon sm class="mr-2">apps</v-icon>
                                    <v-list-tile-title>Apps</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-icon sm class="mr-2">delete</v-icon>
                                    <v-list-tile-title>Delete</v-list-tile-title>
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
import { types } from '../../../store/types'

export default {
  name: 'clusters',
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'slug'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Public DNSC',
          align: 'left',
          value: 'public_dns'
        },
        {
          text: 'Public IPv4',
          align: 'left',
          value: 'public_ipv4'
        }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      clusters: 'clusters',
      tableLoading: 'tableLoading',
      userRole: 'userRole'
    })
  },
  methods: {
    viewApps (data) {
      this.$store.commit(types.partner.PARTNER_CLUSTER_SET_ITEM, data)
      this.$router.push('clusters/apps')
    }
  }
}
</script>
