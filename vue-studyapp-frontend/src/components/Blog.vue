<template>
  <div>
    <!-- Blog info:-->
    <p class="homeText">{{ this.blog.title }}</p>
    <div class="editBlog">
      <b-button squared variant="warning" v-if="myBlog" @click="handleShowEditForm"><b-icon icon="pencil"></b-icon> Edit wordlist</b-button>
      <b-button squared variant="danger" v-if="myBlog" @click="deleteBlog"><b-icon icon="trash-fill"></b-icon> Delete wordlist</b-button>
    </div>
    <button v-if="!myBlog" @click="addToMyCollection()">Add to my collection</button>

    <!-- Edit blog form:-->
    <div id="edit-blog-form" v-if="myBlog && !isHidden">
      <b-form>
        <b-form-group id="input-group-1" label="Title:" label-for="input-1">
          <b-form-input
              id="input-1"
              type="text"
              v-model="editedBlog.title"
              placeholder="Enter title"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Description:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="editedBlog.url"
              type="text"
              placeholder="Enter description"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Language 1:" label-for="input-3">
          <b-form-select
              id="input-3"
              v-model="editedBlog.category"
              :options="languages1"
              required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Language 2:" label-for="input-3">
          <b-form-select
              id="input-3"
              v-model="editedBlog.category2"
              :options="languages2"
              required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
              id="checkboxes-4"
              v-model="editedBlog.status"
              :aria-describedby="ariaDescribedby"
          >
            <b-form-checkbox value="private">Private</b-form-checkbox>
            <b-form-checkbox value="public">Public</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary" @click="handleEditBlog">Save changes</b-button>
        <b-button type="submit" variant="primary" @click="handleHideEditForm">Cancel</b-button>
      </b-form>
    </div>

    <div class="infoText">
      <p>Author: {{ this.blog.author }}</p>
      <p>Description: {{ this.blog.url }}</p>
      <p>{{ this.blog.category }} for {{ this.blog.category2 }} speakers</p>
      <p>Status: {{ this.blog.status }}</p>
    </div>

    <div class="games">
      <router-link :to="{ path: '/quiz/' + this.blogId }" v-bind:cards="cards" v-bind:blogs="blogs">
        <b-button pill variant="primary" ><b-icon icon="controller" font-scale="3"></b-icon></b-button>
      </router-link>
    </div>

    <h5>Add a new card:</h5>
    <!-- Add card form:-->
    <div v-if="myBlog" class="addWordForm">
      <b-form inline>
        <label class="sr-only">Username</label>
        <b-input-group prepend="Word" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-word"
                        placeholder="Enter word"
                        v-model="cardObject.word"
          ></b-form-input>
        </b-input-group>

        <label class="sr-only">Username</label>
        <b-input-group prepend="Translate" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-translate"
                        placeholder="Enter translate"
                        v-model="cardObject.translate"
          ></b-form-input>
        </b-input-group>

        <label class="sr-only">Username</label>
        <b-input-group prepend="Example" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-example"
                        placeholder="Enter example"
                        v-model="cardObject.examples"
          ></b-form-input>
        </b-input-group>
        <b-button variant="info" @click="handleAddCard">Add</b-button>
      </b-form>
    </div>

    <!-- Table of cards:-->
    <table class="wordsTable">
      <thead>
      <tr>
        <th>Word</th>
        <th>Translate</th>
        <th>Example</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="card in cardsOfBlog" :key="card.id">
        <td>{{ card.word }}</td>
        <td>{{ card.translate }}</td>
        <td>{{ card.examples }}</td>
        <td><b-button variant="warning" v-if="myBlog" @click="showModal(card)" ref="btnShow">
          <b-icon icon="pencil"></b-icon> Edit</b-button>
        </td>
        <td><b-button variant="danger" v-if="myBlog" @click="deleteCard(card)">
          <b-icon icon="trash-fill"></b-icon> Delete</b-button>
        </td>
      </tr>
      </tbody>
    </table>

    <b-modal id="modal-1" hide-footer title="Edit card:">
      <div class="d-block">
        <!-- Edit card form:-->
        <div v-if="myBlog">
          <b-form inline>
            <label class="sr-only">Username</label>
            <b-input-group prepend="Word" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-word"
                            placeholder="Enter word"
                            v-model="editedCard.word"
              ></b-form-input>
            </b-input-group>

            <label class="sr-only">Username</label>
            <b-input-group prepend="Translate" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-translate"
                            placeholder="Enter translate"
                            v-model="editedCard.translate"
              ></b-form-input>
            </b-input-group>

            <label class="sr-only">Username</label>
            <b-input-group prepend="Example" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-example"
                            placeholder="Enter example"
                            v-model="editedCard.examples"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </div>
      </div>
      <b-button @click="handleEditCard">Save changes</b-button>
    </b-modal>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import cardService from '@/services/cards.js';
import blogService from '@/services/blogs.js';
export default {
  name: "Blog",
  props: {
    blogs: Array, cards: Array, user: null,
    myBlog: {
      type: Boolean,
      default: false
    },
    isHidden: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    blogs() {
      for(let i = 0; i < this.blogs.length; i++) {
        if(this.blogs[i].id == this.blogId) {
          this.blog = this.blogs[i]
        }
      }
      if (this.blog.user.name === this.user.name) {
        this.myBlog = true
      }
      this.setCardsOfBlog()
    },
  },
  created() {
    console.log("blog created")
    this.$parent.appSetUsers()
    this.$parent.appSetBlogs()
    this.$parent.appSetCards()

    for(let i = 0; i < this.blogs.length; i++) {
      //console.log(i)
      //console.log(this.blogs[i].id)
      //console.log(this.blogs[i].title)
      if(this.blogs[i].id == this.blogId) {
        //console.log(this.blogs[i].title)
        this.blog = this.blogs[i]
        //console.log("test" + this.cards.toString())
        //console.log(this.blog.cards[1])
      }
    }

    /*for(let i = 0; i < this.blog.cards.length; i++) {
      for(let a = 0; a < this.cards.length; a++) {
        if(this.cards[a].id == this.blog.cards[i]) {
          console.log("Words 3: " + this.cards[a].word)
          console.log("Words 3: " + this.cards[a].translate)
          this.cardsOfBlog.push(this.cards[a])
        }
      }
    }*/
    this.setCardsOfBlog()

    if (this.blog.user.name === this.user.name) {
      this.myBlog = true
    }

    this.setupEditedBlog()

  },
  data() {
    return {
      fields: ['word', 'translate', 'examples'],
      blogId: this.$route.params.id,
      blog: null,
      cardsOfBlog: [],
      allBlogs: Array,
      cardObject: {
        word: '',
        translate: '',
        examples: '',
        blogId: this.$route.params.id
      },
      languages1: [{ text: 'Select One', value: null }, 'Arabic', 'Armenian', 'Czech', 'Chinese', 'Danish', 'Dutch', 'English', 'Estonian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'French', 'Finnish', 'Japanese', 'Kazakh', 'Korean', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'other'],
      languages2: [{ text: 'Select One', value: null }, 'Arabic', 'Armenian', 'Czech', 'Chinese', 'Danish', 'Dutch', 'English', 'Estonian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'French', 'Finnish', 'Japanese', 'Kazakh', 'Korean', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'other'],
      editedBlog: {
        title: '',
        url: '',
        author: this.user.username,
        status: [].toString(),
        category: null,
        category2: null,
      },
      editedCard: {
        word: '',
        translate: '',
        examples: '',
        blogId: this.$route.params.id
      },
      cardForEdit: null,
      updatedCards: Array,
      newBlog: {
        likes: 0,
        title: '',
        url: '',
        user: null,
        author: null,
        status: '',
        category: null,
        category2: null,
        originalBlog: '',
      },
      updatedBlogs: []
    }
  },
  methods: {
    setCardsOfBlog() {
      //console.log('setCards2 called')
      this.cardsOfBlog.splice(0)
      for(let i = 0; i < this.blog.cards.length; i++) {
        for(let a = 0; a < this.cards.length; a++) {
          if(this.cards[a].id == this.blog.cards[i]) {
            //console.log("Words 3: " + this.cards[a].word)
            //console.log("Words 3: " + this.cards[a].translate)
            this.cardsOfBlog.push(this.cards[a])
          }
        }
      }
    },
    async deleteBlog() {
      const confirm = window.confirm(`Are you sure you want to delete "${this.blog.title}" wordlist?`)
      if (confirm) {
        if (this.cardsOfBlog !== null) {
          cardService.setToken(this.user.token)
          for (let i = 0; i < this.cardsOfBlog.length; i++) {
            await cardService.remove(this.cardsOfBlog[i].id, this.user.token)
          }
        }
        blogService.setToken(this.user.token)
        await blogService.remove(this.blog.id, this.user.token)
        this.$parent.makeToast('success', 'The wordlist was deleted successfully', 'Success!')
        this.allBlogs = await blogService.getAll()
        this.$emit('allBlogs', this.allBlogs);
        console.log('this.user.token ' + this.user.token)
        console.log('this.blog.id ' + this.blog.id)
        await this.$parent.appSetBlogs()
        await this.$parent.appSetCards()
        await this.$router.replace({name: "Home"})/*.catch(()=>{});*/
      }
    },
    async addCard(cardObject) {
      console.log('Creating card')
      if(cardObject.word != '' && cardObject.translate != '') {
        cardService.setToken(this.user.token)
        try {
          cardService.create(cardObject)
          this.$parent.makeToast('success', 'New word was added successfully.', 'Success!')
          this.cardObject.word = ''
          this.cardObject.translate = ''
          this.cardObject.examples = ''
        } catch (error) { return error }
      } else {
        console.log('Word and translate fields can not be empty')
        this.$parent.makeToast('danger', 'Word and Translate fields cannot be empty. Please fill in the fields to add a new word.', 'Warning!')
      }
    },
    async handleAddCard() {
      await this.addCard(this.cardObject)
      await this.$parent.appSetUsers()
      await this.$parent.appSetBlogs()
      await this.$parent.appSetCards()
      this.setCardsOfBlog()
    },
    async deleteCard(card) {
      const confirm = window.confirm(`Are you sure you want to delete "${card.word}" card from the "${this.blog.title}" wordlist?`)
      if (confirm) {
        cardService.setToken(this.user.token)
        await cardService.remove(card.id, this.user.token)
        //this.cards = await cardService.getAll()
        //console.log('updatedCards' + this.updatedCards)
        await this.$parent.appSetCards()
        this.setCardsOfBlog()
        this.$parent.makeToast('success', 'The word was deleted successfully.', 'Success!')
      }
    },
    handleEditBlog() {
      const confirm = window.confirm(`Are you sure you want to edit this wordlist?`)
      if (confirm) {
        console.log('edited blog: ' + this.editedBlog)
        blogService
            .update(this.blog.id, this.editedBlog)
        this.handleHideEditForm()
        this.blog = this.editedBlog
        this.$parent.makeToast('success', 'The wordlist was edited successfully.', 'Success!')
        //this.$parent.appSetBlogs()
        //this.$parent.appSetCards()
        //this.setCardsOfBlog()
      }
    },
    handleShowEditForm() {
      this.isHidden = false
    },
    handleHideEditForm() {
      this.isHidden = true
    },
    setupEditedBlog() {
      this.editedBlog.title = this.blog.title
      this.editedBlog.url = this.blog.url
      this.editedBlog.author = this.blog.author
      this.editedBlog.status = this.blog.status
      this.editedBlog.category = this.blog.category
      this.editedBlog.category2 = this.blog.category2
    },
    setupEditedCard() {
      this.editedCard.word = this.cardForEdit.word
      this.editedCard.translate = this.cardForEdit.translate
      this.editedCard.examples = this.cardForEdit.examples
      this.editedCard.blogId = this.blog.id
    },
    showModal(cardForEdit) {
      this.cardForEdit = cardForEdit
      console.log('cardForEdit: ' + cardForEdit.word)
      this.setupEditedCard()
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.cardForEdit = null
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    handleEditCard() {
      console.log('edited card: ' + this.cardForEdit.id)
      cardService
          .update(this.cardForEdit.id, this.editedCard)
      this.hideModal()
    },
    addToMyCollection() {
      try {
        this.newBlog.title = this.blog.title
        this.newBlog.url = this.blog.url
        this.newBlog.user = this.user
        this.newBlog.author = this.blog.author
        //this.newBlog.status = 'private'
        this.newBlog.status = 'added'
        this.newBlog.category = this.blog.category
        this.newBlog.category2 = this.blog.category2
        this.newBlog.originalBlog = this.blogId

        blogService
            .create(this.newBlog)
        console.log('blog added ' + this.newBlog)

        //this.$parent.appSetBlogs()

        //this.updatedBlogs = blogService.getAll()

        //console.log('blog added id: ' + this.newBlog.id)
        //let lastBlogId = this.blogs[this.blogs.length].id
        /*let lastBlogId = this.updatedBlogs[this.updatedBlogs.length].id

        //console.log('added blog id 2: ' + lastBlogId)
        console.log('this.blogs.length: ' + lastBlogId)*/

        /*this.$parent.appSetBlogs();

        let lastBlogId = this.blogs[this.blogs.length-1].id
        console.log('this.blogs.length: ' + lastBlogId)*/

        this.makeToast('success', 'Wordlist was added successfully into your collection.', 'Success!')
      } catch (error) {
        console.log('error ' + error)
        this.makeToast('danger', 'Wordlist was not added into your collection.', 'Error occurred!')
      }
    }
  }
}
</script>

<style scoped>
.homeText{
  font-size: 30px;
  color: #212121;
  position: relative;
  padding:30px 30px 0px 0px;
}
.games{
  padding:00px 0px 20px 0px;
}
.addWordForm{
  padding:0px 0px 30px 0px;
}
.editBlog{
  padding:10px 30px 30px 0px;
}
.infoText{
  padding:10px 20px 0px 0px;
}
.wordsTable{
  width: 100%;
  text-align: left;
}
tr:hover {background-color: #f6f6f6;}
</style>