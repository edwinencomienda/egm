<template>
    <v-app id="inspire" class="login-bg">
        <side-bar v-if="user"></side-bar>
        <top-header v-if="user" :drawer="drawer"></top-header>
        <v-content class="mt-2">
          <router-view keep-alive transition-mode="out-in"></router-view>
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
    drawer: null,
    items: [
      { icon: 'public', text: 'Regions' },
      { icon: 'apps', text: 'Clusters' },
      { icon: 'work', text: 'Packages' }
    ]
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active {
        transition: opacity .3s
      }

      .fade-enter, .fade-leave-to    {
        opacity: 0
      }
</style>
