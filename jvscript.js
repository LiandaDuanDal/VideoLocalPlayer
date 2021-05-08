// 获取视频窗口对象
var video = document.querySelector('.video');
// 获取进度条对象
var juice = document.querySelector('.orange-juice');
// 获取播放停止按钮对象
var btn = document.getElementById('play-pause');
// 获取nextstep 向右跳跃
var btn_nextstep = document.getElementById('nextstep');
// 获取previousstep 向左跳跃
var btn_previousstep = document.getElementById('previousstep')

var jump_gap = 10 
// 按下播放停止按钮时的按钮变化和视频pause play切换
function togglePlayPause() {
    if(video.paused) {
        btn.className = 'pause';
        video.play();
    } else {
        btn.className = 'play';
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
//拖动进度条
function move(){

}





// 对按钮添加onclck监听器
btn.onclick = function (params) {
    //video.fastSeek(570); // 9:30
    // video.currentTime = 570; //test
    togglePlayPause();
}
// 向前跳跃监听器
btn_nextstep.onclick = function (params){
    nextStep();
}

// 向后跳跃监听器
btn_previousstep.onclick = function (params){
    previousStep();
}

//刷新进度条监听器
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
