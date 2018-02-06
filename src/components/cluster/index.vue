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
            >
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected" :id="props.item.slug">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ props.item.price }}</td>
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
          text: 'Name',
          align: 'center',
          value: 'name'
        },
        {
          text: 'Description',
          align: 'center',
          value: 'description'
        },
        {
          text: 'Price',
          align: 'center',
          value: 'price'
        },
        {
          text: 'ID',
          align: 'center',
          value: 'slug'
        }
      ],
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      clusters: 'clusters'
    })
  }
}
</script>
