<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useGridStore } from "../stores/grid";
import { usePlayerStore } from "../stores/player";
import { useMediaStore } from "../stores/media";


import RecordButton from "../components/RecordButton.vue";
import TestButton from "../components/TestButton.vue";

const gridStore = useGridStore();
const playerStore = usePlayerStore();
const mediaStore = useMediaStore();

const props = defineProps<{
  rows?: number;
  cols: number;
  activeColumnIndex: number;
}>();
</script>

<template>
  <div class="grid relative group">
    <div
      class="row flex justify-between"
      :key="rowIndex"
      v-for="(row, rowIndex) in gridStore.matrix"
    >
      <div class="w-48">
        <div v-if="mediaStore.getMediaRow(rowIndex)">
          {{ mediaStore.getMediaRow(rowIndex).name }}
          <test-button :row="rowIndex"></test-button>
        </div>
        <div v-else><record-button :row="rowIndex"></record-button></div>
      </div>
      <div
        class="col grow border-2  ml-2"
        :key="colIndex"
        v-for="(col, colIndex) in row"
        :class="{
          'current-col': activeColumnIndex === colIndex,
          'active-cell': mediaStore.isActiveCell(rowIndex, colIndex),
          'first-row': rowIndex === 0,
          'last-row': rowIndex === gridStore.matrix.length-1,
          'first-col': colIndex === 0,
          'last-col': colIndex === row.length - 1,
          'first-beat': colIndex % 4 === 0,
        }"
      >
        <button
          type="button"
          class="p-2 w-full h-full block"
          @click="mediaStore.toggleCell(rowIndex, colIndex)"
        ></button>
      </div>
    </div>
  </div>
</template>
