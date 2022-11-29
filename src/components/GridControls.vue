<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useGridStore } from "../stores/grid";
import { usePlayerStore } from "../stores/player";
import { useMediaStore } from "../stores/media";

import { useAudioPlay } from "../composables/audio";

const gridStore = useGridStore();
const playerStore = usePlayerStore();
const mediaStore = useMediaStore();

import Grid from "../components/Grid.vue";
import SetBpm from "../components/SetBpm.vue";
import UpdateRows from "../components/UpdateRows.vue";
import PlayerButtons from "../components/PlayerButtons.vue";

const props = defineProps<{
  numCols: number;
}>();

const currentActiveColumn = ref(0);
const numCols = ref(props.numCols);

const media = ref(mediaStore.media);

watchEffect(() => {
  if (playerStore.isStarted) {
    currentActiveColumn.value = playerStore.currentTick % numCols.value;

    const mediaRows = mediaStore.media.reduce(
      (
        arr: any[],
        item: { row?: number; col?: number; isActive?: boolean }
      ) => {
        if (item.col === currentActiveColumn.value && item.isActive) {
          arr.push(item.row);
        }
        return arr;
      },
      []
    );
    const mediaToPlay = mediaStore.tracks.filter((item: { row: number }) =>
      mediaRows.includes(item.row)
    );

    mediaToPlay.map((media: { media: string }) => {
      useAudioPlay(media.media);
    });
  }
});
</script>

<template>
<set-bpm />
 <div class="grid-controls w-full mx-auto align-center">

    <grid :cols="numCols" :active-column-index="currentActiveColumn" />

    <div class="row flex justify-between my-4">
      <div class="button-group w-48">
        <update-rows/>
      </div>
      <div class="button-group grow ml-2">
        <player-buttons v-model="currentActiveColumn" />
      </div>
    </div>
  </div>
</template>
