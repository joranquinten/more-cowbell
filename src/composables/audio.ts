export const useAudioPlay = (media: any): void => {
    const audio = new Audio(media);
    audio.playbackRate = 2;
    audio.preservesPitch = false;
    console.log(audio.playbackRate)
    console.log(audio.preservesPitch)
    audio.play();
}

export const useRecordAudio = async (length: number = 1000) => {
    const recordAudio = (): any =>
        new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks:any[] = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            const start = () => mediaRecorder.start();

            const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        resolve({ audioBlob, audioUrl });
                    });

                    mediaRecorder.stop();
                });

            resolve({ start, stop });
        });

    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    return (async () => {
        const recorder = await recordAudio();
        recorder.start();
        await sleep(length);
        const audio = await recorder.stop();
        return audio;
    })();
}
