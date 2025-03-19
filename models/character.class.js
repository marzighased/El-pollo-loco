class Character extends MovableObject {
    height = 280;
    y = 80;
    speed = 10;
    bottles = 0;
    coins = 0;


    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png' 
    ];

    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',  
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ]; 

    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',        
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_LONGIDLE = [
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    world;
    keyboard;
    lastIdleStart;
    deathAnimationPlayed = false;
    isJumping = false;
    isMoving = false;
    isThrowingBottle = false;
    lastBottleThrow = 0;
    
    /**
     * Creates a character instance and loads all required assets
     * @constructor
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);

        this.y_ground = 140;
        this.lastIdleStart = new Date().getTime();

        this.offset = {
            x: 20,
            y: 95,
            width: 40,
            height: 110
        };
        
        this.applyGravity();
    }

    moveRight() {
        this.x += this.speed;
        this.isMoving = true;
    }

    moveLeft() {
        this.x -= this.speed;
        this.isMoving = true;
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 25; 
            window.audioManager.play('jumping');
            this.isJumping = true;
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Handles damage taken by the character
     * @param {number} damage - Amount of damage to apply
     */

    hit(damage) {
        if (!this.isHurt()) {
            this.energy -= damage;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = new Date().getTime();

            if (this.energy <= 0) {
                window.audioManager.play('characterDead');
            } else {
                window.audioManager.play('hurt');
            }
        }
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 145;  
        }
    }
    
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1; 
    }

    isDead() {
        return this.energy <= 0;
    }
    
    isThrowing() {
        let timepassed = new Date().getTime() - this.lastBottleThrow;
        timepassed = timepassed / 1000;
        return timepassed < 0.5; 
    }
    
    /**
     * Plays the death animation sequence
     */
    playDeathAnimation() {
        if (!this.deathAnimationPlayed) {
            this.deathAnimationPlayed = true;
            let currentFrame = 0;
            
            const deathInterval = setInterval(() => {
                if (currentFrame < this.IMAGES_DEAD.length) {
                    this.loadImage(this.IMAGES_DEAD[currentFrame]);
                    currentFrame++;
                } else {
                    clearInterval(deathInterval);
                    if (this.world) {
                         
                        this.world.level.enemies.forEach((enemy) => {
                           if (enemy instanceof Endboss && typeof enemy.stopSounds === 'function') {
                            enemy.stopSounds();
                           }
                        });
                        this.world.showLostScreen();
                    }
                }
            }, 200);
        }
    }

    startAnimations() {
        this.animateMovement();
        this.animateImages();
    }

    animateMovement() {
        setInterval(() => {
            if (!this.isDead()) { 
                this.isMoving = false; 
                
                if (this.world.keyboard.D && this.bottles > 0) {
                    this.lastBottleThrow = new Date().getTime(); 
                    this.lastIdleStart = new Date().getTime(); 
                }
                
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    this.lastIdleStart = new Date().getTime(); 
                }

                if (this.world.keyboard.RIGHT && this.x < 2200) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (!this.isAboveGround()) {
                        window.audioManager.play('walking');
                    }
                }
                
                if (this.world.keyboard.LEFT && this.x > -100) {
                    this.moveLeft();
                    this.otherDirection = true;
                    if (!this.isAboveGround()) {
                        window.audioManager.play('walking');
                    }
                }
     
                if (!this.isMoving && !this.isAboveGround() && !this.isJumping) {
                    window.audioManager.stop('walking');

                    if (this.lastActionWasMovingOrJumping) {
                        this.lastIdleStart = new Date().getTime();
                        this.lastActionWasMovingOrJumping = false;
                    }
                } else if (this.isMoving || this.isJumping) {
                    this.lastActionWasMovingOrJumping = true;
                }
                
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    animateImages() {
        let wasAboveGround = false;
        
        setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimation();
                return;
            } 
            
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }
            
            if (this.isAboveGround()) {
                wasAboveGround = true;
                this.isJumping = true;
                this.playAnimation(this.IMAGES_JUMPING);
                return;
            }
            
            if (wasAboveGround) {
                wasAboveGround = false;
                this.isJumping = false;
                this.lastIdleStart = new Date().getTime(); 
            }
            
            if (this.isMoving && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
                return;
            }
            
            if (this.isThrowing()) {
                this.playAnimation(this.IMAGES_IDLE); 
                return;
            }
            
            const currentTime = new Date().getTime();
            const idleTime = (currentTime - this.lastIdleStart) / 1000;
            
            if (idleTime > 4 && !this.isAboveGround() && !this.isMoving && !this.isThrowing()) {
                this.playAnimation(this.IMAGES_LONGIDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 150);
    }

    /**
     * Resets the character to initial state
     */
    reset() {
        this.energy = 100;
        this.coins = 0;
        this.bottles = 0;
        this.x = 120;
        this.y = 80;
        this.speed = 10;
        this.deathAnimationPlayed = false;
        this.isJumping = false;
        this.isMoving = false;
        this.lastIdleStart = new Date().getTime();
        this.lastActionWasMovingOrJumping = false;
        this.lastBottleThrow = 0;
    }
}