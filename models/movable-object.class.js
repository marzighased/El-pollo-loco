/**
 * @file movable-object.class.js
 * @description Base implementation for all moving objects in El Pollo Loco game
 */

/**
 * Base class for all objects that can move in the game
 * This class provides core physics, collision detection, and animation functionality
 * @class MovableObject
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** Movement speed @type {number} */
    speed = 0.15;
    
    /** Flag indicating if object is facing left @type {boolean} */
    otherDirection = false;
    
    /** Vertical velocity component @type {number} */
    speedY = 0;
    
    /** Gravity acceleration value @type {number} */
    acceleration = 2.5;
    
    /** Health/energy level @type {number} */
    energy = 100;
    
    /** Timestamp of last hit taken @type {number} */
    lastHit = 0;

    /**
     * Applies gravity physics to the object
     * Makes objects fall when they are in the air
     * @method applyGravity
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if object is above the ground level
     * @method isAboveGround
     * @returns {boolean} True if object is in the air
     */
    isAboveGround() {  
        if (this instanceof ThrowableObject) {      // Throwable object should always fall
            return true;
        } else {
            return this.y < 150;    
        }
    } 

    /**
     * Checks if this object is colliding with another object
     * Uses offset-adjusted bounding boxes for more accurate collision detection
     * @method isColliding
     * @param {MovableObject} mo - The object to check collision with
     * @returns {boolean} True if collision detected
     */
    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
               this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
               this.x + this.offset.x < mo.x + mo.offset.x + mo.width - mo.offset.width &&
               this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
    }
    
    /**
     * Handles what happens when object is hit
     * Reduces energy and records hit timestamp
     * @method hit
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if object is currently in hurt state
     * @method isHurt
     * @returns {boolean} True if object was recently hit
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in ms
        timepassed = timepassed / 1000;  // Difference in s
        return timepassed < 1;
    }

    /**
     * Checks if object is dead (no energy left)
     * @method isDead
     * @returns {boolean} True if object has no energy
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation sequence from the provided images array
     * Cycles through images for animated sprites
     * @method playAnimation
     * @param {Array<string>} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;   // let i = 0 % 6;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right
     * @method moveRight
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left
     * @method moveLeft
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting vertical velocity
     * @method jump
     */
    jump() {
        this.speedY = 30;
    }
}