<template>
    <v-app id="inspire" class="login-bg">
        <side-bar v-if="user"></side-bar>
        <top-header v-if="user" :drawer="drawer"></top-header>
        <v-content>
          <v-layout row wrap class="ma-3 mt-5">
              <transition name="fade" mode="out-in">
                  <keep-alive>
                    <router-view ></router-view>
                  </keep-alive>
              </transition>
          </v-layout>
        </v-content>
    </v-app>
</template>

<script>
import topHeader from '@/components/common/layout/topHeader'
import sideBar from '@/components/common/layout/sideBar'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'public', text: 'Regions' },
      { icon: 'apps', text: 'Clusters' },
      { icon: 'work', text: 'Packages' }
    ]
  }),
  components: {
    'top-header': topHeader,
    'side-bar': sideBar
  },
  computed: {
    ...mapGetters({
      user: 'AUTH_IS_LOGIN'
    })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
        transition: opacity .3s
}

.fade-enter, .fade-leave-to    {
  opacity: 0
}
</style>
