<template>
  <div>
    <p class="homeText">
      <b-icon icon="stars" variant="warning"></b-icon>
      Welcome, <router-link :to="{ path: '/user/' + loggedUser.id }" v-bind:users="users">{{user.name}}</router-link>!
      <b-icon icon="stars" variant="warning"></b-icon>
    </p>
    <p class="homeText">My wordlists:</p>
    <b-card-group columns >
      <b-card v-for="blog in usersBlogs" :key="blog.id" border-variant="dark">
        <b-card-text><p class="cardTitleText">{{ blog.title }}</p></b-card-text>
        <b-card-text>by {{ blog.author }}</b-card-text>
        <router-link :to="{ path: '/blog/' + blog.id }" v-bind:blogs="blogs" v-bind:cards="cards" @allBlogs="blogs"><b-button variant="info">Open</b-button></router-link>
        <template #footer>
          <small >{{ blog.category }}</small>
        </template>
      </b-card>
    </b-card-group>

  </div>
</template>

<script>
/*<table>
  <thead>
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Language</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="blog in usersBlogs" :key="blog.id">
  <td>{{ blog.title }}</td>
  <td>{{ blog.author }}</td>
  <td>{{ blog.category }}</td>
  <td><router-link :to="{ path: '/blog/' + blog.id }" v-bind:blogs="blogs" v-bind:cards="cards" @allBlogs="blogs"><b-button variant="info">Open</b-button></router-link></td>
</tr>
</tbody>
</table>*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
export default {
  name: 'Home',
  props: {
    user: null, blogs: Array, cards: Array, users: Array
  },
  methods: {
    setUsersBlogs() {
      for (let i = 0; i < this.blogs.length; i++) {
        if(this.blogs[i].user.name == this.user.name) {
          this.usersBlogs.push(this.blogs[i])
          //console.log('home: this.user blogs ' + this.blogs[i].title)
        }
      }
    },
    setUsers() {
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].username == this.user.username) {
          //console.log('this.user id ' + this.users[i].id)
          this.loggedUser = this.users[i]
          //console.log('home: this.loggedUser ' + this.loggedUser)
        }
      }
    }
  },
  watch: {
    blogs() {
      if(this.usersBlogs.length !== 0) {
        this.usersBlogs.splice(0);
      }

      this.$parent.appSetBlogs()

      this.setUsersBlogs()
    },
    users() {
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].username == this.user.username) {
          //console.log('this.user id ' + this.users[i].id)
          this.loggedUser = this.users[i]
          //console.log('home: this.loggedUser ' + this.loggedUser)
        }
      }
    },
    /*addCardsToAddedBlog() {
      let lastBlogId = this.usersBlogs[this.usersBlogs.length].id
      console.log('last blog id: ' + lastBlogId)
    },*/
  },
  mounted() {
    this.setUsersBlogs()
    this.setUsers()
  },
  data() {
    return {
      "usersBlogs": [], "loggedUser": null, "homeBlogs": []
    }
  }
};
</script>
<style scoped>
.homeText{
  font-size: 30px;
  text-align: center;
  position: relative;
  padding:30px 30px 10px 30px;
}
.cardTitleText{
  font-weight: bold;
  font-size: 20px;
}
</style>