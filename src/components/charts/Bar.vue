<template>
  <canvas id="bar" />
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from 'vue-property-decorator'
import Chart from 'chart.js'

@Component
export default class Bar extends Vue {
  @Prop({ default: [] }) readonly labels!: Array<string>
  @Prop({ default: [] }) readonly colors!: Array<string>
  // @Prop({ default: [] }) readonly data!: Array<number>

  @PropSync('data', { default: []  }) syncedData!: Array<number>
  @Prop({ default: [] }) readonly barStrokeColors!: Array<string>
  @Prop({ default: [] }) readonly generalLabel!: string
  @Prop({ default: [] }) readonly barStrokeWidth!: number
  @Prop({
    default: () => {
      return Chart.defaults.bar
    }
  })
  readonly options: object | undefined


  mounted() {
    this.createChart({
      datasets: [
        {
          data: this.syncedData,
          backgroundColor: this.colors,
          label: this.generalLabel,
          borderColor: this.barStrokeColors,
          borderWidth: this.barStrokeWidth,
        }
      ],
      labels: this.labels
    })
  }

  createChart(chartData: object) {
    const canvas = document.getElementById('bar') as HTMLCanvasElement
    const options = {
      type: 'bar',
      data: chartData,
      options: this.options
    }
    new Chart(canvas, options)
  }
}
</script>