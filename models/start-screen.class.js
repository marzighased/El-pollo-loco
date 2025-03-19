/**
 * @file start-screen.class.js
 * @description Implementation of the start screen for El Pollo Loco game
 */

/**
 * StartScreen class that extends DrawableObject
 * This class displays the initial game screen with title and start options
 * @class StartScreen
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {
    /** Width of the start screen in pixels @type {number} */
    width = 720;
    
    /** Height of the start screen in pixels @type {number} */
    height = 480;
    
    /**
     * Creates a new StartScreen instance and displays it
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img_pollo_locco/img/9_intro_outro_screens/start/startscreen_2.png');
        this.x = 0;
        this.y = 0;
        this.addToCanvas();
    }

    /**
     * Adds the start screen image to the canvas
     * This method is called once the image is loaded
     * @method addToCanvas
     */
    addToCanvas() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        this.img.onload = () => {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        };
    } 
}