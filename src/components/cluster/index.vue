<template>
    <div style="width:100%">
        <v-card>
            <v-card-title>
            Clusters
            <v-spacer></v-spacer>
            <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
            ></v-text-field>
            </v-card-title>
        </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
          text: 'SLUG',
          align: 'center',
          value: 'erm_endpoint'
        }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      clusterPlans: 'clusterPlans'
    })
  },
  created () {
    this.items = this.clusterPlans
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
    }
  }
}
</script>
