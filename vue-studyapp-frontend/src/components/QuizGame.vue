<template>
  <div>
    <p class="homeText">Quiz game</p>
    <b-button v-if="!started" @click="start">Start</b-button>
    <p v-if="started">{{this.round}} / {{this.cardsOfBlog.length}}</p>
    <p class="homeText" v-if="started">{{this.question}}</p>
    <div v-if="started">
      <b-button @click="checkFirstAnswer" :variant="answerBtn1Variant">{{this.answer1}}</b-button>
      <b-button @click="checkSecondAnswer" :variant="answerBtn2Variant">{{this.answer2}}</b-button>
      <b-button @click="checkThirdAnswer" :variant="answerBtn3Variant">{{this.answer3}}</b-button>
      <b-button @click="checkFourthAnswer" :variant="answerBtn4Variant">{{this.answer4}}</b-button>
    </div>
    <b-button v-if="started" @click="nextQuestionBtn">Next</b-button>
  </div>
</template>

<script>
export default {
  name: "QuizGame",
  props: {
    cards: Array, blogs: Array
  },
  data() {
    return {
      blogId: this.$route.params.id,
      blog: null,
      cardsOfBlog: [],
      shuffledNumbers: [],
      'started': false,
      question: String,
      rightAnswer: String,
      answer1: String,
      answer2: String,
      answer3: String,
      answer4: String,
      answersIndex: [],
      shuffledAnswers: [],
      shuffledAnswers2: [],
      questions: [],        // array of Strings
      rightAnswers: [],     // array of Strings
      round: 0,
      wrongAnswers: [],     // array of Strings
      answerBtn1Variant: 'outline-primary',
      answerBtn2Variant: 'outline-primary',
      answerBtn3Variant: 'outline-primary',
      answerBtn4Variant: 'outline-primary',
      points: 0,
    }
  },
  watch: {
    blogs() {
      for(let i = 0; i < this.blogs.length; i++) {
        if(this.blogs[i].id == this.blogId) {
          this.blog = this.blogs[i]
          console.log('blog ' + this.blog.title)
        }
      }
      if (this.blog.user.name === this.user.name) {
        this.myBlog = true
      }
      this.setCardsOfBlog()
    }
  },
  mounted() {
    for(let i = 0; i < this.blogs.length; i++) {
      if(this.blogs[i].id == this.blogId) {
        this.blog = this.blogs[i]
        console.log('blog ' + this.blog.title)
      }
    }
    this.setCardsOfBlog()
  },
  methods: {
    start() {
      this.answerBtn1Variant = 'outline-primary'
      this.answerBtn2Variant = 'outline-primary'
      this.answerBtn3Variant = 'outline-primary'
      this.answerBtn4Variant = 'outline-primary'
      this.started = true
      this.round = 0
      this.points = 0
      this.setQuestions()
      this.question = this.questions[0]
      this.setWrongAnswers()
    },
    setQuestions() {
      //Shuffle all words in wordlist
      this.shuffle(this.cardsOfBlog)
      //Get one word for each round
      for(let i = 0; i < this.shuffledNumbers.length; i++) {
        ////console.log('shuffledNumbers ' + i + this.shuffledNumbers[i].word)
        //this.question = this.shuffledNumbers[i].word
        //this.rightAnswer = this.shuffledNumbers[i].translate
        this.questions.push(this.shuffledNumbers[i].word)
        this.rightAnswers.push(this.shuffledNumbers[i].translate)
      }
    },
    setWrongAnswers() {
      this.wrongAnswers.splice(0);

      this.wrongAnswers.push(this.rightAnswers[this.round])
      console.log('right answer: ' + this.rightAnswers[this.round])

      // here can also shuffle before
      for(let i = 0; i < 4; i++) {
        if((this.rightAnswers[this.round] !== this.cardsOfBlog[i].translate) && (this.wrongAnswers.length !== 4)) {
          this.wrongAnswers.push(this.cardsOfBlog[i].translate)
          console.log(i + ' wrong answer: ' + this.cardsOfBlog[i].translate)
        }
      }
      this.shuffleButtons(this.wrongAnswers)
      this.answer1 = this.shuffledAnswers2[0]
      this.answer2 = this.shuffledAnswers2[1]
      this.answer3 = this.shuffledAnswers2[2]
      this.answer4 = this.shuffledAnswers2[3]
    },
    nextQuestionBtn() {
      if(this.round < this.questions.length) {
        this.answerBtn1Variant = 'outline-primary'
        this.answerBtn2Variant = 'outline-primary'
        this.answerBtn3Variant = 'outline-primary'
        this.answerBtn4Variant = 'outline-primary'
        this.question = this.questions[this.round]
        this.setWrongAnswers()
      } else if (this.round >= this.questions.length) {
        this.started = false
        this.makeToast('success', `Your score: ${this.points} / ${this.cardsOfBlog.length}`, 'Well done!')
      }
    },
    checkFirstAnswer() {
      if (this.answer1 === this.rightAnswers[this.round]) {
        console.log('RIGHT!')
        this.answerBtn1Variant = 'success'
        this.points++
      } else {
        console.log('WRONG!')
        this.answerBtn1Variant = 'danger'
      }
      this.round++
    },
    checkSecondAnswer() {
      if (this.answer2 === this.rightAnswers[this.round]) {
        console.log('RIGHT!')
        this.answerBtn2Variant = 'success'
        this.points++
      } else {
        console.log('WRONG!')
        this.answerBtn2Variant = 'danger'
      }
      this.round++
      /*if(this.round < this.questions.length) {
        this.question = this.questions[this.round]
        this.setWrongAnswers()
      } else if (this.round >= this.questions.length) {
        this.started = false
      }*/
    },
    checkThirdAnswer() {
      if (this.answer3 === this.rightAnswers[this.round]) {
        console.log('RIGHT!')
        this.answerBtn3Variant = 'success'
        this.points++
      } else {
        console.log('WRONG!')
        this.answerBtn3Variant = 'danger'
      }
      this.round++
    },
    checkFourthAnswer() {
      if (this.answer4 === this.rightAnswers[this.round]) {
        console.log('RIGHT!')
        this.answerBtn4Variant = 'success'
        this.points++
      } else {
        console.log('WRONG!')
        this.answerBtn4Variant = 'danger'
      }
      this.round++
    },
    randomAnswers(i) {
      this.answersIndex.splice(0);
      for(let a = 0; a < 3; a++) {
        let r = Math.floor(Math.random() * this.shuffledNumbers.length)
        while(r === i) {
          r = Math.floor(Math.random() * this.shuffledNumbers.length)
        }
        if(r !== i) {
          this.answersIndex.push(r)
        }
      }
    },
    shuffle(array) {
      let numbers = [...array];
      let first,
          second,
          temp,
          count = numbers.length;
      for (let i = 0; i < numbers.length; i++) {
        first = Math.floor(Math.random() * count);
        second = Math.floor(Math.random() * count);
        temp = numbers[first];
        numbers[first] = numbers[second];
        numbers[second] = temp;
      }
      this.shuffledNumbers = numbers;
    },
    shuffleButtons(array) {
      let numbers = [...array];
      let first,
          second,
          temp,
          count = numbers.length;
      for (let i = 0; i < numbers.length; i++) {
        first = Math.floor(Math.random() * count);
        second = Math.floor(Math.random() * count);
        temp = numbers[first];
        numbers[first] = numbers[second];
        numbers[second] = temp;
      }
      this.shuffledAnswers2 = numbers;
    },
    setCardsOfBlog() {
      this.cardsOfBlog.splice(0)
      for (let i = 0; i < this.blog.cards.length; i++) {
        for (let a = 0; a < this.cards.length; a++) {
          if (this.cards[a].id == this.blog.cards[i]) {
            //console.log("Words 3: " + this.cards[a].word)
            this.cardsOfBlog.push(this.cards[a])
          }
        }
      }
    },
    makeToast(variant = null, text, title) {
      this.$bvToast.toast(text, {
        title: title,
        variant: variant,
        solid: true,
        toaster: 'b-toaster-top-center'
      })
    }
  }
}
</script>

<style scoped>
.homeText{
  font-size: 30px;
  color: #212121;
  /*text-align: center;*/
  position: relative;
  padding:30px 30px 0px 0px;
}
</style>