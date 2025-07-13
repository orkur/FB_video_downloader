import {FFmpeg} from "@ffmpeg/ffmpeg";

async function fetchFile(url:string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
}
export async function mergeAudioWithVideo(){
    console.log(videoUrls);
    const video = videoUrls.length > 0 && stripStartEnd(videoUrls[0])
    const audio = audioUrls.length > 0 && stripStartEnd(audioUrls[0])
    if(!video || !audio)
        throw new Error(`Failed to fetch video or audio file`);
    const ffmpeg = new FFmpeg();
    const [fetchedVideo, fetchedAudio] = await Promise.all([
        fetchFile(video),
        fetchFile(audio),
    ])
    await ffmpeg.load()

    await ffmpeg.writeFile('video.mp4', fetchedVideo)
    await ffmpeg.writeFile('audio.mp3', fetchedAudio)
    await ffmpeg.exec([
        '-i', 'video.mp4',
        '-i', 'audio.mp3',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        'output.mp4'])
    const data = await ffmpeg.readFile("output.mp4");
    const outputBlob = new Blob([data])
    const url = URL.createObjectURL(outputBlob);
    await chrome.downloads.download({
        url: url
    })
}