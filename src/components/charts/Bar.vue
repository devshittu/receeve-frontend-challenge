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
/*
let jsobj: object = '{  "type":"bar",
  "data":{
    "labels":[
      "Red",
    ],
    "datasets":[
      {
        "label":"# of Votes",
        "data":[
          12
        ],
        "backgroundColor":[
          "rgba(255, 99, 132, 0.2)",
        ],
        "borderColor":[
          "rgba(255, 99, 132, 1)",
        ],
        "borderWidth":1
      }
    ]
  },
  "options":{
    "scales":{
      "yAxes":[
        {
          "ticks":{
            "beginAtZero":true
          }
        }
      ]
    }
  }
}';*/

  mounted() {
    const chartData: object = {
      labels: this.labels,
      datasets: [
        {
          label: this.generalLabel,
          data: this.syncedData,
          backgroundColor: this.colors,
          borderColor: this.barStrokeColors,
          borderWidth: this.barStrokeWidth,
        }
      ],
    };
    console.log(`This entered chart Data`, chartData)
    this.createChart(chartData);
  }

  createChart(chartData: object) {
    const canvas = document.getElementById('bar') as HTMLCanvasElement;
    const options = {
      type: 'bar',
      data: chartData,
      options: this.options
    }
    new Chart(canvas, options)
  }
}
</script>