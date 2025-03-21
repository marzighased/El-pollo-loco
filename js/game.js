/**
 * @file game.js
 * @description Main game controller script for El Pollo Loco game
 */

/**
 * Canvas element for rendering the game
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Main game world instance
 * @type {World}
 */
let world;

/**
 * Keyboard input handler instance
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Background music audio element
 * @type {HTMLAudioElement}
 */
let backgroundMusic;

/**
 * Array to store all interval IDs for proper cleanup
 * @type {Array<number>}
 */
let intervalIds = [];

/**
 * Restarts the game by clearing all intervals, hiding overlays, and resetting the world
 * @function restartGame
 */
window.restartGame = function() {
    clearAllIntervals();
    hideGameOverScreens();
    resetGameWorld();
    clearCanvas();
    showStartUI();
    initLevel();
    showStartScreen();
    updateMuteIcon();
}

/**
 * Hides game over and game won screens
 */
function hideGameOverScreens() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-won').classList.add('d-none');
}

/**
 * Resets the game world and stops all audio
 */
function resetGameWorld() {
    if (world) {
        window.audioManager.stopAll();
        world.stopGame();  
        world.reset();
        world = null;  
    }
}

/**
 * Clears the canvas display
 */
function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Shows the start UI elements
 */
function showStartUI() {
    document.getElementById('start-screen').classList.remove('d-none');
    document.querySelector('.controls-container').style.display = 'flex';
    document.getElementById('start-button').style.display = 'block';
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
    setupStartButton();
}

/**
 * Sets up the start button event handler
 */
function setupStartButton() {
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


/**
 * Shows the start screen and initializes the start button
 * @function showStartScreen
 */
function showStartScreen() {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button'); 
    
    if (startButton) {
        showStartElements(startScreen);
        setupStartButtonAction(startButton, startScreen);
    }
}

/**
 * Shows the start screen elements
 * @param {HTMLElement} startScreen - The start screen element
 */
function showStartElements(startScreen) {
    startScreen.style.display = 'flex'; 
    document.querySelector('.controls-container').style.display = 'flex';
    document.getElementById('start-button').style.display = 'block';
}

/**
 * Sets up the start button click action
 * @param {HTMLElement} startButton - The start button element
 * @param {HTMLElement} startScreen - The start screen element
 */
function setupStartButtonAction(startButton, startScreen) {
    startButton.onclick = function() {
        startScreen.style.display = 'none';
        document.querySelector('.controls-container').style.display = 'none';
        initLevel();
        world = new World(canvas, keyboard);
        world.toggleSound(isMuted);
    };
}

/**
 * Hides all overlay screens (start, game over, game won)
 * @function hideAllOverlayScreens
 */
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


/**
 * Restarts the game by clearing intervals, hiding overlays, and resetting the world
 * @function restartGame
 */
function restartGame() {
    clearAllIntervals();
    hideGameOverScreens();
    resetGameWorld();
    showStartScreen();
    updateMuteIcon();
}

/**
 * Hides game over and game won screens
 */
function hideGameOverScreens() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('game-won').classList.add('d-none');
}

/**
 * Resets the game world and clears the canvas
 */
function resetGameWorld() {
    if (world) {
        window.audioManager.stopAll();  
        world.stopGame();  
        world.reset();
        world = null;  
    }
    clearCanvas();
    showStartUI();
}

/**
 * Clears the canvas display
 */
function clearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Shows the start UI elements
 */
function showStartUI() {
    document.getElementById('start-screen').classList.remove('d-none');
    document.querySelector('.controls-container').style.display = 'flex';
    document.getElementById('start-button').style.display = 'block';
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
    if (!isTouchDevice()) {
        return;
    }
    
    showMobileControls();
    setupMobileButtons();
    preventDefaultTouchBehavior();
}

/**
 * Checks if the device supports touch events
 * @returns {boolean} True if the device supports touch
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Shows the mobile controls UI element
 */
function showMobileControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.style.display = 'flex';
    }
}

/**
 * Sets up event handlers for mobile control buttons
 */
function setupMobileButtons() {
    setupDirectionButtons();
    setupActionButtons();
}

/**
 * Sets up left and right direction buttons
 */
function setupDirectionButtons() {
    const buttonLeft = document.getElementById('button-left');
    const buttonRight = document.getElementById('button-right');

    buttonLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;}, { passive: false });

    buttonLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;}, { passive: false });

    buttonRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;}, { passive: false });

    buttonRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;}, { passive: false });
}

/**
 * Sets up jump and throw action buttons
 */
function setupActionButtons() {
    const buttonJump = document.getElementById('button-jump');
    const buttonThrow = document.getElementById('button-throw');

    buttonJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;}, { passive: false });

    buttonJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;}, { passive: false });

    buttonThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;}, { passive: false });

    buttonThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;}, { passive: false });
}

/**
 * Prevents default touch behavior for all control buttons
 */
function preventDefaultTouchBehavior() {
    document.querySelectorAll('.control-button').forEach(button => {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
        }, { passive: false });
    });
}


/**
 * Initializes mobile controls when DOM is loaded
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initMobileControls();
});

/**
 * Shows the game over screen
 * @function showGameOver
 */
function showGameOver() {
    document.getElementById('game-over').classList.remove('d-none');
}

/**
 * Shows the game won screen
 * @function showGameWon
 */
function showGameWon() {
    document.getElementById('game-won').classList.remove('d-none');
}

/**
 * Stops all sound effects and music
 * @function stopAllSounds
 */
function stopAllSounds() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

/**
 * Flag indicating if the game is muted
 * @type {boolean}
 */
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

/**
 * Updates the mute icon based on the current mute state
 * @function updateMuteIcon
 */
function updateMuteIcon() {
    let muteIcon = document.getElementById('mute');
    if (muteIcon) {
        muteIcon.src = isMuted ? 
            'img_pollo_locco/img/7_statusbars/3_icons/mute.png' : 
            'img_pollo_locco/img/7_statusbars/3_icons/unmute.png';
    }
}

/**
 * Shows the impressum (imprint) screen
 * @function showImpressum
 */
function showImpressum() {
    document.getElementById('impressum').classList.remove('d-none');
}

/**
 * Closes the impressum screen
 * @function closeImpressum
 */
function closeImpressum() {
    document.getElementById('impressum').classList.add('d-none');
}

/**
 * Toggles fullscreen mode for the canvas element
 * @function fullscreen
 */
function fullscreen() {
    let fullscreenElement = document.getElementById('canvas');
    if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.webkitRequestFullscreen) {
        fullscreenElement.webkitRequestFullscreen();
    }
}

/**
 * Handles keyboard key down events for game controls
 * @event keydown
 * @param {KeyboardEvent} e - The keyboard event
 */
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

/**
 * Handles keyboard key up events for game controls
 * @event keyup
 * @param {KeyboardEvent} e - The keyboard event
 */
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

/**
 * Handles window resize events to check orientation
 * @event resize
 */
window.addEventListener('resize', checkOrientation);

/**
 * Handles orientation change events on mobile devices
 * @event orientationchange
 */
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