function secondsToTime(seconds){
    let hours = Math.floor(seconds/3600);
    hours = hours < 10 ? "0"+hours : hours;
    let mins = Math.floor((seconds - hours*3600)/60);
    mins = mins < 10 ? "0"+mins : mins;
    let secs = seconds - hours*3600 - mins*60;
    secs = secs < 10 ? "0"+secs : secs;
    return(`${hours}:${mins}:${secs}`);
}

function getTotalDuration(durations){
    let totalSeconds = 0;
    durations.forEach((element) => {
        const times = element.split(":");
        for(let i = times.length - 1; i >= 0; i--){
            totalSeconds += Math.pow(60,times.length - i - 1)*times[i];
        }
    });
    return secondsToTime(totalSeconds);
}

function main(tabDocument) {
    const url = window.location.href;
    // Watch Site
    if(url.startsWith("https://www.youtube.com/watch")) {
        const elements = tabDocument.querySelectorAll('.ytd-playlist-panel-renderer #text.ytd-thumbnail-overlay-time-status-renderer');
        const durations = [...elements].map((element) => element.innerText);
        const totalDuration = getTotalDuration(durations);
        return([0,totalDuration])
    // Playlist Site
    } else if (url.startsWith("https://www.youtube.com/playlist")) {
        const elements = tabDocument.querySelectorAll('#text.ytd-thumbnail-overlay-time-status-renderer');
        const durations = [...elements].map((element) => element.innerText);
        const totalDuration = getTotalDuration(durations);
        return([0,totalDuration])
    // Other Site
    } else {
        return([1,"This is not a watch nor a playlist site"]);
    }
}