/**
 * @file bottle-class.js
 * @description Implementation of collectable bottle objects in El Pollo Loco game
 */

/**
 * Bottle class that extends MovableObject
 * This class represents the salsa bottles that can be collected by the player
 * @class Bottle
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /** Height of the bottle in pixels @type {number} */
    height = 60;
    
    /** Width of the bottle in pixels @type {number} */
    width = 50;
    
    /**
     * Array of image paths for bottle animation frames
     * @type {Array<string>}
     */
    IMAGES_BOTTLE = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructor for Bottle class
     * Initializes position, appearance, and starts animation
     * @constructor
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        
        // Random position on the x-axis
        this.x = 200 + Math.random() * 2000;  
        this.y = 350;
        
        // Collision detection offset
        this.offset = {  
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        this.animate();
    }

    /**
     * Sets up the bottle animation
     * Plays through the bottle images at a regular interval
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 200);
    }
}