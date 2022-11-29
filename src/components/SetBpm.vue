<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/player";

const playerStore = usePlayerStore();

const newBpm = ref(playerStore.bpm);
</script>
<template>

<div class="my-4">
  <input type="number" class="player-input" v-model="newBpm" />
  <button
    type="button"
    class="player-button"
    @click="playerStore.setBpm(newBpm)"
  >
    Set BPM
  </button>
  </div>
</template>
