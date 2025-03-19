/**
 * @file coin.class.js
 * @description Implementation of collectable coin objects in El Pollo Loco game
 */

/**
 * Coin class that extends MovableObject
 * This class represents the collectible coins that appear in the game world
 * @class Coin
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /** Height of the coin in pixels @type {number} */
    height = 80;
    
    /** Width of the coin in pixels @type {number} */
    width = 80;
    
    /** Vertical position of the coin @type {number} */
    y = 290;  

    /**
     * Array of image paths for coin animation frames
     * @type {Array<string>}
     */
    IMAGES = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ];

    /**
     * Constructor for Coin class
     * Initializes position, appearance, and starts animation
     * @constructor
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 2000;  
        this.y = 50 + Math.random() * 150;
        this.animate();
    }

    /**
     * Sets up the coin animation
     * Plays through the coin images at a regular interval
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200); 
    } 
}