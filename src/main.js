import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-css-only/css/bootstrap.min.css'
import UserAvatar from '@/components/UserAvatar'
import firebase from 'firebase'
import config from './config'
import moment from 'moment'

firebase.initializeApp(config)
window.firebase = firebase

Vue.component('UserAvatar', UserAvatar)

Vue.config.productionTip = false

moment.locale('pt-br')
Vue.filter('timeAgo', (date) => {
    if (date && 'seconds' in date) {
        return moment.unix(date.seconds).fromNow()
    }
})

firebase.auth().onAuthStateChanged(user => {
    store.dispatch('setCurrentUser', user)
    /* eslint-disable no-new */
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
