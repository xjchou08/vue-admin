<template>
  <div ref="bar" style="width: 400px; height: 400px"></div>
</template>

<script>
export default {
  name: "Bar",
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      var myChart = this.$echart.init(this.$refs.bar);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 柱状图",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>
