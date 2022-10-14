<template>
  <div>
    <p class="homeText">Login</p>
    <form>
      <label>Username</label>
      <input type="text" v-model="input.username"/>
      <label>Password</label>
      <input type="password" v-model="input.password"/>
      <button @click="handleLogin">Login</button>
    </form>
  </div>
</template>

<script>
import Login from '@/services/login.js';
import Blogs from '@/services/blogs.js';

export default {
name: "LoginForm",
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async handleLogin() {
      try {
        if (this.input.username === '' || this.input.password === '') {
          console.log("Username and password are required.")
          this.$parent.makeToast('warning', 'Username and password are required.', 'Username or password missing!')
        } else {
          const credentials = {
            username: this.input.username,
            password: this.input.password
          }
          const user = await Login.login(credentials)
          window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
          Blogs.setToken(user.token)

          console.log(this.input.username + " Logged in! Token: " + user.token)
          this.$parent.makeToast('success', 'You have successfully logged in.', 'Success!')

          // Empty input fields:
          this.input.username = ''
          this.input.password = ''

          this.$emit("authenticated", true)
          await this.$router.replace({name: "Home"})
        }
      } catch (error) {
        console.log(error.response.data)
        this.$parent.makeToast('danger', 'Login failed. Check on your credentials.', 'Error!')
      }
    }
  }
}
</script>

<style scoped>
.homeText{
  font-size: 30px;
  color: #212121;
  text-align: center;
  position: relative;
  padding:30px 30px 10px 30px;
}
</style>