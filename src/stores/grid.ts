import { defineStore } from "pinia";

export const useGridStore = defineStore('grid', {
    state: () => ({
        rows: 0,
        cols: 0,
    }),
    getters: {
        matrix(state) {
            const gridRows = Array.from(Array(state.rows));
            const gridCols = Array.from(Array(state.cols));
            return [...gridRows].map(() => [...gridCols])
        }
    },
    actions: {
        setGrid(rows: number, cols: number): void {
            this.rows = rows;
            this.cols = cols;
        },
        addRow(): void {
            this.rows++
        },
        removeRow(): void {
            if (this.rows > 0) {
                this.rows--;
            }
        }
    },
})