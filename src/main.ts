import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import App from  '@/App.vue'
import router from "@/router";
import store from "@/store";

Vue.use(Buefy)
import '@/assets/css/main.css';
import users from "@/store/modules/users";

// initialize the fake authentication.
users.checkAuth()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
