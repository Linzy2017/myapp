<template>
  <div class="tip" v-if="tipType!==''">
    <div class="mask"></div>
    <div class="success messageBox" v-if="tipType==='success'">
      <div class="title">
        <img src="./congratulation1.png"/>
      </div>
      <h1>小提示：继续有风险哦~</h1>
      <ul class="group">
        <li class="btnGo" @click.stop="answerGoOn"></li>
        <li class="btnGiveUp"></li>
        <li class="btnTGGL"></li>
      </ul>
    </div>
    <div class="defeat messageBox" v-if="tipType==='defeat'">
      <div class="title">
        <img src="./defeat1.png"/>
      </div>
      <h1>您本次机会分数清零</h1>
      <ul class="group">
        <li class="btnCKCJ" @click.stop="goToResultGrade"></li>
        <li class="btnTGGL"></li>
      </ul>
    </div>
    <div class="clearance messageBox" v-if="tipType==='clearance'">
      <div class="title">
        <img src="./clearance1.png"/>
      </div>
      <h1>您简直太棒啦！恭喜通关~</h1>
      <ul class="group">
        <li class="btnCKCJ" @click.stop="goToResultGrade"></li>
        <li class="btnTGGL"></li>
      </ul>
    </div>
    <div class="selectType messageBox" v-if="tipType==='selectType'">
      <div class="title">
      </div>
      <h1>请选择您要参加的难度</h1>
      <ul class="group">
        <li class="btnPrimary" @click.stop="goToPrimary"></li>
        <li class="btnMiddle"></li>
        <li class="btnCollage"></li>
      </ul>
    </div>
    <div class="loginBox" v-if="tipType==='login'">
      <div class="group">
        <label>账号:</label>
        <input type="text" placeholder="请输入账号aa" class="account" v-model="account"/>
      </div>
      <div class="group">
        <label>密码:</label>
        <input type="password" placeholder="请输入密码" class="password" v-model="password"/>
      </div>
      <div class="btnLogin" @click.stop="goToLogin">登入</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data () {
    return {
      PrimaryType: ['single', 'words'],
      account: '',
      password: ''
    }
  },
  props: ['tipType'],
  watch: {
    account: {
      handler (curVal, oldVal) {
        this.password = this.getCookie(curVal)
      },
      deep: true
    }
  },
  methods: {
    // 首页提示框的选择难度=》小学跳转
    goToPrimary: function () {
      let typeNum = Math.round(Math.random())
      this.$router.replace('answer/' + this.PrimaryType[typeNum])
//      if (this.$store.state.answerPage.loginType) {
//        this.$router.replace('answer/' + this.PrimaryType[typeNum])
//      } else {
//        this.tipLogin = true
//      }
    },
    answerGoOn: function () {
      let typeNum = Math.round(Math.random())
      this.$router.replace(this.PrimaryType[typeNum])
      if (this.PrimaryType[typeNum] === this.$store.state.answerPage.subjectType) {
        this.$emit('changeTipType', '')
      } else {
        this.$emit('changeTipType', '')
      }
      this.$store.commit('CHANGE_SUBJECT_LASTTYPE', this.PrimaryType[typeNum])
    },
    goToResultGrade: function () {
      this.$store.commit('CHANGE_RESULT_SELCET', 'readGrade')
      this.$router.replace('/result')
    },
    goToLogin: function () {
      let account = document.querySelector('.account').value
      let pwd = document.querySelector('.password').value
      let that = this
      axios.get('/static/data.json')
        .then(function (response) {
          let user = response.data.user
          for (let i in user) {
            if (account === user[i].account && pwd === user[i].password) {
              that.$emit('changeTipType', '')
              that.setCookie(account, pwd, that.setCookieDate(7))
              that.$store.commit('CHANGE_LOGIN_TYPE')
            }
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    setCookie: function (name, value, expires, path, domain, secure) {
      let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
      if (expires instanceof Date) {
        cookieText += ';expires=' + expires.toGMTString()
      }
      if (path) {
        cookieText += ';path=' + path
      }
      if (domain) {
        cookieText += ';domain=' + domain
      }
      if (secure) {
        cookieText += ';secure'
      }
      document.cookie = cookieText
    },
    getCookie: function (name) {
      let cookieName = encodeURIComponent(name) + '='
      let cookieStart = document.cookie.indexOf(cookieName)
      let cookieValue = null
      if (cookieStart > -1) {
        let cookieEnd = document.cookie.indexOf(';', cookieStart)
        if (cookieEnd === -1) {
          cookieEnd = document.cookie.length
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
      }
      return cookieValue
    },
    unsetCookie: function (name, path, domain, secure) {
      this.set(name, '', new Date(0), domain, path)
    },
    setCookieDate: function (day) {
      let date = null
      if (typeof day === 'number' && day > 0) {
        date = new Date()
        date.setDate(date.getDate() + day)
      } else {
        throw new Error('!!')
      }
      return date
    }
  }
}
</script>

<style lang="stylus" type="stylesheet/stylus">
.tip .mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 102;
}
.tip .messageBox{
  z-index: 103;
  position: absolute;
  left: 0.45rem;
  top: 0.75rem;
  width: 5.5rem;
  height: 7.1rem;
  background: url("./messageBox.png") no-repeat;
  background-size:100% 100%;
}
.tip .messageBox ul.group li{
  width: 2.6rem;
  height: 0.8rem;
  margin: 0 auto 0.2rem;
  background-size:100% 100%;
}
.tip .messageBox .title{
  width: 1.5rem;
  margin: 0.6rem auto;
}
.tip .defeat.messageBox .title{
  width: 2.2rem;
}
.tip .messageBox h1{
  margin-bottom: 1.15rem;
  font-size: 0.34rem;
  color: rgb(116,66,24);
}
.tip .messageBox .btnGo{
  background: url("./continueBtn.png");
  background-size:100% 100%;
}
.tip .messageBox .btnGiveUp{
  background: url("./giveUpBtn.png");
}
.tip .messageBox .btnTGGL{
  background: url("./yxgl.png");
}
.tip .messageBox .btnCKCJ{
  background: url("./ckcj.png");
}
.tip .messageBox .btnPrimary{
  background: url("./primary.png");
}
.tip .messageBox .btnMiddle{
  background: url("./middle.png");
}
.tip .messageBox .btnCollage{
  background: url("./collage.png");
}
.tip .loginBox{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  z-index: 104;
  position: absolute;
  top: 2rem;
  left: 0.7rem;
  width: 5rem;
  height: 4.5rem;
  background: rgba(0,0,0,0.5);
  border-radius: 6%;
}
.tip .loginBox .group{
  height: 0.8rem;
  line-height: 0.8rem;
}
.tip .loginBox .group input{
  width: 2.8rem;
  height: 0.45rem;
  margin-left: 0.15rem;
  text-indent: 0.15rem;
}
.tip .loginBox .group label{
  font-size: 0.25rem;
  color: #fff;
}
.tip .btnLogin{
  width: 1.4rem;
  height: 0.4rem;
  margin: 0 auto;
  line-height: 0.4rem;
  font-size: 0.3rem;
  background: #fff;
  border-radius: 5%;
}
</style>
