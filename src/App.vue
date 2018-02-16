<template>
    <v-app id="inspire" class="login-bg">
        <side-bar v-if="user"></side-bar>
        <top-header v-if="user" :drawer="drawer"></top-header>
        <v-content>
          <v-layout row wrap class="ma-3 mt-5">
              <transition name="fade" mode="out-in">
                  <router-view></router-view>
              </transition>
          </v-layout>
        </v-content>
    </v-app>
</template>

<script>
import TopHeader from '@/components/common/layout/TopHeader'
import SideBar from '@/components/common/layout/SideBar'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data: () => ({
    dialog: false,
    drawer: null
  }),
  components: {
    'top-header': TopHeader,
    'side-bar': SideBar
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
