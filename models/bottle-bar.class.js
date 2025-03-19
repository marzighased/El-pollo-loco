/**
 * @file bottle-bar.class.js
 * @description Implementation of the bottle status bar in El Pollo Loco game
 */

/**
 * BottleBar class that extends DrawableObject
 * This class is used to display the number of collected bottles in the game UI
 * @class BottleBar
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {
    /**
     * Array of image paths for different bottle count states
     * @type {Array<string>}
     */
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Current number of bottles collected
     * @type {number}
     */
    bottles = 0;  

    /**
     * Constructor for BottleBar class
     * Initializes position, dimensions, and appearance
     * @constructor
     */
    constructor() {  
        super();
        this.loadImages(this.IMAGES);
        this.x = 490;
        this.y = 0;  
        this.width = 200;
        this.height = 60;
        this.setBottles(0);
    }

    /**
     * Updates the bottle bar visualization based on number of bottles
     * @param {number} bottles - Current bottle count
     */
    setBottles(bottles) {
        this.bottles = bottles;                                       // 0 ... 5 bottles
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image to display based on current bottle count
     * @returns {number} Index of the image in the IMAGES array
     */
    resolveImageIndex() {
        if (this.bottles >= 5) {
            return 5;
        } else if (this.bottles > 4) {
            return 4;
        } else if (this.bottles > 3) {
            return 3;
        } else if (this.bottles > 2) {
            return 2;
        } else if (this.bottles > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}