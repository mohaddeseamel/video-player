const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

//Play and Pause

function showPlayIcon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','pause')
    }else{
        video.pause(); 
        showPlayIcon()
    }
}

// On video End , show play button Icon
video.addEventListener('ended', showPlayIcon)

//Progress Bar

//calculate display time format
    function displayTime(time){
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${minutes}:${seconds}`;

    }
//update progress bar as video player
    function updateProgress(){
        progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
        currentTime.textContent = `${displayTime(video.currentTime)}/`;
        duration.textContent = `${displayTime(video.duration)}`;
    }

//click to seek within the video
function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}
    
//Volume controls
let lastVolume = 1;

//volume bar
function changeVolume(e){
   let voluem = e.offsetX / volumeRange.offsetWidth;
//Rounding volume up or down
    if(voluem < 0.1){
        voluem = 0;
    }
    if(voluem > 0.9){
        voluem = 1;
    }
    volumeBar.style.width = `${voluem * 100}%`;
    video.voluem = voluem;
    console.log(voluem);
    //change Icon depending on volume
    volumeIcon.className = '';
    if(voluem > 0.7){
        volumeIcon.classList.add('fas' , 'fa-volume-up');
    }else if(voluem < 0.7 && voluem > 0){
        volumeIcon.classList.add('fas','fa-volume-down');
    }else if (voluem  === 0){
        volumeIcon.classList.add('fas','fa-volume-off');
    }
    lastVolume = voluem;
}



//Mute and unMute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}
//Change Playback speed

function changeSpeed(){
    video.playbackRate = speed.value;
}
//FullScreen
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }
  let fullscreen = false;
  //toggle fullScreen
  function toggleFullscreen(){
      if(!fullscreen){
          openFullscreen(player)
      }else{
          closeFullscreen()
      }
      fullscreen = !fullscreen;
  }
//Event Listener

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('click', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen)