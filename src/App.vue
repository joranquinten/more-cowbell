<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import GridControls from "./components/GridControls.vue";

import { useGridStore } from "./stores/grid";
import { useMediaStore } from "./stores/media";
const gridStore = useGridStore();
const mediaStore = useMediaStore();

const INITIAL = {
  Boom: "/sounds/boom.wav",
  Clap: "/sounds/clap.wav",
  HiHat: "/sounds/HiHat.wav",
  Kick: "/sounds/Kick.wav",
  OpenHat: "/sounds/OpenHat.wav",
  Ride: "/sounds/Ride.wav",
  Snare: "/sounds/Snare.wav",
  Tink: "/sounds/Tink.wav",
  Tom: "/sounds/Tom.wav",
};

const numCols = 16;

gridStore.setGrid(Object.keys(INITIAL).length, numCols);
Object.keys(INITIAL).forEach((key, index) => {
  mediaStore.addMediaTrack(index, INITIAL[key], key);
});
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold leading-7 m-8">Gotta have more cowbell! 🐮🔔</h1>
    <grid-controls class="mx-8" :num-cols="numCols" />
  </div>
</template>

<style scoped>
.logo {
  will-change: filter; /* 👀 */
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
