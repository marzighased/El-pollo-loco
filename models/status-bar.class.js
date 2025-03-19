/**
 * @file status-bar.class.js
 * @description Implementation of the health status bar in El Pollo Loco game
 */

/**
 * StatusBar class that extends DrawableObject
 * This class is used to display the character's health level in the game UI
 * @class StatusBar
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Array of image paths for different health levels
     * @type {Array<string>}
     */
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',  // 0
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'  // 5
    ];

    /**
     * Current health percentage value
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructor for StatusBar class
     * Initializes position, dimensions, and appearance
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);  
    }   

    /**
     * Updates the health bar visualization based on percentage
     * @method setPercentage
     * @param {number} percentage - Current health percentage (0-100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;  // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }   

    /**
     * Determines which image to display based on current health percentage
     * @method resolveImageIndex
     * @returns {number} Index of the image in the IMAGES array
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;                   // 5 images
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}