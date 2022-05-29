<template>
  <v-app id="inspire">
    <Header :user="user" :website="website" />

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view :user="user" :website="website" />
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Auth from './apis/auth.api'
export default {
  components: {
    Header,
  },
  async created() {
    const user = await Auth.secret()
    console.log(user.data.fullName)
    this.user = user.data
    // const user = {
    //   email: 'Nguyentranphuongvy99@gmail.com',
    //   fullName: 'Nguyễn Trần Phương Vy',
    // }
    // this.user = user
    //
  },
  data: () => ({
    drawer: null,
    user: null,
    website: {
      color: {
        main: '#004D40',
        subMain: '#FFF59D',
      },
    },
  }),
}
</script>
