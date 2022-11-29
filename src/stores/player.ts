import { defineStore } from "pinia";

export const usePlayerStore = defineStore('player', {
    state: () => ({
        isStarted: false,
        bpm: 160,
        interval: 0,
        currentTick: 0,
    }),
    actions: {
        start(): void {
            const minute = 60 * 1000;
            this.isStarted = true;

            this.interval = setInterval(() => {
                this.currentTick++;
            }, (minute / this.bpm) / 2)
        },
        stop(): void {
            this.isStarted = false;
            this.setCurrentTick(0);
            clearInterval(this.interval);
        },
        pause(): void {
            this.isStarted = false;
            clearInterval(this.interval);
        },
        reset(): void {
            this.currentTick = 0;
        },
        setBpm(bpm: number): void {
            this.bpm = bpm;
            if (this.isStarted) {
                this.stop();
                this.start();
            }
        },
        setCurrentTick(tick: number): void {
            this.currentTick = tick;
        },
    },
})