/**
 * Base class for all objects that can move in the game
 * @class MovableObject
 * @extends DrawableObject
 */

class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity physics to the object
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {  
        if (this instanceof ThrowableObject) {      // Throwable object should always fall
            return true;
        } else {
            return this.y < 150;    
 
        }
    } 

    /**
     * Checks if this object is colliding with another object
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
    

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in ms
        timepassed = timepassed / 1000;  // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays an animation sequence from the provided images array
     * @param {Array<string>} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;   // let i = 0 % 6;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}
