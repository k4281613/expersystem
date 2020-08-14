import Vue from 'vue'
import Router from 'vue-router'
import loginindex from '@/components/loginindex'
import resindex from '@/components/resindex'
import zhuye from '@/components/zhuye'
import content from '@/components/content'
import home from '@/components/home'
import suoyou from '@/components/suoyou'
import guanli from '@/components/guanli'
import upload from '@/components/upload'
import download from '@/components/download'
import shezhi from '@/components/shezhi'
import selectCourse from '@/components/selectCourse'
import dongtai from '@/components/dongtai'

import teacherindex from '@/components/teacherface/teacherindex'
import teaHome from '@/components/teacherface/tea_home'
import teaHomeChild from '@/components/teacherface/teaHome_child'
import teaSetting from '@/components/teacherface/tea_setting'
import teaCourse from '@/components/teacherface/tea_course'
import teaCourseCtx from '@/components/teacherface/teaCourse_child/course_ctx'
import teaCourseStuChild from '@/components/teacherface/teaCourse_child/stuctx_child'
import teaCourseStu from '@/components/teacherface/teaCourse_child/stu_ctx'
import teaExper from '@/components/teacherface/tea_exper'
import teaExperassign from '@/components/teacherface/teaExper_child/assignupload'
import teaExperMange from '@/components/teacherface/teaExper_child/experMange'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginindex',
      component: loginindex
    },
    {
      path: '/resindex',
      component: resindex
    },
    {
      path: '/zhuye',
      component: zhuye,
      children: [
        {
          path: '/',
          component: home,
          children: [
            {
              path: '/',
              component: suoyou
            },
            {
              path:'/dongtai',
              component:dongtai
            }
          ]
        },
        {
          path: '/guanli',
          component: guanli,
          children: [
            {
              path: '/',
              component: upload
            },
            {
              path: '/guanli/download',
              component: download
            }
          ]
        },
        {
          path: '/selectCourse',
          component: selectCourse
        },
        {
          path: '/shezhi',
          component: shezhi
        }
      ]
    },
    {
      path: '/teacherindex',
      component: teacherindex,
      children: [
        {
          path: '/',
          component: teaHome,
          children: [
            {
              path: '/',
              component: teaHomeChild
            }
          ]
        },
        {
          path: '/tea_course',
          component: teaCourse,
          children: [
            {
              path: '/',
              component: teaCourseCtx
            },
            {
              path: '/tea_course/stu_ctx',
              component: teaCourseStu,
              children: [
                { path: '/', component: teaCourseStuChild }
              ]
            }
          ]
        },
        {
          path: '/tea_exper',
          component: teaExper,
          children: [
            {
              path: '/',
              component: teaExperassign
            },
            {
              path: '/tea_exper/experMange',
              component: teaExperMange
            }
          ]
        },
        {
          path: '/tea_setting',
          component: teaSetting
        }
      ]
    },
    {
      path: '*', redirect: '/'
    }
  ]
})
