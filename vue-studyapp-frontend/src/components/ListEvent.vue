<template>
  <div id="list_event">
    <p class="homeText">All wordlists</p>

    <label>
      Search: <input type="text" v-model='searchString'>
    </label><br>
    <b-card-group name='my-list' columns>
      <b-card v-for='blog in filteredList' :key='blog.id' class="my-list-item" border-variant="dark">
        <b-card-text class="cardTitleText">{{blog.title}}</b-card-text>
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
//import blogs from "../services/blogs";
/*<table>
  <thead>
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Language</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="blog in publicBlogs" :key="blog.id">
  <td>{{ blog.title }}</td>
  <td>{{ blog.author }}</td>
  <td>{{ blog.category }}</td>
  <td><router-link :to="{ path: '/blog/' + blog.id }" v-bind:blogs="blogs" v-bind:cards="cards" @allBlogs="blogs"><button>Open</button></router-link></td>
</tr>
</tbody>
</table>*/

export default {
  name: 'ListEvent',
  props: {
    blogs: Array, cards: Array, /*publicBlogs: Array*/
  },
  watch: {
    blogs() {
      if(this.publicBlogs.length !== 0) {
        this.publicBlogs.splice(0);
      }
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].status == 'public') {
          this.publicBlogs.push(this.blogs[i])
        }
      }
    }
  },
  methods: {
    setPublicBlogs() {
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].status == 'public') {
          this.publicBlogs.push(this.blogs[i])
        }
      }
    },
  },
  mounted() {
    if(this.publicBlogs.length !== 0) {
      this.publicBlogs.splice(0);
    }
    this.setPublicBlogs()
  },
  data() {
    return {
      "publicBlogs": [],
      searchString: '',
    }
  },
  computed: {
    filteredList: function() {
      const searchString = this.searchString.toLowerCase();
      return this.publicBlogs.filter(blog => blog.title.toLowerCase().includes(searchString));
    }
  }
};
</script>

<style scoped>
.homeText{
  font-size: 30px;
  color: #212121;
  text-align: center;
  position: relative;
  padding:30px 30px 10px 30px;
}
.cardTitleText{
  font-weight: bold;
  font-size: 20px;
}
</style>