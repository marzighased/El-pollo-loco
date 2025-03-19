/**
 * @file chicken.class.js
 * @description Implementation of standard chicken enemies in El Pollo Loco game
 */

/**
 * Chicken class that extends MovableObject
 * This class represents the standard chicken enemies that move along the ground
 * @class Chicken
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** Vertical position of the chicken @type {number} */
    y = 370;
    
    /** Height of the chicken in pixels @type {number} */
    height = 60;
    
    /** Width of the chicken in pixels @type {number} */
    width = 60;
    
    /**
     * Image paths for walking animation
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    
    /**
     * Image paths for dead state
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'  
    ];
   
    /**
     * Constructor for Chicken class
     * Initializes position, appearance, and starts animation
     * @constructor
     */
    constructor() {
        super().loadImage('./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
         
        this.offset = {  
            x: 5,
            y: 5,
            width: 10,
            height: 10
        };

        this.x = 600 + Math.random() * 1800;
        this.speed = 0.35 + Math.random() * 0.8;
        this.animate();
    } 

    /**
     * Sets up movement and animation for the chicken
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
     * Handles what happens when the chicken is hit
     */
    hit() {
        this.energy = 0;
        window.audioManager.play('chickenDie'); 
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles death of the chicken
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