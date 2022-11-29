<script setup lang="ts">
import { useMediaStore } from "../stores/media";

import { useAudioPlay } from "../composables/audio";

const mediaStore = useMediaStore();

const testSound = (rowIndex: number): void => {
  const media = mediaStore.getMediaRow(rowIndex);
  useAudioPlay(media.media);
};

const props = defineProps<{
  row: number;
}>();
</script>
<template>
  <button @click="testSound(row)">🔉</button>
</template>
