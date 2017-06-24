<template>
  <div class="answer">
    <ul class="subjectOrder">
      <li class="item" v-for="n in 10" :class="{'subDone':n<num,'subDoing':n===num}">{{n}}</li>
    </ul>
    <div class="subject">
      <div class="timer">{{time}}</div>
      <router-view></router-view>
    </div>
    <div class="submit" @click.stop="submitReault"></div>
    <tip :tipType="tipType" @changeTipType="changeType"></tip>
  </div>
</template>

<script type="text/ecmascript-6">
import tip from '../Tip/tip.vue'
export default {
  data () {
    return {
      tipType: '',
      time: 15,
      allTime: 0,
      timeFlag: false
    }
  },
  mounted () {
    let time = setInterval(() => {
      this.time --
      if (this.time <= 0) {
        clearInterval(time)
        if (this.tipType === '') {
          this.tipType = 'defeat'
        }
      }
    }, 1000)
    let allTime = setInterval(() => {
      this.allTime ++
      if (this.tipType === 'defeat' || this.tipType === 'clearance') {
        clearInterval(allTime)
        this.$store.commit('COUNT_ALL_TIME', this.allTime)
      }
    }, 1000)
  },
  computed: {
    // 返回已完成的答题数
    num: function () {
      return this.$store.state.answerPage.subjectNum
    }
  },
  methods: {
    // 子组件TIP向父组件answer传数据通道
    changeType: function (mes) {
      this.tipType = mes
    },
    // 提交按钮
    submitReault: function () {
      // 增加答题数目
      this.$store.commit('ADD_SUBJECT_NUM')
      if (this.$store.state.answerPage.nowKey === this.$store.state.answerPage.rightKey) {
        this.$store.commit('COUNT_PASS_NUM')
        if (this.$store.state.answerPage.subjectNum <= 10) {
          this.tipType = 'success'
          this.$store.commit('RECOVERY_SUBJECT_KEY')
          this.time = 15
        } else {
          this.tipType = 'clearance'
          this.$store.commit('RECOVERY_SUBJECT_KEY')
        }
      } else {
        this.tipType = 'defeat'
      }
    }
  },
  components: {
    tip
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.answer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: #fff url('./answer-bg.png') no-repeat;
  background-size: 100%;
}
.answer div img{
  width: 100%;
  height: 100%;
}
.answer .subjectOrder{
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  height: 0.9rem;
  z-index: 100;
}
.answer .subjectOrder li{
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.26rem;
  text-align: center;
  line-height: 0.5rem;
  background: #fff;
  color: #a90000;
  border-radius: 50%;
}
.answer .subjectOrder li.subDone{
  font-size: 0;
  background:  url('./icon-done.png') no-repeat;
  background-size: 100%;
}
.answer .subjectOrder li.subDoing{
  color: #fff;
  background: #ff3000;
  border: 0.03rem solid #f4c300;
}
.answer .subject{
  position: relative;
}
.answer .submit{
  position: absolute;
  top: 8.75rem;
  left: 50%;
  width: 3.15rem;
  height: 0.95rem;
  margin-left: -1.57rem;
  background: url("./btn-submit.png") no-repeat;
  background-size: 100% ;
}
.answer .timer{
  font-size: 0.45rem;
  font-weight: 600;
  color: #a90000;
}
</style>
