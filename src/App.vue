<template>
  <div class="challenge">
    <AppHeader/>
    <div class="container">
      <section class="section main-wrapper">
    <router-view/>
      </section>
    </div>
    <AppFooter/>
  </div>
</template>

<script lang="ts">
import Challenge from './components/Challenge.vue'
import {Component, Vue} from "vue-property-decorator";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

@Component({components: {AppFooter, AppHeader, Challenge}})
export default class App  extends Vue  {
  mounted(): void {
  }

}
</script>

<style>
#company-logo {
  width: 120px;
}
</style>
