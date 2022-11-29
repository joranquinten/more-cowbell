<script setup lang="ts">
import { usePlayerStore } from "../stores/player";
import { useMediaStore } from "../stores/media";

const playerStore = usePlayerStore();
const mediaStore = useMediaStore();

const resetPlayer = () => {
  playerStore.reset();
  playerStore.stop();
};

</script>
<template>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-l"
    @click="playerStore.start()"
    :disabled="playerStore.isStarted"
  >
    ▶️
  </button>
  <button
    type="button"
    class="player-button px-4 rounded-none"
    @click="playerStore.pause()"
    :disabled="!playerStore.isStarted"
  >
    ⏸
  </button>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-r"
    @click="playerStore.stop()"
    :disabled="!playerStore.isStarted"
  >
    ⏹
  </button>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-r"
    @click="resetPlayer"
    :disabled="playerStore.isStarted"
  >
    reset
  </button>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-r"
    @click="mediaStore.clearMedia()"
    :disabled="playerStore.isStarted"
  >
    clear
  </button>
</template>
