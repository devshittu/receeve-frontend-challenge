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
          <b-checkbox v-model="hasError" type="is-info">Show errors</b-checkbox>

          <b-field label="Username"
                   :type="{ 'is-danger': hasError }"
                   :message="{ 'Username is not available': hasError }">
            <b-input v-model="username" maxlength="30" type="is-info " size="is-large" ></b-input>
          </b-field>

          <b-field label="Password"
                   :type="{ 'is-danger': hasError }"
                   :message="[
                { 'Password is too short': hasError },
                { 'Password must have at least 8 characters': hasError }
            ]">
            <b-input v-model="password" type="password" maxlength="30" size="is-large" ></b-input>
          </b-field>


            <p class="control">
              <b-button label="Sign in" type="is-info " size="is-large"  outlined />
            </p>

        </section>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Login extends Vue {
  username: string = 'Denys Burdeniuk';
  password: string = '12345678';
  hasError: boolean = false


}
</script>

<style scoped>

</style>