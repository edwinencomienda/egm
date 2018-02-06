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
          align: 'left',
          value: 'name'
        },
        {
          text: 'Description',
          align: 'left',
          value: 'description'
        },
        {
          text: 'Price',
          align: 'left',
          value: 'price'
        },
        {
          text: 'Slug',
          align: 'left',
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
