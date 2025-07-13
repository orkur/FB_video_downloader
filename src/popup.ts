// import {mergeAudioWithVideo} from "./mergeAudioWithVideo";

document.getElementById("download-full")?.addEventListener("click", (event)=>{
        console.log("add download logic to button")
        // mergeAudioWithVideo() TODO fix
})
document.getElementById("download-video")?.addEventListener("click", (event)=>{
        console.log("add download logic to video button")
        chrome.runtime.sendMessage({ action: "download_fb_video" });
})