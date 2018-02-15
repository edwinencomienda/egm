<template>
    <div>
        <v-navigation-drawer
            fixed
            clipped
            app
            permanent
        >
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-layout
                        row
                        v-if="item.heading"
                        align-center
                        :key="i"
                    >
                    </v-layout>
                    <v-list-tile router v-bind:to="item.link" :key="item.id">
                        <v-list-tile-action >
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'side-bar',
  computed: {
    ...mapGetters({
      appPathPrefix: 'appPathPrefix'
    }),
    items () {
      return [
        {icon: 'public', text: 'Regions', link: this.appPathPrefix + '/regions'},
        {icon: 'apps', text: 'Clusters', link: this.appPathPrefix + '/clusters'},
        {icon: 'work', text: 'Packages', link: this.appPathPrefix + '/packages'}
      ]
    }
  },
  data: () => ({
    dialog: false,
    drawer: null
  })
}
</script>
