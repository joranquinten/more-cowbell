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
  <div class="gradient">
    <div class="flex h-screen">
      <div class="app max-w-6xl m-auto rounded-2xl bg-gray-800 p-8 shadow-xl">
        <h1 class="text-3xl font-bold leading-7 my-8">
          Gotta have more cowbell! 🐮🔔
        </h1>
        <grid-controls class="mx-8" :num-cols="numCols" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  content: "";
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: -1;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.app {
  min-width: 860px;
  transform: perspective(340px) rotateX(6deg);
}

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
