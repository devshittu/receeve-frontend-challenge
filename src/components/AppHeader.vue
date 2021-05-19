<template>
  <div>

    <nav class="navbar top-nav">
      <div class="container ">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="https://receeve.com/wp-content/uploads/2020/08/receeve_logo.svg">
          </a>
          <div class="navbar-burger burger" data-target="">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="" href="#">
                  <b-icon
                      pack="fas"
                      icon=" fa-user-circle"
                      size="is-large">
                  </b-icon>
                </a>
                <span style="color: white">{{isAuthenticated? userInfo.firstName + '  '+ userInfo.lastName : 'Guest'}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav class="navbar shadow">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start bottom-nav " v-if="isAuthenticated">

            <router-link to="/dashboard" class="navbar-item is-active" tag="a" href="#">
              <b-icon
                  pack="fas"
                  icon=" fa-tachometer-alt"
                  size="is-medium">
              </b-icon>

              &nbsp;
              <span>Dashboard</span>
            </router-link>

            <router-link to="/accounts" class="navbar-item " tag="a" >

              <b-icon
                  pack="fa"
                  icon=" fa-users"
                  size="is-medium">
              </b-icon>
              &nbsp; <span>Accounts</span>
            </router-link>
          </div>

          <div class="navbar-start bottom-nav " v-else>

            <router-link to="/" class="navbar-item is-active" tag="a" href="#">
              <b-icon
                  pack="fas"
                  icon=" fa-exclamation-triangle"
                  size="is-medium has-text-warning-dark">
              </b-icon>

              &nbsp;
              <span>Please login to continue</span>
            </router-link>
          </div>
            <div class="navbar-end">
            <a href="#" @click="signOut" class="navbar-item" v-if="isAuthenticated">
              <b-icon
                  pack="fa"
                  icon=" fa-sign-out"
                  size="is-medium">
              </b-icon>

              &nbsp;
              <span>Sign out</span></a>
            <router-link to="/signin" class="navbar-item" v-else>
              <b-icon
                  pack="fa"
                  icon=" fa-sign-in"
                  size="is-medium">
              </b-icon>

              &nbsp;
              <span>Sign in</span></router-link>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import users from "@/store/modules/users";
@Component({})
export default class AppHeader extends Vue{
  // isAuthenticated:boolean = false
  signOut(){
    // destroyToken()
    users.signOut();
    this.$router.push('/signin')
  }
  get isAuthenticated(){
    return users.isAuthenticated;
  }
  get userInfo(){
    return users.user;
  }
  @Watch('isAuthenticated')
  isAuthenticationChanged(val: boolean) {
    this.$buefy.toast.open({
      duration: 5000,
      message: (val) ? `You are welcome back, ${this.userInfo?.firstName}` : `Good bye! see you soon.`,
      position: 'is-top',
      type: (val) ?'is-success': 'is-info'
    })
  }
}
</script>

<style scoped>

</style>