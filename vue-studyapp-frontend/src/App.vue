<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <navbar v-bind:authenticated="authenticated" @logout:auth="logout"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view v-bind:blogs="blogs"
                     @add:blog="addNewEvent"
                     v-bind:users="users"
                     v-bind:cards="cards"
                     @authenticated="setAuthenticated"
                     v-bind:user="user"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from '@/components/Navbar';
import cardService from '@/services/cards.js';
import blogService from '@/services/blogs.js';
import userService from '@/services/users.js';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  watch: {
    //Call every time, then value changes
    authenticated(newValue, oldValue) {
      console.log(newValue + ' ' + oldValue)
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        //const user = loggedUserJSON
        //setUser(user)
        this.user = user
        blogService.setToken(user.token)
        cardService.setToken(user.token)
        console.log('user ' + user.username)
        //setThisUsername(user.username)
      } else {
        if(this.authenticated == false && this.$route.path != '/login') {
          this.$router.replace({ name: "LoginForm" })/*.catch(()=>{});*/
        }
      }
    },
    /*blogs(newValue, oldValue) {
      console.log('new: ' + newValue + ', old: ' + oldValue)
    }*/

    /*textE(newValue, oldValue) {
      console.log(newValue + ' ' + oldValue)
      this.typing = true;
      setTimeout(() => {this.typing = false
      }, 3000)
    }*/
  },
  /*setup() {

    const textE = ref('')

    watchEffect(() => {
      console.log(textE.value)
      //console.log(user)
    })

    /*const loggedUserJSON = ref(window.localStorage.getItem('loggedBlogAppUser'))
    const user = null
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      Blogs.setToken(user.token)
      Cards.setToken(user.token)
      console.log('user' + user.token)
      //setThisUsername(user.username)
    }*/

    //return {textE /*user*/}
  //},

  /*setup() {
    //watch(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      Blogs.setToken(user.token)
      Cards.setToken(user.token)
      //watchEffect(() => console.log('user' + user))
      //setThisUsername(user.username)
      //}})
    }
  },*/

  methods: {
    makeToast(variant = null, text, title) {
      this.$bvToast.toast(text, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    async appSetCards() {
      console.log('appSetCards called')
      try {
        this.cards = await cardService.getAll()
          /*for(let a = 0; a < this.cards.length; a++) {
              console.log("All card after update: " + this.cards[a].word)
          }*/
      } catch (error) { return error }
    },
    async appSetBlogs() {
      //console.log('appSetBlogs called')
      try {
        this.blogs = await blogService.getAll()
        /*for(let a = 0; a < this.cards.length; a++) {
            console.log("All card after update: " + this.cards[a].word)
        }*/
      } catch (error) { return error }
    },
    async appSetUsers() {
      console.log('appSetUsers called')
      try {
        this.users = await userService.getAll()
        /*for(let a = 0; a < this.cards.length; a++) {
            console.log("All card after update: " + this.cards[a].word)
        }*/
      } catch (error) { return error }
    },
    /*setPublicBlogs() {
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].status == 'public') {
          this.publicBlogs.push(this.blogs[i])
        }
      }
      console.log('app: this.publicBlogs ' + this.publicBlogs)
    },*/
    addNewEvent(blogObject) {
      try {
        blogService
            .create(blogObject)
            .then(returnedBlog => {
              (this.blogs.concat(returnedBlog))
              })
        console.log('blog added ' + blogObject)
        this.makeToast('success', 'New wordlist was added successfully', 'Success!')
            /*.then(returnedBlog => {
              setBlogs(blogs.concat(returnedBlog))*/
              /*setMessage({
                content: `new blog ${blogObject.title} by ${blogObject.author} was added`,
                type: 'successMessage'
              })
              setTimeout(() => setMessage(null), 5000)*/
            //})
      } catch (error) {
        console.log('error ' + error)
        this.makeToast('danger', 'New wordlist was not added.', 'Error occurred!')
        /*setMessage({
          content: 'blog was not added',
          type: 'errorMessage'
        })
        setTimeout(() => setMessage(null), 5000)*/
      }
      /*const lastId =
          this.blogs.length > 0
              ? this.blogs[this.blogs.length - 1].id
              : 0;
      const id = lastId + 1;
      const newEvent = { ...event, id };

      this.blogs = [...this.blogs, newEvent]*/
    },
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout(auth) {
      try {
        this.authenticated = auth
        this.authenticated = false
        window.localStorage.removeItem('loggedBlogAppUser')
        this.makeToast('success', 'Logout was completed successfully', 'Success!')
      } catch (error) {
        console.log('logout is not succeed')
        this.makeToast('danger', 'logout was not succeed.', 'Error occurred!')
      }
    },
  },
  data() {
    return {
      "blogs": [], "users": [], "cards":[],
      //'loggedUserJSON':window.localStorage.getItem('loggedBlogAppUser'),
      'authenticated': false,
      'user': null,
      "publicBlogs": []
    }
  },
  created() {
    console.log('App created')

    try {
      //this.authenticated = auth
      //this.authenticated = false
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      console.log('app created: loggedUserJSON: ' + loggedUserJSON)
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.user = user
        blogService.setToken(user.token)
        cardService.setToken(user.token)
        this.authenticated = true
      } else {
        this.authenticated = false
      }
      //window.localStorage.removeItem('loggedBlogAppUser')
      //this.$router.replace({ name: "LoginForm" })/*.catch(()=>{});*/
      //setUser(null)
      // } catch (error) {
      // console.log('logout is not succeed')
    } catch (error) {
      console.log('User was not gotten after created')
      this.makeToast('danger', 'User was not recognised.', 'Error occurred!')
    }
  },
  mounted() {
    console.log('App mounted')
    this.appSetUsers()
    this.appSetBlogs()
    this.appSetCards()
    //this.setPublicBlogs()
    console.log('app: this.blogs' + this.blogs.toString())
    /*fetch('http://localhost:3001/api/blogs')
        .then(res => res.json())
        .then(data => this.blogs = data)
        .catch(err => console.log(err.message))

    fetch('http://localhost:3001/api/users')
        .then(res => res.json())
        .then(data => this.users = data)
        .catch(err => console.log(err.message))

    fetch('http://localhost:3001/api/cards')
        .then(res => res.json())
        .then(data => this.cards = data)
        .catch(err => console.log(err.message))*/

    if(this.authenticated == false && this.$route.path != '/login') {
      this.$router.replace({ name: "LoginForm" })/*.catch(()=>{});*/
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

</style>
