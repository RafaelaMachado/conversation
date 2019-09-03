import Vue from 'vue'
import Router from 'vue-router'

const Conversation = () => import('@/views/Conversation' /* webpackChunkName: "conversation" */)
const SignIn = () => import('@/views/SignIn' /* webpackChunkName: "signIn" */)
const SignUp = () => import('@/views/SignUp' /* webpackChunkName: "signUp" */)

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'conversation',
            path: '/',
            component: Conversation
        },
        {
            name: 'signIn',
            path: '/signIn',
            component: SignIn
        },
        {
            name: 'signUp',
            path: '/signUp',
            component: SignUp
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
