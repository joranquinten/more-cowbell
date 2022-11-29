import { defineStore } from "pinia";

export const useMediaStore = defineStore('media', {
    state: () => ({
        media: [],
        tracks: [],
    }),
    actions: {
        toggleCell(row: number, col: number): void {
            const findCellIndex = (row: number, col: number): number => 
                (this.media.findIndex((item: { row: number, col: number }): boolean => (item.row === row && item.col === col)));

            const cellIndex = findCellIndex(row, col);
            if (cellIndex > -1) {
                const current = this.media[cellIndex];
                this.media[cellIndex] = { ...current, isActive: !current.isActive }
            } else {
                this.media.push({ row, col, isActive: true });
            }
        },
        isActiveCell(row: number, col: number): boolean {
            return (this.media.findIndex((item: MediaCell) => (item.row === row && item.col === col && item.isActive))) > -1
        },
        getMediaRow(row: number): any {
            const findRowIndex = (row: number) => (this.tracks.findIndex(item => item.row === row));
            const rowIndex = findRowIndex(row);
            return rowIndex > -1 ? this.tracks[rowIndex] : undefined;
        },
        addMediaTrack(row: number, media: string, name: string): void {
            const findRowIndex = (row: number) => (this.tracks.findIndex(item => item.row === row));
            const rowIndex = findRowIndex(row);
            if (rowIndex > -1) {
                this.tracks[rowIndex] = { row, media, name };
            } else {
                this.tracks.push({ row, media, name })
            }
        },
        removeMediaRow(rowIndex: number): void {
            this.tracks.splice(rowIndex, 1);
        },
        clearMedia(): void {
            this.media = [];
        }
    },
})