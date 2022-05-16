<template>
  <div ref="china_map" style="height: 600px"></div>
</template>

<script>
export default {
  name: "ChinaMap",
  mounted() {
    this.initEchart();
  },
  methods: {
    initEchart() {
      var chinaMap = this.$echart4.init(this.$refs.china_map);

      // 绑定随机数
      function randomData() {
        return Math.round(Math.random() * 500);
      }

      chinaMap.setOption({
        tooltip: {
          trigger: "item",
        }, //左侧小导航图标

        visualMap: {
          show: false,

          x: "left",

          y: "center", //改变地图区域颜色

          splitList: [
            { start: 500, end: 600 },

            { start: 400, end: 500 },

            { start: 300, end: 400 },

            { start: 200, end: 300 },

            { start: 100, end: 200 },

            { start: 0, end: 100 },
          ],

          color: [
            "#ffff00",

            "#0e94eb",

            "#70bcf0",

            "#f0f26c",

            "#00cd00",

            "#eff26f",
          ],
        }, //配置属性

        series: [
          {
            name: "数据",

            type: "map",

            mapType: "china",

            roam: false,

            label: {
              normal: {
                show: true, //省份名称
              },

              emphasis: {
                show: false,
              },
            },

            data: [
              { name: "北京", value: "100" },

              { name: "天津", value: randomData() },

              { name: "上海", value: randomData() },

              { name: "重庆", value: randomData() },

              { name: "河北", value: randomData() },

              { name: "河南", value: randomData() },

              { name: "云南", value: randomData() },

              { name: "辽宁", value: randomData() },

              { name: "黑龙江", value: randomData() },

              { name: "湖南", value: randomData() },

              { name: "安徽", value: randomData() },

              { name: "山东", value: randomData() },

              { name: "新疆", value: randomData() },

              { name: "江苏", value: randomData() },

              { name: "浙江", value: randomData() },

              { name: "江西", value: randomData() },

              { name: "湖北", value: randomData() },

              { name: "广西", value: randomData() },

              { name: "甘肃", value: randomData() },

              { name: "山西", value: randomData() },

              { name: "内蒙古", value: randomData() },

              { name: "陕西", value: randomData() },

              { name: "吉林", value: randomData() },

              { name: "福建", value: randomData() },

              { name: "贵州", value: randomData() },

              { name: "广东", value: randomData() },

              { name: "青海", value: randomData() },

              { name: "西藏", value: randomData() },

              { name: "四川", value: randomData() },

              { name: "宁夏", value: randomData() },

              { name: "海南", value: randomData() },

              { name: "台湾", value: randomData() },

              { name: "香港", value: randomData() },

              { name: "澳门", value: randomData() },
            ], //数据
          },
        ],
      });

      window.addEventListener("resize", () => {
        chinaMap.resize();
      });
    },
  },
};
</script>
