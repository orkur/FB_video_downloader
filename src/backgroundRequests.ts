import OnUpdatedInfo = chrome.tabs.OnUpdatedInfo;


const videoUrls : string[] = [];
const audioUrls : string[] = [];
let lastStatus : "loading" | "complete" | "unloaded" | undefined = undefined;

const stripStartEnd =  (url: string): string => url.replace(/&bytestart=\d+/, "").replace(/&byteend=\d+/, "");

chrome.webRequest.onBeforeRequest.addListener(
    (details: chrome.webRequest.OnBeforeRequestDetails) => {
        const url = details.url;
        if(/^https:\/\/scontent\..*\/m\d\d\d\/.*/.test(url)){
            console.log("[FB Downloader] Caught video request:", details);
            videoUrls.push(stripStartEnd(url));
        }
        if(/^https:\/\/scontent\..*\/m\d\d\/.*/.test(url)){
            console.log("[FB Downloader] Caught audio request:", details);
            audioUrls.push(stripStartEnd(url));
        }
        return undefined
    },
    { urls: ["*://*.fbcdn.net/*"] }
)
chrome.tabs.onUpdated.addListener((_, changeInfo: OnUpdatedInfo) => {
    console.log(changeInfo.status);
    if(lastStatus !== "loading" && changeInfo.status === "loading"){
        videoUrls.length = 0
        audioUrls.length = 0
    }
    lastStatus = changeInfo.status
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("download");
    console.log(videoUrls);
    console.log(audioUrls);
    if(message.action === "download_fb_video"){
        const video = videoUrls.length > 0 && stripStartEnd(videoUrls[0])
        console.log(video)
        video && chrome.downloads.download({
            url: video,
            filename: "video.mp4",
        });
    }
})




