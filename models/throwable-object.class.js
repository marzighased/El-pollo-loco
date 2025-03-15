/**
 * Represents objects that can be thrown by the player
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Creates a new throwable object
     * @constructor
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     */
    constructor(x, y) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Initiates the throwing motion with physics
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        window.audioManager.play('throwBottle');
        setInterval(() => {
           this.x += 10;
        }, 25); 
    }
}   