import Vue from 'vue'
import Router from 'vue-router'

const Conversation = () => import('@/views/Conversation' /* webpackChunkName: "conversation" */)
const SignIn = () => import('@/views/SignIn' /* webpackChunkName: "signIn" */)
const SignUp = () => import('@/views/SignUp' /* webpackChunkName: "signUp" */)

Vue.use(Router)

const redirectToConversation = (to, from, next) => window.firebase.auth().currentUser ? next('/') : next()
const redirectToSignIn = (to, from, next) => !window.firebase.auth().currentUser ? next('/signIn') : next()

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'conversation',
            path: '/',
            component: Conversation,
            beforeEnter: redirectToSignIn
        },
        {
            name: 'signIn',
            path: '/signIn',
            component: SignIn,
            beforeEnter: redirectToConversation
        },
        {
            name: 'signUp',
            path: '/signUp',
            component: SignUp,
            beforeEnter: redirectToConversation
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
