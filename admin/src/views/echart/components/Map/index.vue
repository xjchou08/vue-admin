<template>
  <div class="map-container">
    <button :class="isChina" @click="changeMap" class="mapBtn">
      {{ message }}
    </button>
    <div class="map">
      <china-map v-if="isChina" />
      <world-map v-else />
    </div>
  </div>
</template>

<script>
import ChinaMap from "./ChinaMap.vue";
import WorldMap from "./WorldMap.vue";

export default {
  name: "MapChart",
  components: {
    ChinaMap,
    WorldMap,
  },
  data() {
    return {
      isChina: true,
      message: "中国地图",
    };
  },
  methods: {
    changeMap() {
      this.isChina = !this.isChina;
      //console.log(this.isChina);
      //console.log(this.message);
      if (!this.isChina) {
        this.message = "世界地图";
      } else {
        this.message = "中国地图";
      }
    },
  },
};
</script>

<style lang="scss">
.map-container {
  width: 100%;
  .mapBtn {
    color: #fff;
    background-color: #001e34;
    border-radius: 5px;
    margin: 20px 0px 0 20px;
    padding: 5px 10px;
  }
  button:hover {
    color: #001e34;
    background-color: #fff;
  }
}
</style>
