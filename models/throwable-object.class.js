/**
 * @file throwable-object.class.js
 * @description Implementation of throwable objects (bottles) in El Pollo Loco game
 */

/**
 * ThrowableObject class that extends MovableObject
 * This class represents the salsa bottles that can be thrown by the player character
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of image paths for bottle splash animation
     * @type {Array<string>}
     */
    IMAGES_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Flag indicating if the bottle has splashed
     * @type {boolean}
     */
    isSplashed = false;
    
    /**
     * Constructor for ThrowableObject class
     * Initializes position, dimensions, appearance, and throws the object
     * @constructor
     * @param {number} x - Initial x position of the throwable object
     * @param {number} y - Initial y position of the throwable object
     */
    constructor(x, y) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Initiates the throwing motion with physics
     * Applies gravity, horizontal movement, and plays sound effect
     * @method throw
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        window.audioManager.play('throwBottle');

        setInterval(() => {
            if (!this.isSplashed) {
               this.x += 10;
            }
        }, 25); 
    }

    /**
     * Handles bottle splash effect when it hits something or the ground
     * Plays animation and sound effect, then removes the object from the game
     * @method splash
     */
    splash() {
        this.isSplashed = true;
        window.audioManager.play('bottleSplash');
    
        let currentFrame = 0;
        let splashInterval = setInterval(() => {
            if (currentFrame < this.IMAGES_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_SPLASH[currentFrame]];
                currentFrame++;
            } else {
                clearInterval(splashInterval);
                
                if (this.world) {
                    const index = this.world.throwableObjects.indexOf(this);
                    if (index > -1) {
                        this.world.throwableObjects.splice(index, 1);
                    }
                }
            }
        }, 100);
    }
}