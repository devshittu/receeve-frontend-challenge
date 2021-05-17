<template>
  <div>

    <nav class="navbar top-nav">
      <div class="container ">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://ericmkelley.com">
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
                <span style="color: white">Karina Joe</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav class="navbar shadow">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start bottom-nav ">
            <router-link to="/" class="navbar-item is-active" tag="a" href="#">
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
          <div class="navbar-end">
            <router-link to="/login" class="navbar-item" >
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
export default {
  name: "AppHeader"
}
</script>

<style scoped>

</style>