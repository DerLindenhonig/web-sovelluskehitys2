<template>
  <div>
    <p class="homeText">Create new wordlist</p>
    <b-form>
      <b-form-group id="input-group-1" label="Title:" label-for="input-1" class="boldText">
        <b-form-input
            id="input-1"
            type="text"
            v-model="blog.title"
            placeholder="Enter title"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2" class="boldText">
        <b-form-input
            id="input-2"
            v-model="blog.url"
            type="text"
            placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Teaching" label-for="input-3" class="boldText">
        <b-form-select
            id="input-3"
            v-model="blog.category"
            :options="languages1"
            required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="For ___ speakers" label-for="input-3" class="boldText">
        <b-form-select
            id="input-3"
            v-model="blog.category2"
            :options="languages2"
            required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
            id="checkboxes-4"
            v-model="blog.status"
            :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="private">Private</b-form-checkbox>
          <b-form-checkbox value="public">Public</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="info" @click="handleSubmit">Add</b-button>
    </b-form>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
    name: 'AddEvent',
      data() {
        return {
          blog: {
            title: '',
            url: '',
            author: this.user.username,
            status: [].toString(),
            category: null,
            category2: null,
          },
          languages1: [{ text: 'Select One', value: null }, 'Arabic', 'Armenian', 'Czech', 'Chinese', 'Danish', 'Dutch', 'English', 'Estonian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'French', 'Finnish', 'Japanese', 'Kazakh', 'Korean', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'other'],
          languages2: [{ text: 'Select One', value: null }, 'Arabic', 'Armenian', 'Czech', 'Chinese', 'Danish', 'Dutch', 'English', 'Estonian', 'German', 'Greek', 'Hindi', 'Hungarian', 'Italian', 'French', 'Finnish', 'Japanese', 'Kazakh', 'Korean', 'Norwegian', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swedish', 'Thai', 'Turkish', 'Ukrainian', 'Vietnamese', 'Welsh', 'other'],
        }
      },
      methods: {
        handleSubmit() {
          if(this.blog.title === '') {
            this.alertMessage = "Title is required."
          } else {
            this.$emit('add:blog', this.blog)
            // Empty input fields:
            this.blog.title = ''
            this.blog.url = ''
            this.blog.category = null
            this.blog.category2 = null
            this.$parent.appSetBlogs()
            //this.makeToast('success', 'New wordlist was added successfully')
            //this.$parent.appSetCards()
            this.$router.replace({name: "Home"})/*.catch(()=>{});*/
          }
        },
        /*makeToast(variant = null, text) {
          this.$bvToast.toast('Toast body content', {
            title: text,
            variant: variant,
            solid: true
          })
        }*/
      },
      props: {
        user: null
      },
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
.boldText{
  font-weight: bold;
}
</style>