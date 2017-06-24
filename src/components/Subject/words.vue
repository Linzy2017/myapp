<template>
  <div class="words">
    <div class="wordImg">
      <img src="./wordImg.png"/>
    </div>
    <ul class="wordsInGroup">
      <li v-for="n in inWordsNum" >{{setWord(n)}}</li>
      <li class="delete" @click.stop="clearWord"></li>
    </ul>
    <ul class="wordsOutGroup">
      <li v-for="key in outWords" @click.stop="addWord(key)" >{{key}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default{
  created () {
    this.getPost()
  },
  data () {
    return {
      inWordsNum: 6,
      inWords: [],
      outWords: []
    }
  },
  computed: {
    pageChange: function () {
      return this.$store.state.answerPage.subjectNum
    }
  },
  watch: {
    pageChange: {
      handler () {
        this.getPost()
        this.clearWord()
      },
      deep: true
    }
  },
  methods: {
    //  点击字框传数据到inwords
    addWord: function (mes) {
      if (this.inWords.length < 6) {
        this.inWords.push(mes)
        this.$store.commit('CHANGE_SUBJECT_NOWKEY', this.inWords.join(''))
      }
    },
    //  向框内添加字
    setWord: function (index) {
      // 数组0开始 index 1开始
      return this.inWords[index - 1]
    },
    //  清空字
    clearWord: function () {
      this.inWords = []
    },
    getPost: function () {
      let that = this
      axios.get('/static/data.json')
        .then(function (response) {
          let obj = response.data.subject.words
          let wordsNum = Math.round(Math.random() * (obj.length - 1))
          that.outWords = response.data.subject.words[wordsNum].selection.split('').sort(function (a, b) {
            return Math.random() > 0.1 ? 1 : 0
          })
          that.$store.commit('CHANGE_SUBJECT_RIGHTKEY', obj[wordsNum].key)
          that.$store.commit('CHANGE_SUBJECT_NOWTYPE', 'words')
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.wordImg{
  width: 5.9rem;
  height: 3.02rem;
  margin: 0.3rem auto;
}
ul.wordsInGroup{
  display: flex;
  margin: 0 0.2rem;
  justify-content: space-between;
}
ul.wordsOutGroup{
  display: flex;
  margin: 0.35rem 0.1rem 0;
  flex-wrap: wrap;
}
ul.wordsInGroup li{
  width: 0.8rem;
  height: 0.85rem;
  font-size: 0.42rem;
  line-height: 0.85rem;
  color: #fff;
  background: url("./word-in.png") no-repeat;
  background-size:100% 100%;
}
ul.wordsInGroup li.delete{
  background-image: url("./word-delete.png");
}
ul.wordsOutGroup li{
  width: 0.85rem;
  height: 0.9rem;
  margin: 0 0.195rem 0.35rem;
  font-size: 0.42rem;
  line-height: 0.9rem;
  color: rgb(144,0,0);
  background: url("./word-out.png" ) no-repeat;
  background-size:100% 100%;
}
</style>
