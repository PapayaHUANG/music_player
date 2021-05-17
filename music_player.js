const previous = document.getElementById("previous");
const play = document.getElementById("play");
const next = document.getElementById("next");
const music =document.getElementById("music");
const img = document.getElementById("img");
const title =document.getElementById("title");
const controlPad = document.querySelector(".control-pad");
const display = document.querySelector(".display");
const progress = document.getElementById("progress");



const musicList = ["漩涡", "苦瓜", "罗生门","少女的祈祷","天下无双"];
let musicIndex = 0;

loadMusic(musicList[musicIndex]);

//load music
function loadMusic() {
    music.setAttribute('src', `/musics/${musicList[musicIndex]}.mp3`);
    img.setAttribute('src', `/snapshots/${musicList[musicIndex]}.jpeg`);
    title.innerText = `${musicList[musicIndex]}`;
}



//play music

function musicPlay() {
    controlPad.classList.add('play');
    img.style.animationPlayState = 'running';
    display.style.transform = 'translateY(-85%)';
    progress.style.transform = 'translateX(100%)';
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    music.play();
    
}

//pause music

function musicPause() {
    controlPad.classList.remove('play');
    img.style.animationPlayState = 'paused';
    display.style.transform = 'translateY(0)';
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    
    music.pause();
}

//previous music

function previousMusic() {
    musicIndex --;
    
    if (musicIndex < 0) {
        musicIndex = musicList.length - 1;
    }
    
    loadMusic(musicList[musicIndex]);
    
    musicPlay();
    
}

//next music

function nextMusic() {
    musicIndex ++;

    if (musicIndex > musicList.length -1){
        musicIndex = 0;
    }

    loadMusic(musicList[musicIndex]);
    musicPlay();
}

//update progress


function updateProgress (e) {
    let { currentTime, duration } = e.target;
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}



//add event listener

play.addEventListener('click', () => {
    const isPlaying = controlPad.classList.contains('play');

    if (isPlaying){
        musicPause();
    }else{
    musicPlay();
    }
    
});

previous.addEventListener('click', previousMusic);
next.addEventListener('click', nextMusic);

music.addEventListener('timeupdate', updateProgress);
