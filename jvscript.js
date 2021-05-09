(function(window, document){

// 获取视频窗口对象
var video = document.querySelector('.video');
// 获取进度条对象
var juice = document.querySelector(".orange-juice");
// orange-bar
var orange_bar = document.querySelector('.orange-bar');
// 获取播放停止按钮对象
var btn = document.getElementById('play-pause');
// 获取nextstep 向右跳跃
var btn_nextstep = document.getElementById('nextstep');
// 获取previousstep 向左跳跃
var btn_previousstep = document.getElementById('previousstep')
// get vide0 container
var videoContainer = document.getElementById("videoContainer");
// 
var fullScreenBtn = document.getElementById("fullScreenBtn");
// range input -- for vloumn--myRange_volum
var volumnRange = document.getElementById("myRange_volumn"); 
//space to show volumn -- show_volum_space
var space_show_volumn = document.getElementById("show_volum_space");
// jump interval-->control gap for forward and backword
var jump_gap = 10;
var fullScreenFlag = false; 
// new
// function getProgress(){
//     var percent = video.currentTime / video.duration;
//     playProgress.style.width = percent * (orange_bar.offsetWidth) - 2 + "px";
//     showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
// }
function get_volumn_value(){
    var vlaue_volumn =  volumnRange.value;
    console.log("volumn: ", vlaue_volumn);
    return vlaue_volumn;
}



// new


// console.log(orange_bar == null)

// 按下播放停止按钮时的按钮变化和视频pause play切换
function togglePlayPause() {
    if(video.paused) {
        btn.className = 'pause';
        progressFlag = setInterval(getProgress, 60);
        video.play();
    } else {
        btn.className = 'play';
        clearInterval(progressFlag);
        video.pause();
    }
}
//向右快进 (forwarding)
function nextStep(){
    // btn_nextstep.className = "forward"
    video.currentTime += jump_gap;
    btn_nextstep.className = "";
}
// 向左跳跃 (backfording)
function previousStep(){
    if (video.currentTime -jump_gap<= 0){
        video.currentTime = 0
    }
    else{
        video.currentTime -= jump_gap;
    }

}
//full screen
function fullScreen(){
    if(fullScreenFlag){
        videoContainer.webkitCancelFullScreen();
    }
    else{
        videoContainer.webkitRequestFullscreen();
    }
}
//拖动进度条****
// video的播放条
function getProgress(){
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";
    juice.innerHTML = (juicePos * 100).toFixed(1) + "%";
}
// 鼠标在播放条上点击时进行捕获并进行处理
function videoSeek(e){
    if(video.paused || video.ended){
        togglePlayPause();
        enhanceVideoSeek(e);
    }
    else{
        enhanceVideoSeek(e);
    }

}
function enhanceVideoSeek(e){
    clearInterval(progressFlag);
    var length = event.pageX - orange_bar.offsetLeft;
    var percent = length / orange_bar.offsetWidth;
    console.log(orange_bar.offsetLeft)
    console.log(orange_bar.offsetWidth)
    console.log(event.pageX)
    console.log(percent)
    // var length = video.duration;
    // var percent = video.currentTime / video.duration;
    juice.style.width = percent * (orange_bar.offsetWidth) - 2 + "px";
    video.currentTime = percent * video.duration;
    progressFlag = setInterval(getProgress, 60);
}
// ****



fullScreenBtn.onclick = function(){
    if(fullScreenFlag){
        videoContainer.webkitCancelFullScreen();
    }
    else{
        videoContainer.webkitRequestFullscreen();
    }
}



// 对按钮添加onclck监听器
btn.onclick = function (params) {
    //video.fastSeek(570); // 9:30
    // video.currentTime = 570; //test
    togglePlayPause();
}
// forwarding listener
btn_nextstep.onclick = function (params){
    nextStep();
}

// backwarding listener
btn_previousstep.onclick = function (params){
    previousStep();
}

//listener to refresh the Progress 
video.addEventListener('timeupdate', function() {
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";
    if(video.ended) {
        btn.className = "play";
      // At the end of the movie, reset the position to the start and pause the playback.
        video.currentTime = 0;
        togglePlayPause();
    }
});


//try orange-juice
// juice.addEventListener('change')
//click to start or pause
video.addEventListener('click', function() {
    console.log('stop star clicked!!!')
togglePlayPause()
});


orange_bar.addEventListener('mousedown',function(){
    console.log('progress bar clicked!!');
    videoSeek();
});

// set current vol: [0-1]
volumnRange.addEventListener('click',function(){
    var value_vol = get_volumn_value();
    space_show_volumn.innerHTML = "Vol: "+value_vol;
    video.volume = value_vol/100;
    // show get_volumn_value()
})
// open new file

// if (window.File && window.FileReader && window.FileList && window.Blob) {
//     document.getElementById('open').addEventListener('click',function() {
//         var path = document.getElementById('file').getPath;
//         console.log(path)

//     }, false);
// } else {
//     alert('The File APIs are not fully supported in this browser.');
// }


}(this, document))

