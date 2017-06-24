<template>
  <div class="home">
    <ul class="btn-group">
      <li><img src="./tzgz.png"/></li>
      <li><img src="./zlcm.png"/></li>
      <li><img src="./kpzs.png"/></li>
      <li><img src="./zxgg.png"/></li>
    </ul>
    <div class="btn-start">
      <div class="start" @click.stop="selectType">
        <img src="./tzms.png"/>
      </div>
      <div class="hand-img">
        <img src="./hand.png"/>
      </div>
    </div>
    <tip :tipType="tipType" @changeTipType="changeType"></tip>
  </div>
</template>

<script type="text/ecmascript-6">
import tip from '../Tip/tip.vue'
export default {
  created () {
    if (!this.$store.state.answerPage.loginType) {
      this.tipType = 'login'
    }
  },
  data () {
    return {
      tipType: ''
    }
  },
  components: {
    tip
  },
  methods: {
    selectType: function () {
      this.tipType = 'selectType'
    },
    changeType: function (mes) {
      this.tipType = mes
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.home{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: #360407 url('./bg.jpg') no-repeat;
  background-size: 100%;
}
.home  img {
width:100%;
}
.home .btn-group{
  margin: 5.1rem 0 0 4.05rem;
}
.home .btn-group li{
  width: 1.65rem;
  height: 0.7rem;
}
.home .btn-start {
  position: relative;
  width: 3.6rem;
  height: 1.15rem;
  margin: 0.4rem auto 0;
}
.home .hand-img{
  position: absolute;
  top: -0.6rem;
  left: 0.5rem;
  width: 0.5rem;
  height: 1.1rem;
}
</style>
