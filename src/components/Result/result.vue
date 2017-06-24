<template>
  <div class="result">
    <div class="gradeBox" v-if="resultType==='readGrade'">
      <div class="grade">
        <div class="difficultyType">小学</div>
        <div class="allPass">{{allSubNum}}</div>
        <div class="gradeNum">{{ allSubNum * 10}}</div>
        <div class="allTime">{{getAllTime}}</div>
      </div>
      <div class="btnToRank" @click.stop="goToRank"></div>
    </div>
    <div class="RankBox" v-if="resultType==='readRank'">
      <div class="icon-title"></div>
      <div class="content">
        <div class="head">
          <div class="content-th">名次</div>
          <div class="content-th">姓名</div>
          <div class="content-th">闯关总分</div>
        </div>
        <table>
          <tr v-for="n in 10">
            <td>{{n}}</td>
            <td>dddddddd</td>
            <td>{{n}}</td>
          </tr>
        </table>
      </div>
      <div class="rankYou">您的排名为<span>130</span>， 击败了<span>1234</span>个玩家</div>
      <div class="btnGameAgain" @click.stop="playAgain"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  computed: {
    resultType: function () {
      return this.$store.state.answerPage.resultSelect
    },
    allSubNum: function () {
      return this.$store.state.answerPage.passNum
    },
    getAllTime: function () {
      let timeNum = this.$store.state.answerPage.answerTime
      if (timeNum < 60) {
        return timeNum + '秒'
      } else {
        return parseInt(timeNum / 60) + '分' + timeNum % 60 + '秒'
      }
    }
  },
  methods: {
    goToRank: function () {
      this.$store.commit('CHANGE_RESULT_SELCET', 'readRank')
    },
    playAgain: function () {
      this.$router.replace('home')
      this.$store.commit('CLEAR_STATE')
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.result{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: #360407 url('./result-bg.png') no-repeat;
  background-size: 100%;
}
.result .grade{
  width: 5rem;
  height: 5.6rem;
  margin: 1.35rem auto 0;
  background:  url('./result-tip.png') no-repeat;
  background-size: 100%;
}
.result .grade .difficultyType{
  padding-top: 1.75rem;
  margin-left: 0.3rem;
  font-size: 0.45rem;
  font-weight: 600;
  color: rgb(211,71,61);
}
.result .grade .allPass, .result .grade .gradeNum{
  margin-left: 0.4rem;
  margin-bottom: 0.05rem;
  font-weight: 600;
  font-size: 0.61rem;
  color: #900000;
}
.result .grade .allTime{
  margin-left: 0.9rem;
  margin-top: 0.11rem;
  font-size: 0.37rem;
  color: #900000;
}
.result .btnToRank{
  width: 2.55rem;
  height: 0.8rem;
  margin: 0.8rem auto 0;
  background:  url('./btnToRank.png') no-repeat;
  background-size: 100%;
}
.result .RankBox .icon-title{
  width: 4rem;
  height: 1.4rem;
  margin: 0.55rem auto 0.15rem;
  background:  url('./rank-title.png') no-repeat;
  background-size: 100%;
}
.result .RankBox .content{
  width: 5.7rem;
  margin: auto;
  font-size: 0.26rem;
}
.result .content .head{
  display: flex;
  height: 0.6rem;
  padding: 0.05rem;
  line-height: 0.6rem;
  color: #fff;
  background: #930000;
}
.result .content .content-th:nth-child(1){
   width: 0.88rem;
 }
.result .content .content-th:nth-child(2){
  width: 3.4rem;
}
.result .content .content-th:nth-child(3){
  width: 1.3rem;
}
.result .content table{
  width: 100%;
  padding: 0.05rem;
  background: rgb(248,228,126)
}
.result  .content  tr{
  height: 0.6rem;
  font-weight: 600;
}
.result  .content  tr:nth-child(2n+1){
  background: rgb(231,194,22);
}
.result  .content  tr:nth-child(2n){
  background: rgb(245,214,68);
}
.result .content  tr td:first-child{
  width: 0.88rem;
}
.result .content  tr:first-child td:first-child{
  font-size: 0.4rem;
  color: rgb(219,72,87);
}
.result .content  tr:nth-child(2) td:first-child{
  font-size: 0.4rem;
  color: rgb(227,137,0);
}
.result .content  tr:nth-child(3) td:first-child{
  font-size: 0.4rem;
  color: rgb(93,47,137);
}
.result .content  tr td:last-child{
  width: 1.3rem;
  font-weight: 100;
}
.RankBox .rankYou{
  font-size: 0.26rem;
  color: rgb(245,214,68);
}
.RankBox .rankYou span{
  font-size: 0.32rem;
  color: rgb(245,68,68);
}
.RankBox .btnGameAgain{
  width: 2.55rem;
  height: 0.8rem;
  margin: auto;
  background:  url('./btnGameAgain.png') no-repeat;
  background-size: 100%;
}
</style>
