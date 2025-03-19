/**
 * @file game-state.class.js
 * @description Manages the game state transitions and UI for El Pollo Loco game
 */

/**
 * GameState class that handles different states of the game
 * This class controls transitions between start screen, gameplay, pause, and end states
 * @class GameState
 */
class GameState {
    /** Constant representing the start state @type {string} */
    static START = 'START';
    
    /** Constant representing the playing state @type {string} */
    static PLAYING = 'PLAYING';
    
    /** Constant representing the pause state @type {string} */
    static PAUSE = 'PAUSE';
    
    /** Constant representing the game over state @type {string} */
    static GAME_OVER = 'GAME_OVER';

    /**
     * Creates a new GameState instance and initializes to start state
     * @constructor
     */
    constructor() {
        this.currentState = GameState.START;
        this.init();
    }

    /**
     * Initializes the game with appropriate settings based on current state
     * @method init
     */
    init() {  
        if (this.currentState === GameState.START) {                   // Initial Game settings
            this.showStartScreen();
        }
    }

    /**
     * Shows the start screen and initializes UI elements
     * @method showStartScreen
     */
    showStartScreen() {
        this.startScreen = new StartScreen();                          // show start page
    } 

    /**
     * Transitions the game to the playing state
     * Initializes game world and hides start UI elements
     * @method startGame
     */
    startGame() {
        this.currentState = GameState.PLAYING;                                       // start Game 
        document.querySelector('.start-button').style.display = 'none';              // hide Elements
        document.querySelector('.controls-container').style.display = 'none';        //hide Elements

        initLevel();
        world = new World(canvas, keyboard);                                         // start Game (show main Game Page)
    }

    /**
     * Transitions the game to the game won state
     * Shows the victory screen and hides gameplay elements
     * @method gameWon
     */
    gameWon() {
        this.currentState = GameState.GAME_WON;
        
        document.querySelector('.controls-container').style.display = 'none';
        
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
    
        
        let youWonImage = new Image();
        youWonImage.src = 'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png';  
        youWonImage.onload = () => {
            ctx.drawImage(youWonImage, 0, 0, canvas.width, canvas.height);
        }
    }

    /**
     * Pauses the game
     * @method pauseGame
     */
    pauseGame() {
        this.currentState = GameState.PAUSE;                           // Pause Game
    }

    /**
     * Transitions the game to the game over state
     * @method gameOver
     */
    gameOver() {
        this.currentState = GameState.GAME_OVER;                       // Game over
    }

    /**
     * Gets the current state of the game
     * @method getCurrentState
     * @returns {string} Current game state
     */
    getCurrentState() {
        return this.currentState;
    }
}