<template>
  <div class="challenge">
    <AppHeader/>
    <div class="container">
<!--    <img id="company-logo" alt="Vue logo" src="./assets/logo.png">-->
<!--    <Challenge msg="Welcome to the challengex 🐰"/>-->

      <section class="section main-wrapper">
    <router-view/>
      </section>
<!--      <section>
        <div class="block">
          <b-icon
              pack="fas"
              icon="user"
              size="is-large"
              type="is-success">
          </b-icon>
          <b-icon
              pack="fas"
              icon="home"
              size="is-large"
              type="is-info">
          </b-icon>
          <b-icon
              pack="fas"
              icon="tachometer-alt"
              size="is-large"
              type="is-primary">
          </b-icon>
        </div>

        <div class="buttons">
          <b-button
              label="Finish"
              type="is-dark"
              icon-pack="fas"
              icon-left="check"/>
          <b-button
              label="Finish"
              type="is-warning"
              icon-pack="fas"
              icon-left="check"/>
          <b-button type="is-warning">
            <b-icon
                pack="fas"
                icon="sync-alt"
                custom-class="fa-spin">
            </b-icon>
            <span>Refresh</span>
          </b-button>
        </div>
      </section>-->
    </div>
    <AppFooter/>
  </div>
</template>

<script lang="ts">
import Challenge from './components/Challenge.vue'
import {Component} from "vue-property-decorator";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {mixins} from "vue-class-component";
import DataMixins from "@/data-mixins";

@Component({components: {AppFooter, AppHeader, Challenge}})
export default class App  extends mixins(DataMixins)  {
  mounted(): void {
  }
}
</script>

<style>
#company-logo {
  width: 120px;
}
</style>
