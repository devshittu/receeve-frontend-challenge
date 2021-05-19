<template>
  <div>
    <section class="columns">
      <div class="column is-half">
        <section class="hero  is-halfheight">
          <div class="hero-body">

          <p class="title has-text-info" style="line-height: 1.6em; font-size:3.8em">
            <span>Welcome to</span>
            <br>

            <span style="text-decoration: underline"> Receeve</span>
            <br>
            <span>Admin Panel</span>

          </p>
            <br>
<!--          <p class="subtitle">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>-->
      </div>
    </section>

      </div>
      <div class="column is-half">

        <section class="section">
          <h1 class="title is-1">Sign in</h1>
          <hr>
          <p class="subtitle is-6">You may use dummy credentials below to sign in <br>Email: <strong>karina@receeve.com</strong> and password: <strong>12345678</strong></p>
          <hr>
          <p v-if="hasError" class="has-text-danger-dark">{{errorMessage}}</p>

          <b-field label="Email">
            <b-input v-model="signInData.email" maxlength="30" type="is-info " size="is-large" ></b-input>
          </b-field>

          <b-field label="Password">
            <b-input v-model="signInData.password" type="password" maxlength="30" size="is-large" ></b-input>
          </b-field>


            <p class="control">
              <b-button label="Sign in" type="is-info " size="is-large" @click="doSignIn" outlined />
            </p>

        </section>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import users from "@/store/modules/users";
import {UserSignInSubmit} from "@/store/models";

@Component
export default class SignIn extends Vue {
  signInData: UserSignInSubmit = {email: 'karina@receeve.com', password: '12345678'}
  hasError: boolean = false
  errorMessage: string = ''


  doSignIn(){
    users.signIn(this.signInData).then(() => {
      this.$router.push('/dashboard')
    }).catch(e => {
      this.hasError = true
      this.errorMessage = e.message

    })
  }
}
</script>

<style scoped>

</style>