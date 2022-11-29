<script setup lang="ts">
import { computed, ref } from "vue";
import { useMediaStore } from "../stores/media";

import { useRecordAudio } from "../composables/audio";

import TimeLine from "../components/TimeLine.vue";

const mediaStore = useMediaStore();

const props = defineProps<{
  row: number;
}>();

// Modal
const modalVisible = ref(false);
const toggleModal = (): void => {
  modalVisible.value = !modalVisible.value;
};

// Countdown
const countDown = ref(3000);
let countDownInterval = 0;
const countDownStarted = ref(false);
const countDownEnded = ref(false);
const recordingStarted = ref(false);
const recordingEnded = ref(false);
const countDownInSeconds = computed(() => countDown.value / 1000);

const countDownAndRecord = (): void => {
  const intervalTiming = 1000;

  countDownStarted.value = true;
  countDownInterval = setInterval(async () => {
    if (countDown.value <= intervalTiming) {
      clearInterval(countDownInterval);
      await recordAndSaveAudio(mediaName.value);
      countDownEnded.value = true;
    }

    if (!countDownEnded.value) {
      countDown.value = countDown.value - intervalTiming;
    }
  }, intervalTiming);
};

// Recorder
const mediaName = ref("");
const recordAndSaveAudio = async (name: string = mediaName.value) => {
  recordingStarted.value = true;
  countDownEnded.value = true;
  const media = await useRecordAudio();
  const row = props.row;


  mediaStore.addMediaTrack(row, media.audioUrl, name);
  recordingEnded.value = true;
  countDownStarted.value = false;
};
</script>
<template>
  <button type="button" data-modal-toggle="recordModal" @click="toggleModal">
    Record! 🎤
  </button>

  <!-- Main modal -->
  <div
    id="recordModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    :class="{ hidden: !modalVisible }"
  >
    <div class="relative p-4 w-full max-w-2xl h-full mx-auto md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            🎙 Record a new sound!
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="recordModal"
            @click="toggleModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            When you press the button, you have
            <span class="text-black text-bold">3</span> second countdown to
            record a new sound with a duration of
            <span class="text-black text-bold">1</span> second to be stored on
            this track.
          </p>

          <input
            type="text"
            class="player-input"
            v-if="!countDownStarted"
            v-model="mediaName"
            placeholder="Type a name here..."
          />
          <button
            v-if="!countDownStarted"
            class="player-button"
            @click="countDownAndRecord"
          >
            🎤 Ready!
          </button>

          <transition-group
            enter-active-class="duration-0 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-0"
            leave-active-class="duration-0 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div
              v-if="countDownStarted && !recordingStarted"
              class="text-6xl h-16 text-center"
            >
              {{ countDownInSeconds }}
            </div>
            <div
              v-if="countDownEnded && recordingStarted"
              class="text-6xl h-16 text-center"
            >
              <span class="inline-flex relative h-6 w-6 mr-6 mb-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-6 w-6 bg-red-500"
                ></span> </span
              >Recording&hellip;
            </div>
          </transition-group>

          <time-line
            v-if="countDownStarted"
            :time-in-ms="4000"
            :threshold="1000"
          />
          <!-- <button class="player-button" @click="recordAndSaveAudio">🎤 Ready!</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
