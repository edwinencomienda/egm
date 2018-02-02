<template>
  <div>
    <v-toolbar
        color="blue darken-3"
        dark
        app
        clipped-left
        fixed
    >
        <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="rr = !rr"></v-toolbar-side-icon>
            <span class="hidden-xs-only">Elemento - EGM</span>
        </v-toolbar-title>
        <div class="d-flex align-center" style="margin-left: auto">
            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon >
                <v-icon>notifications</v-icon>
            </v-btn>
                <v-menu bottom left>
                    <v-btn icon slot="activator" dark>
                        <v-avatar size="40px">
                            <slot name="default">
                            </slot>
                            <img
                                src="http://i.pravatar.cc/128"
                                alt="Vuetify"
                            >
                            </v-avatar>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-if="user">
                            <v-list-tile-title>
                                Hello, {{ user.me.display_name}}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-spacer></v-spacer>
                        <v-list-tile v-on:click.prevent="logout">
                            <v-list-tile-title>
                                Logout
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    </v-menu>
        </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      logo: ''
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({
      user: 'userData'
    })
  },
  methods: {
    logout: function (event) {
      this.$store.dispatch('AUTH_LOGOUT')
      this.$router.go('/login')
    }
  }
}
</script>
