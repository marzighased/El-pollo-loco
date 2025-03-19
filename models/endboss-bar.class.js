/**
 * @file endboss-bar.class.js
 * @description Implementation of the endboss health status bar in El Pollo Loco game
 */

/**
 * EndbossBar class that extends DrawableObject
 * This class is used to display the health status of the final boss in the game UI
 * @class EndbossBar
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {
    /**
     * Array of image paths for different boss health states
     * @type {Array<string>}
     */
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Current health percentage of the endboss
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructor for EndbossBar class
     * Initializes position, dimensions, and appearance
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 493;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the boss health bar visualization based on percentage
     * @param {number} percentage - Current health percentage (0-100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()]; 
        this.img = this.imageCache[imagePath]; 
    }   

    /**
     * Determines which image to display based on current health percentage
     * @returns {number} Index of the image in the IMAGES array
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
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