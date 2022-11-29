<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from "vue";
const props = defineProps<{
  timeInMs: number;
  threshold?: number;
}>();

let interval = 0;
onMounted(() => {
  updateTimer();
});

onUnmounted(() => {
  clearInterval(interval);
});

const startingTime = props.timeInMs;
const percentage = computed(() =>
  Math.round((remainingTime.value / startingTime) * 100)
);

const color = computed(() => (remainingTime.value >= props.threshold || 0) ? "bg-fuchsia-600" : "bg-red-400");
const remainingTime = ref(props.timeInMs);

const updateTimer = (): void => {
  const intervalTiming = 200;
  interval = setInterval(() => {
    if (remainingTime.value <= 0) {
      clearInterval(interval);
    }
    remainingTime.value = remainingTime.value - intervalTiming;
  }, intervalTiming);
};
</script>
<template>
  <div class="relative align-right">
    <div
      class="bar rounded-full transition-all h-1 ease-out"
      :class="color"
      :style="{ width: `${percentage}%` }"
    />
  </div>
</template>
