<template>
  <div>
    <h1 class="title" v-if="loading">Dashboard Loading...</h1>
    <section class="section" v-if="!loading">

      <section class="hero ">
        <div class="hero-body px-0">

          <p class="title">
            <span>Dashboard</span>
          </p>
          <p class="subtitle pt-5">
            <span>The following chart presents aggregates of the claims based on claim status [OPEN, PAID and DELETED]. <em>Click the switch button to swap between doughnut chart and bar chart.</em></span>
          </p>
        </div>
      </section>

      <b-field grouped group-multiline>

      <div class="control is-flex">
        <b-switch v-model="showBarChart" type="is-info">Switch to {{ (showBarChart) ? `Doughnut` : `Bar`}} chart</b-switch>
      </div>

      <div class="control is-flex">
        <b-switch v-model="useFeesAsChartBaseMetric" type="is-info" disabled>Switch to view charts for
          {{ (useFeesAsChartBaseMetric) ? `base amount` : `fees` }} chart</b-switch>
      </div>


      </b-field>

      <template v-if="showBarChart">
      <Bar
          id="barChartId"
          :data="[this.deletedClaimsTotal, this.openClaimsTotal, this.paidClaimsTotal]"
          :labels="barData.labels"
          :colors="barChartDataSet.backgroundColor"
          :general-label="barChartDataSet.label"
          :bar-stroke-colors="barChartDataSet.borderColor"
          :bar-stroke-width="1"
          :options="barDataOptions"
      />
      </template>
      <template v-else>

      <br>
          <Doughnut
              id="doughnutChartId"
              :data="[this.deletedClaimsTotal, this.openClaimsTotal, this.paidClaimsTotal]"
              :labels="barData.labels"
              :colors="barChartDataSet.borderColor"
          />
      </template>
    </section>

  </div>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Doughnut from "@/components/charts/Doughnut.vue";
import Bar from "@/components/charts/Bar.vue";
import {mixins} from "vue-class-component";
import DataMixins from "@/data-mixins";
import {ClaimDataModel} from "@/store/models";

@Component({
  components: {Bar, Doughnut}
})
export default class Dashboard extends mixins(DataMixins) {

  loading = true
  showBarChart = true
  useFeesAsChartBaseMetric = true
  barChartDataSet = {
    label: 'This charts visualizes aggregate of the entire deleted, open, and paid claims in the system regardless of the debtor',
    data: [12, 19, 5],

    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(75, 192, 192, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
    ],
    borderWidth: 1
  }

  barData = {
    labels: ['Deleted', 'Open', 'Paid',],
  };
  barDataOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          // Include a dollar sign in the ticks
          callback: function(value: number) {
            return new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'EUR' }).format(value)
          }
        }
      }]
    }
  }

  aggPaidClaims = 0;
  aggOpenClaims = 0;
  aggDeletedClaims = 0;

  set paidClaimsTotal(total: number) {
    this.aggPaidClaims = total / 100
  }

  set openClaimsTotal(total: number) {
    this.aggOpenClaims = total / 100
  }

  set deletedClaimsTotal(total: number) {
    this.aggDeletedClaims = total / 100
  }

  get paidClaimsTotal(): number {
    return this.aggPaidClaims
  }

  get openClaimsTotal(): number {
    return this.aggOpenClaims
  }

  get deletedClaimsTotal(): number {
    return this.aggDeletedClaims
  }

  get paidClaims() {
    return this.filterClaimsByStatus('PAID')
  }

  get openClaims() {
    return this.filterClaimsByStatus('OPEN')
  }

  get deletedClaims() {
    return this.filterClaimsByStatus('DELETED')
  }

  filterClaimsByStatus(status: string): ClaimDataModel[] {
    let newClaimsByStatus: ClaimDataModel[] = []
    this.getAllClaims.find((x: ClaimDataModel) => {
      if (x.status === status) newClaimsByStatus.push(x)
    })
    return newClaimsByStatus;
  }

  getAggregateOnClaims(claims: ClaimDataModel[], key: string = 'fees'): number {
    let aggr: number = 0;
    aggr = claims.reduce((a, b) => {
      // @ts-ignore
      return (a + (b[key] || 0))
    }, 0);
    return aggr
  }

  mounted(): void {
    setTimeout(() => {
      // To be delayed enjoy the feel of loading from the server asynchronously
      let theKey2Use = 'baseAmount';
      this.openClaimsTotal = this.getAggregateOnClaims(this.openClaims, theKey2Use)
      this.paidClaimsTotal = this.getAggregateOnClaims(this.paidClaims, theKey2Use)
      this.deletedClaimsTotal = this.getAggregateOnClaims(this.deletedClaims, theKey2Use)
      this.loading = false
    }, 1000);
  }
}
</script>
