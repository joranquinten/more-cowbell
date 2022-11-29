<script setup lang="ts">
import { useMediaStore } from "../stores/media";
import { useGridStore } from "../stores/grid";

const mediaStore = useMediaStore();
const gridStore = useGridStore();
</script>
<template>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-l"
    @click="
      mediaStore.removeMediaRow(gridStore.matrix.length - 1);
      gridStore.removeRow();
    "
  >
    -
  </button>
  <button
    type="button"
    class="player-button px-4 rounded-none rounded-r"
    @click="gridStore.addRow()"
  >
    +
  </button>
</template>
