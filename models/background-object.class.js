/**
 * @file background-object.class.js
 * @description Implementation of background objects in El Pollo Loco game
 */

/**
 * Background objects class that extends MovableObject
 * This class is used to display background images in the game
 * @class BackgroundObject
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** Width of the background image in pixels @type {number} */
    width = 720;
    
    /** Height of the background image in pixels @type {number} */
    height = 480;
    
    /**
     * Constructor for BackgroundObject class
     * @constructor
     * @param {string} imagePath - Path to the background image file
     * @param {number} x - Horizontal position of the object in the canvas
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
 
    }  
}