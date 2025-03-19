/**
 * @file coin-bar.class.js
 * @description Implementation of the coin status bar in El Pollo Loco game
 */

/**
 * CoinBar class that extends DrawableObject
 * This class is used to display the number of collected coins in the game UI
 * @class CoinBar
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    /**
     * Array of image paths for different coin count states
     * @type {Array<string>}
     */
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Current number of coins collected
     * @type {number}
     */
    coins = 0;

    /**
     * Constructor for CoinBar class
     * Initializes position, dimensions, and appearance
     * @constructor
     */
    constructor() {  
        super();  
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = 0;  
        this.width = 200;
        this.height = 60;
        this.setCoins(0);  
    }  

    /**
     * Updates the coin bar visualization based on number of coins
     * @param {number} coins - Current coin count
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image to display based on current coin count
     * @returns {number} Index of the image in the IMAGES array
     */
    resolveImageIndex() {
        if (this.coins >= 5) {
            return 5;
        } else if (this.coins > 4) {
            return 4;
        } else if (this.coins > 3) {
            return 3;
        } else if (this.coins > 2) {
            return 2;
        } else if (this.coins > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}