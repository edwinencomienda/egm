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
export default {
  name: 'side-bar',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {icon: 'public', text: 'Regions', link: window.roothPath + '/regions'},
      {icon: 'apps', text: 'Clusters', link: window.roothPath + '/clusters'},
      {icon: 'work', text: 'Packages', link: window.roothPath + '/packages'}
    ]
  })
}
</script>
