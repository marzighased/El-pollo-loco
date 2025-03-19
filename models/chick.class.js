/**
 * @file chick.class.js
 * @description Implementation of small chicken enemies in El Pollo Loco game
 */

/**
 * Chick class that extends MovableObject
 * This class represents the small chicken enemies that move along the ground
 * @class Chick
 * @extends MovableObject
 */
class Chick extends MovableObject {
    /** Vertical position of the chick @type {number} */
    y = 370;
    
    /** Height of the chick in pixels @type {number} */
    height = 50;
    
    /** Width of the chick in pixels @type {number} */
    width = 50; 
    
    /**
     * Image paths for walking animation
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    
    /**
     * Image paths for dead state
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
   
    /**
     * Constructor for Chick class
     * Initializes position, appearance, and starts animation
     * @constructor
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.offset = {   
            x: 5,    
            y: 5,    
            width: 10, 
            height: 10
        };

        this.x = 300 + Math.random() * 1300; 
        this.speed = 0.40 * 0.9; 

        this.animate();
    }

    /**
     * Sets up movement and animation for the chick
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60); 
    
        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 400);
    }

    /**
     * Handles what happens when the chick is hit
     */
    hit() {
        this.energy = 0; 
        window.audioManager.play('chickenDie');       
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles death of the chick
     * Stops movement and animations, plays death sound
     */
    die() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.playAnimationInterval);
        this.loadImage(this.IMAGES_DEAD[0]); 
        window.audioManager.play('chickenDie');
        this.speed = 0;
    }    
}