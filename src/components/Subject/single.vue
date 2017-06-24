<template>
  <div class="single">
    <h1>选择题</h1>
    <div class="singleSubject">{{singleSub}}</div>
    <ul class="singleBtn">
      <li v-for="(val,index) in seletBtns" @click.stop="select(val, index)" :class="{'active':index===selectData}">{{val}}</li>
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
      singleSub: '',
      seletBtns: [],
      selectData: null
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
        this.selectData = null
      },
      deep: true
    }
  },
  methods: {
    select: function (val, index) {
      this.selectData = index
      this.$store.commit('CHANGE_SUBJECT_NOWKEY', val)
    },
    getPost: function () {
      let that = this
      axios.get('/static/data.json')
        .then(function (response) {
          let obj = response.data.subject.single
          let wordsNum = Math.round(Math.random() * (obj.length - 1))
          that.seletBtns = obj[wordsNum].selection.sort(function (a, b) {
            return Math.random() > 0.1 ? 1 : 0
          })
          that.singleSub = obj[wordsNum].question
          that.$store.commit('CHANGE_SUBJECT_RIGHTKEY', obj[wordsNum].key)
          that.$store.commit('CHANGE_SUBJECT_NOWTYPE', 'single')
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.single h1{
  font-size: 0.35rem;
  font-weight: 600;
  color: rgb(144,0,0);
}
.single .singleSubject{
  height: 0.6rem;
  margin-top: 0.4rem;
  font-size: 0.32rem;
}
.single ul.singleBtn{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  height: 3.5rem;
  margin-top: 0.5rem;
}
.single ul.singleBtn li{
  position: relative;
  width: 4.8rem;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.3rem;
  color: #fff;
  background: #900000;
}
.single ul.singleBtn li.active{
  border: 0.03rem solid red;
  border-left: none;
  border-right: none;
  background: rgb(220,116,67);
}
.single ul.singleBtn li.active:before,ul.singleBtn li.active:after{
  top: -0.03rem;
  background: #dc7443;
  border: 0.03rem solid #f00;
}
.single ul.singleBtn li.active:before{
  border-right: none;
}
.single ul.singleBtn li.active:after{
  border-left:none;
}
.single ul.singleBtn li:before,ul.singleBtn li:after{
   content: '';
   position: absolute;
   display: inline-block;
   width: 0.35rem;
   height: 0.7rem;
   background: rgb(144,0,0);
 }
.single ul.singleBtn li:before{
  left: -0.3rem;
  border-radius: 100% 0 0 100%/50%;
}
.single ul.singleBtn li:after{
  right: -0.3rem;
  border-radius: 0 100% 100% 0/50%
}
</style>
