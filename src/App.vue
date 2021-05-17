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
