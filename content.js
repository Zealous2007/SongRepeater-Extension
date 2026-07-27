alert("SoundCloudRepeat Injected")
var TIMELEFT = prompt("SoundCloudRepeat TimeLeft")

var R1 = "sc-button-secondary sc-button-large sc-button-icon sc-mr-2x skipControl__previous"
var R2 = "skipControl sc-ir playControls__control playControls__prev sc-button"

var T1 = "playbackTimeline__timePassed"
var T2 = "sc-text-primary sc-text-h5"
var T3 = "playbackTimeline__duration"

var kill = []

function restart_bar(){
    var PrevButton = document.getElementsByClassName(R1+ " "+R2)[0]
    PrevButton.click()
    console.log("restart")
}

function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}



function timeTableToSeconds(timeTable){
    timeTable = timeTable.reverse()
    totalseconds = 0
    for(let i = 0; i < timeTable.length; i++){
        totalseconds += parseInt(timeTable[i]) * 60 ** i
    }
    return totalseconds
}

var Interval = setInterval(function(){
    var timeElement = document.getElementsByClassName(T1+" "+T2)[0]
    var timestr = timeElement.lastChild.textContent
    var currenttime = timeTableToSeconds(timestr.split(":"))

    var durElement = document.getElementsByClassName(T3+" "+T2)[0]
    var durstr = durElement.lastChild.textContent
    var duration = timeTableToSeconds(durstr.split(":"))

    if (duration - currenttime < TIMELEFT){
        restart_bar()
    }
    var Progress = Math.round(currenttime/duration * 10000)/100 + "%"
    console.log(Progress)
}, 500)

var EventFunction = function(event) {
    if (event.key.toLowerCase() === "x") {
        for(let i = 0; i < kill.length; i++){
            kill[i]()
        }
        alert("KILLED")
    }
}

//kill script

kill = [
    function(){
        clearInterval(Interval)
        Interval = null
    },
    function(){
        document.removeEventListener("keydown", EventFunction)
        EventFunction = null
    }
]

deleteAllCookies()
document.addEventListener("keydown", EventFunction);
