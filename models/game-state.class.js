class GameState {
    static START = 'START';
    static PLAYING = 'PLAYING';
    static PAUSE = 'PAUSE';
    static GAME_OVER = 'GAME_OVER';

    constructor() {
        this.currentState = GameState.START;
        this.init();
    }

    init() {
 
        if (this.currentState === GameState.START) {                   // Initial Game settings
            this.showStartScreen();
        }
    }

    showStartScreen() {
        this.startScreen = new StartScreen();                          // show start page
    }

    startGame() {
        this.currentState = GameState.PLAYING;                                       // start Game
        document.querySelector('.start-button').style.display = 'none';              // hide Elements
        document.querySelector('.controls-container').style.display = 'none';        //hide Elements

        initLevel();
        world = new World(canvas, keyboard);                                         // start Game (show main Game Page)
    }

    gameWon() {
        this.currentState = GameState.GAME_WON;
        
        document.querySelector('.controls-container').style.display = 'none';
        
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
    
        
        let youWonImage = new Image();
        youWonImage.src = 'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png';  // مسیر تصویر خودتون
        youWonImage.onload = () => {
            ctx.drawImage(youWonImage, 0, 0, canvas.width, canvas.height);
        }
    }

    pauseGame() {
        this.currentState = GameState.PAUSE;                           // Pause Game
    }

    gameOver() {
        this.currentState = GameState.GAME_OVER;                       // Game over
    }

    getCurrentState() {
        return this.currentState;
    }
}