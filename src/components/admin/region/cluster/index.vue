<template>
  <div class="width-100-percent">
        <v-card>
            <v-card-title>
            Clusters
            <v-spacer></v-spacer>
            <v-btn color="default" router to="/dashboard/regions">
                <v-icon dark left>keyboard_backspace</v-icon>
                Back
            </v-btn>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="items"
                v-bind:search="search"
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td>{{ props.item.display_name }}</td>
                    <td>{{ props.item.public_dns }}</td>
                    <td>{{ props.item.public_ipv4 }}</td>
                    <td>{{ props.item.slug }}</td>
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
          value: 'display_name'
        },
        {
          text: 'Public DNS',
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
      items: 'admin/regionClusters'
    })
  }
}
</script>
