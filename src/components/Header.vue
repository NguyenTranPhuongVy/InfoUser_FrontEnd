<template>
  <div>
    <v-app-bar app>
      <v-app-bar app clipped-right flat height="72" :color="website.color.main">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-spacer>
        <v-responsive max-width="400">
          <div class="float-end" v-if="!user">
            <v-btn :color="website.color.subMain" :to="{ name: 'SignIn' }" text
              >Đăng nhập</v-btn
            >
            <v-btn
              :color="website.color.subMain"
              :to="{ name: 'SignUp' }"
              text
              class="ml-2"
              >Đăng ký</v-btn
            >
          </div>
          <div class="float-end" v-if="user">
            <v-avatar size="40" color="orange"> </v-avatar>
            Chào {{ user.fullName }}
          </div>
        </v-responsive>
      </v-app-bar>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['user', 'website'],
}
</script>

<style></style>
