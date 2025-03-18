/**
 * Represents objects that can be thrown by the player
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    isSplashed = false;
    /**
     * Creates a new throwable object
     * @constructor
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
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