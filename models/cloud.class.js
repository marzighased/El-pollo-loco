/**
 * @file cloud.class.js
 * @description Implementation of cloud objects for El Pollo Loco game background
 */

/**
 * Cloud class that extends MovableObject
 * This class represents the moving clouds in the background
 * @class Cloud
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** Vertical position of clouds @type {number} */
    y = 20;
    
    /** Height of cloud image in pixels @type {number} */
    height = 250;
    
    /** Width of cloud image in pixels @type {number} */
    width = 500;

    /**
     * Constructor for Cloud class
     * Initializes position and starts animation
     * @constructor
     */
    constructor() {
        super().loadImage('./img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Sets up cloud movement animation
     * Makes clouds move from right to left continuously
     */
    animate() {
        this.moveLeft();
    }
}