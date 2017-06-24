import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home/home.vue'
import answer from '../components/Answer/answer.vue'
import single from '../components/Subject/single.vue'
import blank from '../components/Subject/blank.vue'
import morePic from '../components/Subject/morePic.vue'
import onePic from '../components/Subject/onePic.vue'
import words from '../components/Subject/words.vue'
import result from '../components/result/result.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: home
    }, {
      path: '/home',
      name: 'home',
      component: home
    }, {
      path: '/answer',
      component: answer,
      children: [
        {
          path: '',
          component: single
        },
        {
          path: 'single',
          component: single
        },
        {
          path: 'blank',
          component: blank
        },
        {
          path: 'morePic',
          component: morePic
        },
        {
          path: 'onePic',
          component: onePic
        },
        {
          path: 'words',
          component: words
        }
      ]
    }, {
      path: '/result',
      name: 'result',
      component: result
    }
  ]
})
