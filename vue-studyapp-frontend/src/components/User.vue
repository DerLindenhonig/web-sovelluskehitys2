<template>
<div>
  <p class="usernameText">{{ this.user.name }}</p>
  <p class="userinfoText">{{ this.user.username }}</p>
  <div class="userImg">
    <img v-bind:src="`${this.user.avatar}`" width='150px' height='150px' class="m-1 rounded"/>
  </div>
  <p class="userinfoText">Level: {{ this.userLevel }}</p>
  <b-progress animated striped variant="info" :value="this.user.level" :max="maximumLevel" :min="0" class="w-25"></b-progress>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "User",
  data() {
    return {
      userId: this.$route.params.id,
      userLevel: 0,
      levels: [0, 10, 30, 60, 100, 150, 210, 270, 350],
      //max: this.levels[this.userLevel+1]
    }
  },
  props: {
    user: null, users: Array
  },
  computed: {
    maximumLevel() {
      return this.levels[this.userLevel+1]
    }
  },
  methods: {
    levelBar() {
      //const levels = [0, 10, 30, 60, 100, 150, 210, 270, 350]
      let userLevel = 0

      if(this.user.level === undefined) {
        this.user.level = 0
      }

      for(let i = 0; i < this.levels.length; i++) {
        if (this.user.level > this.levels[i]) {
          userLevel = i
          this.userLevel = userLevel
        }
      }
    }
  },
  created() {
    console.log('user created' + this.userId)
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].id == this.userId) {
        this.user = this.users[i]
        console.log('this.user.name ' + this.user.name)
      }
    }
    this.levelBar()
  }
}
</script>

<style scoped>
.usernameText{
  font-size: 20px;
  font-weight: bold;
  color: #212121;
  text-align: left;
  position: relative;
  padding:30px 0px 0px 0px;
}
.userinfoText{
  font-size: 15px;
  color: #212121;
  text-align: left;
  position: relative;
}
.userImg{
  position: relative;
  left:0px;
}
</style>