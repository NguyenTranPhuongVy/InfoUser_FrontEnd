<template>
  <div>
    <v-container class="set-Login">
      <v-card class="p-4">
        <div class="text-center">
          <h4>Logo</h4>
          <h5>Đăng nhập tài khoản</h5>
          <v-text>Sử dụng Tài khoản Google của bạn</v-text>
        </div>
        <div class="p-3">
          <v-form>
            <v-text-field
              color="purple darken-2"
              label="Email"
              placeholder="Vui lòng nhập email"
              class="mt-3"
              dense
            ></v-text-field>
            <v-text-field
              color="purple darken-2"
              placeholder="Vui lòng nhập password"
              label="Mật khẩu"
              dense
              type="password"
              class="mt-3"
            ></v-text-field>
            <div class="checkBox">
              <v-checkbox
                v-model="ex4"
                label="Hiển thị mật khẩu"
                color="indigo"
                value="Hiển thị mật khẩu"
              ></v-checkbox>
            </div>
          </v-form>
          <div class="title-forget">
            <a href="#">
              <p>Bạn quên địa chỉ email hoặc mật khẩu?</p>
            </a>
          </div>
          <v-row class="mt-5">
            <v-col cols="6">
              <v-btn text>Tạo tài khoản</v-btn>
            </v-col>
            <v-col cols="6">
              <div class="float-end">
                <v-btn @click="signUp()" :color="website.color.main" dark
                  >Đăng Nhập</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  props: ['website', 'user'],
}
</script>

<style>
.title-forget p {
  font-weight: bold;
  cursor: pointer;
  color: #1a73e8;
}
.title-forget a {
  text-decoration: none;
}
.set-Login {
  max-width: 500px;
}
.checkBox {
  margin-top: -5%;
}
</style>
