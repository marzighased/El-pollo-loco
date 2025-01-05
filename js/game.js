let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let intervalIds = [];

function init() {
    canvas = document.getElementById('canvas');
    checkOrientation();
    showStartScreen();

    if (world) {
        world.toggleSound(isMuted);
    }
}

function showStartScreen() {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button'); 
    
    if (startButton) {
        startScreen.style.display = 'flex'; 
        document.querySelector('.controls-container').style.display = 'flex';
        startButton.style.display = 'block';
        
        startButton.onclick = function() {
            startScreen.style.display = 'none';
            document.querySelector('.controls-container').style.display = 'none';
            initLevel();
            world = new World(canvas, keyboard);
            world.toggleSound(isMuted);

        };
    }
}

function restartGame() {
    clearAllIntervals();
    
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-won').classList.add('d-none');

    if (world) {
        world.reset();
        world.character.reset();
    }
    document.getElementById('start-screen').classList.remove('d-none');

    initLevel();
    showStartScreen();
}


function clearAllIntervals() {
    const highestId = window.setInterval(() => {}, 0);
    for (let i = 0; i <= highestId; i++) {
        window.clearInterval(i);
    }
}

function checkOrientation() {
 
    const orientationHint = document.getElementById('orientation-hint');
    const startButton = document.querySelector('.start-button');
    
    if (orientationHint && startButton) {
        if (window.innerHeight > window.innerWidth) {
            orientationHint.style.display = 'flex';
            startButton.disabled = true;
        } else {
            orientationHint.style.display = 'none';
            startButton.disabled = false;
        }
    }
}




function showGameOver() {
    document.getElementById('game-over').classList.remove('d-none');
}


function showGameWon() {
    document.getElementById('game-won').classList.remove('d-none');
}


function stopAllSounds() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}


let isMuted = false;

function toggleMute() {
    isMuted = !isMuted;
    updateMuteIcon();
    
    if (world) {
        world.toggleSound(isMuted);
    }
}


function updateMuteIcon() {
    let muteIcon = document.getElementById('mute');
    if (muteIcon) {
        muteIcon.src = isMuted ? 
            'img_pollo_locco/img/7_statusbars/3_icons/mute.png' : 
            'img_pollo_locco/img/7_statusbars/3_icons/unmute.png';
    }
}


function fullscreen() {
    let fullscreenElement = document.getElementById('canvas');
    if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.webkitRequestFullscreen) {
        fullscreenElement.webkitRequestFullscreen();
    }
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});


window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);


function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}