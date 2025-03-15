let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let intervalIds = [];

/**
 * Restarts the game by clearing all intervals, removing overlays, and resetting the world
 * @function restartGame
 */
window.restartGame = function() {
    clearAllIntervals();
    
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-won').classList.add('d-none');

    if (world) {
        window.audioManager.stopAll();
        world.stopGame();  
        world.reset();
        world = null;  
    }

    const canvas = document.getElementById('canvas'); 
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    document.getElementById('start-screen').classList.remove('d-none');
    document.querySelector('.controls-container').style.display = 'flex';
    document.getElementById('start-button').style.display = 'block'; 

    initLevel();
    showStartScreen();

    updateMuteIcon();
}

/**
 * Initializes the game by setting up canvas and binding event handlers
 * @function init
 */
function init() {
    canvas = document.getElementById('canvas');
    checkOrientation();
    showStartScreen();
    initMobileControls();
    
    const startButton = document.getElementById('start-button'); 
    if (startButton) {
        startButton.onclick = function() {
            hideAllOverlayScreens();
            initLevel();
            world = new World(canvas, keyboard);
            world.toggleSound(isMuted);
        };
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

function hideAllOverlayScreens() {
    const overlays = [
        'start-screen',
        'game-over',
        'game-won'
    ];
    
    overlays.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('d-none');
        }
    });
}

function restartGame() {
    clearAllIntervals();
    
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-won').classList.add('d-none');

    if (world) {
        window.audioManager.stopAll();  
        world.stopGame();  
        world.reset();
        world = null;  
    }
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    document.getElementById('start-screen').classList.remove('d-none');
    document.querySelector('.controls-container').style.display = 'flex';
    document.getElementById('start-button').style.display = 'block';

    initLevel();
    showStartScreen();

    updateMuteIcon();
}
/**
 * Clears all active intervals in the window
 * @function clearAllIntervals
 */
function clearAllIntervals() {
    const highestId = window.setInterval(() => {}, 0);
    for (let i = 0; i <= highestId; i++) {
        window.clearInterval(i);
    }
}
/**
 * Detects device orientation and shows hint if needed
 * @function checkOrientation
 */
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

/**
 * Sets up mobile touch controls for the game
 * @function initMobileControls
 */

function initMobileControls() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const mobileControls = document.getElementById('mobile-controls');
        if (mobileControls) {
            mobileControls.style.display = 'flex';
        }

        const buttonLeft = document.getElementById('button-left');
        const buttonRight = document.getElementById('button-right');
        const buttonJump = document.getElementById('button-jump');
        const buttonThrow = document.getElementById('button-throw');

        buttonLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        }, { passive: false });

        buttonLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        }, { passive: false });

        buttonRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        }, { passive: false });

        buttonRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        }, { passive: false });

        buttonJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        }, { passive: false });

        buttonJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        }, { passive: false });

        buttonThrow.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D = true;
        }, { passive: false });

        buttonThrow.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        }, { passive: false });

        document.querySelectorAll('.control-button').forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
            }, { passive: false });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
            }, { passive: false });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileControls();
});


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

/**
 * Toggles the game sound on/off
 * @function toggleMute
 */
function toggleMute() {
    isMuted = !isMuted;
    updateMuteIcon();
    
    if (world) {
        world.toggleSound(isMuted);
    }
    window.audioManager.setMute(isMuted);
}


function updateMuteIcon() {
    let muteIcon = document.getElementById('mute');
    if (muteIcon) {
        muteIcon.src = isMuted ? 
            'img_pollo_locco/img/7_statusbars/3_icons/mute.png' : 
            'img_pollo_locco/img/7_statusbars/3_icons/unmute.png';
    }
}

function showImpressum() {
    document.getElementById('impressum').classList.remove('d-none');
}

function closeImpressum() {
    document.getElementById('impressum').classList.add('d-none');
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
/**
 * Creates a stoppable interval that can be tracked for cleanup
 * @function setStopableInterval
 * @param {Function} fn - Function to execute
 * @param {number} time - Interval time in milliseconds
 */

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}