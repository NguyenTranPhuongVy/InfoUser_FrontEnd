<template>
  <div>
    <v-container class="set-signIn">
      <v-card class="p-4" :loading="isLoading">
        <div class="text-center">
          <h4>Logo</h4>
          <h5>Đăng nhập tài khoản</h5>
          <v-text>Sử dụng Tài khoản Google của bạn</v-text>
        </div>
        <div class="p-3">
          <v-form v-model="formAdmin.valid" ref="formAdmin">
            <v-text-field
              :rules="formAdmin.validate.email"
              v-model="formAdmin.value.email"
              label="Email"
              :color="website.color.main"
              type="email"
              placeholder="Vui lòng nhập email"
              class="mt-3"
              dense
            ></v-text-field>
            <v-text-field
              :rules="formAdmin.validate.password"
              v-model="formAdmin.value.password"
              :color="website.color.main"
              placeholder="Vui lòng nhập password"
              label="Mật khẩu"
              dense
              type="password"
              class="mt-3"
            ></v-text-field>
            <div class="checkBox">
              <v-checkbox
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
                <v-btn @click="signIn()" :color="website.color.main" dark
                  >Đăng Nhập</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-snackbar top v-model="snackbar" :timeout="timeout">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import RegexModule from '../../modules/Regex.module'
import Auth from '../../apis/auth.api'
export default {
  name: 'SignIn',
  props: ['user', 'website'],
  async created() {
    if (this.user) {
      this.$router.push({ name: 'ERR404' })
    }
  },
  data() {
    return {
      isLoading: false,
      snackbar: false,
      text: '',
      timeout: 2000,
      formAdmin: {
        value: {
          email: '',
          password: '',
        },
        valid: true,
        validate: {
          email: [
            (v) => !!v || 'Email không được để trống!',
            (v) => RegexModule.email_RFC_2822.test(v) || 'E-mail không hợp lệ!',
          ],
          password: [
            (v) => !!v || 'Mật khẩu không được để trống!',
            (v) =>
              (v.length >= 5 && v.length <= 250) ||
              'Mật khẩu phải từ 5 đền 250 ký !',
          ],
        },
      },
    }
  },
  methods: {
    async signIn() {
      let that = this
      const key = 'auth'
      const formData = new FormData()
      const isValid = that.$refs.formAdmin.validate()
      if (isValid) {
        that.isLoading = true
        formData.append('email', that.formAdmin.value.email)
        formData.append('password', that.formAdmin.value.password)
        const signIn = await Auth.signIn(formData, key)
        if (signIn !== 'Unauthorized') {
          if (!signIn.error) {
            that.snackbar = true
            that.text = signIn.message
            that.isLoading = false
            localStorage.setItem('token', signIn.data.token)
            history.back()
          } else {
            that.snackbar = true
            that.text = signIn.message
            that.isLoading = false
          }
        } else {
          that.snackbar = true
          that.text = 'Sai tài khoản hoặc mật khẩu!'
          that.isLoading = false
        }
      }
    },
  },
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

.set-signIn {
  max-width: 500px;
}

.checkBox {
  margin-top: -5%;
}
</style>
