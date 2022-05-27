<template>
  <div>
    <v-container>
      <v-card :isLoading="isLoading">
        <v-row>
          <v-col cols="8">
            <div class="p-5">
              <div>
                <h5>Logo</h5>
                <h4>Tạo Tài Khoản</h4>
              </div>
              <v-form class="mt-5" v-model="formAdmin.valid" ref="formAdmin">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formAdmin.value.fullName"
                      :rules="formAdmin.validate.fullName"
                      color="purple darken-2"
                      label="Họ và tên"
                      placeholder="Vui lòng nhập họ và tên"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formAdmin.value.phone"
                      :rules="formAdmin.validate.phone"
                      color="blue darken-2"
                      label="Số điện thoại"
                      placeholder="Vui lòng nhập số điện thoại"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="formAdmin.value.email"
                      :rules="formAdmin.validate.email"
                      color="purple darken-2"
                      label="Vui lòng nhập email"
                      dense
                    ></v-text-field>
                  </v-col>
                  <span>Bạn có thể nhập chữ cái, sô và dấu chấm</span>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formAdmin.value.password"
                      :rules="formAdmin.validate.password"
                      color="purple darken-2"
                      label="Vui lòng nhập password"
                      dense
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formAdmin.value.confirmPassword"
                      :rules="formAdmin.validate.confirmPassword"
                      color="blue darken-2"
                      label="Xác nhận mật khẩu"
                      placeholder="Xác nhận lại mật khẩu"
                      dense
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <span
                  >Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu
                  tượng</span
                >
                <v-checkbox
                  v-model="ex4"
                  label="Hiển thị mật khẩu"
                  color="indigo"
                  value="Hiển thị mật khẩu"
                ></v-checkbox>
              </v-form>
              <v-row class="mt-3">
                <v-col cols="6">
                  <v-btn text>Đăng nhập</v-btn>
                </v-col>
                <v-col cols="6">
                  <div class="float-end">
                    <v-btn @click="signUp()" :color="website.color.main" dark
                      >Đăng ký</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="4">
            <img
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              width="244px"
              height="244px"
              class="size-img"
            />
          </v-col>
        </v-row>
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
  name: 'SignUp',
  props: ['website', 'user'],
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
          confirmPassword: '',
          phone: '',
          fullName: '',
        },
        valid: true,
        validate: {
          fullName: [
            (v) => !!v || 'Họ và tên không được để trống!',
            (v) =>
              (v.length >= 5 && v.length <= 250) ||
              'Họ và tên phải từ 5 đền 250 ký tự!',
          ],
          phone: [
            (v) => !!v || 'Số điện thoại không được để trống!',
            (v) =>
              RegexModule.phone_vn.test(v) || 'Số điện thoại không hợp lệ!',
            (v) =>
              (v.length >= 10 && v.length <= 11) ||
              'Họ và tên phải từ 5 đền 250 ký tự!',
          ],
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
          confirmPassword: [
            (v) => !!v || 'Xác nhận mật khẩu không được để trống!',
            (v) =>
              this.formAdmin.value.password == v ||
              'Xác nhận mật khẩu không trùng khớp!',
            (v) =>
              (v.length >= 5 && v.length <= 250) ||
              'Xác nhận mật khẩu phải từ 5 đền 250 ký tự!',
          ],
        },
      },
    }
  },
  methods: {
    async signUp() {
      let that = this
      const key = 'auth'
      const formData = new FormData()
      const isValid = that.$refs.formAdmin.validate()
      if (isValid) {
        that.isLoading = true
        formData.append('email', that.formAdmin.value.email)
        formData.append('password', that.formAdmin.value.password)
        formData.append('confirmPassword', that.formAdmin.value.confirmPassword)
        formData.append('phone', that.formAdmin.value.phone)
        formData.append('fullName', that.formAdmin.value.fullName)
        const signUp = await Auth.signUp(formData, key)
        if (!signUp.error) {
          that.snackbar = true
          that.text = signUp.message
          that.isLoading = false
          that.$router.push({ name: 'HomeView' })
        } else {
          that.snackbar = true
          that.text = signUp.message
          that.isLoading = false
        }
      }
    },
  },
}
</script>

<style>
.container {
  max-width: 900px;
}
.size-img {
  margin-top: 30%;
  max-width: 100%;
}
</style>
