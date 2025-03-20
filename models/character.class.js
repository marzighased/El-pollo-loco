/**
 * @file character.class.js
 * @description Implementation of the playable character in El Pollo Loco game
 */

/**
 * Character class that extends MovableObject
 * This class represents the main playable character (Pepe) with all its animations and behaviors
 * @class Character
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** Height of the character in pixels @type {number} */
    height = 280;
    
    /** Initial vertical position @type {number} */
    y = 80;
    
    /** Movement speed @type {number} */
    speed = 10;
    
    /** Number of collected bottles @type {number} */
    bottles = 0;
    
    /** Number of collected coins @type {number} */
    coins = 0;

    /**
     * Image paths for walking animation
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png' 
    ];

    /**
     * Image paths for jumping animation
     * @type {Array<string>}
     */
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

    /**
     * Image paths for death animation
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Image paths for hurt animation
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',        
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Image paths for idle animation
     * @type {Array<string>}
     */
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

    /**
     * Image paths for long idle animation
     * @type {Array<string>}
     */
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

    /** Reference to the game world @type {World} */
    world;
    
    /** Reference to keyboard input handler @type {Keyboard} */
    keyboard;
    
    /** Timestamp when idle started @type {number} */
    lastIdleStart;
    
    /** Flag indicating if death animation has played @type {boolean} */
    deathAnimationPlayed = false;
    
    /** Flag indicating if character is jumping @type {boolean} */
    isJumping = false;
    
    /** Flag indicating if character is moving @type {boolean} */
    isMoving = false;
    
    /** Flag indicating if character is throwing a bottle @type {boolean} */
    isThrowingBottle = false;
    
    /** Timestamp of last bottle throw @type {number} */
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

    /**
     * Moves the character to the right
     */
    moveRight() {
        this.x += this.speed;
        this.isMoving = true;
    }

    /**
     * Moves the character to the left
     */
    moveLeft() {
        this.x -= this.speed;
        this.isMoving = true;
    }

    /**
     * Makes the character jump if on the ground
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 25; 
            window.audioManager.play('jumping');
            this.isJumping = true;
        }
    }

    /**
     * Applies gravity physics to the character
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

    /**
     * Checks if character is above ground level
     * @returns {boolean} True if character is in the air
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 145;  
        }
    }
    
    /**
     * Checks if character is currently in hurt state
     * @returns {boolean} True if character was recently hit
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1; 
    }

    /**
     * Checks if character is dead
     * @returns {boolean} True if character has no energy left
     */
    isDead() {
        return this.energy <= 0;
    }
    
    /**
     * Checks if character is currently throwing a bottle
     * @returns {boolean} True if character recently threw a bottle
     */
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

    /**
     * Starts all character animations
     */
    startAnimations() {
        this.animateMovement();
        this.animateImages();
    }

    /**
     * Controls character movement based on keyboard input
     * Main animation loop for character movement
     */
    animateMovement() {
        setInterval(() => {
            if (!this.isDead()) { 
                this.handleBottleThrow();
                this.handleJump();
                this.handleHorizontalMovement();
                this.handleIdleState();
                this.updateCameraPosition();
            }
        }, 1000 / 60);
    }

    /**
     * Handles bottle throwing action
     * Checks if bottle throw key is pressed and updates related timestamps
     */
    handleBottleThrow() {
        if (this.world.keyboard.D && this.bottles > 0) {
            this.lastBottleThrow = new Date().getTime(); 
            this.lastIdleStart = new Date().getTime(); 
        }
    }

    /**
     * Handles character jump action
     * Checks if jump key is pressed and the character is on the ground
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastIdleStart = new Date().getTime();
        }
    }

    /**
     * Handles horizontal (left/right) movement
     * Manages movement direction, sound effects, and animation states
     */
    handleHorizontalMovement() {
        this.isMoving = false;
        
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
    }

    /**
     * Handles character idle state
     * Manages sound effects and time tracking for idle animations
     */
    handleIdleState() {
        if (!this.isMoving && !this.isAboveGround() && !this.isJumping) {
            window.audioManager.stop('walking');

            if (this.lastActionWasMovingOrJumping) {
                this.lastIdleStart = new Date().getTime();
                this.lastActionWasMovingOrJumping = false;
            }
        } else if (this.isMoving || this.isJumping) {
            this.lastActionWasMovingOrJumping = true;
        }
    }

    /**
     * Updates the camera position based on character position
     * Centers the view on the character
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles character animation states
     */
    animateImages() {
        let wasAboveGround = false;
        
        setInterval(() => {
            if (this.isDead()) {
                this.playDeathAnimation();
                return;
            } 
            
            if (this.selectAnimationBasedOnState(wasAboveGround)) {
                return;
            }
            
            // Update landing status
            if (wasAboveGround && !this.isAboveGround()) {
                wasAboveGround = false;
                this.isJumping = false;
                this.lastIdleStart = new Date().getTime(); 
            }
            
            // Set wasAboveGround flag if character is in the air
            if (this.isAboveGround()) {
                wasAboveGround = true;
            }
            
            this.playIdleAnimations();
        }, 150);
    }

    /**
     * Selects and plays animation based on character's current state
     * @param {boolean} wasAboveGround - Whether character was above ground in previous frame
     * @returns {boolean} True if a specific animation was played, false if default idle should be used
     */
    selectAnimationBasedOnState(wasAboveGround) {
        // Check for hurt state
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return true;
        }
        
        // Check for jumping state
        if (this.isAboveGround()) {
            this.isJumping = true;
            this.playAnimation(this.IMAGES_JUMPING);
            return true;
        }
        
        // Check for walking state
        if (this.isMoving && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_WALKING);
            return true;
        }
        
        // Check for throwing state
        if (this.isThrowing()) {
            this.playAnimation(this.IMAGES_IDLE); 
            return true;
        }
        
        return false;
    }

    /**
     * Plays idle animations based on how long the character has been idle
     * Switches between regular idle and long idle animations
     */
    playIdleAnimations() {
        const currentTime = new Date().getTime();
        const idleTime = (currentTime - this.lastIdleStart) / 1000;
        
        if (idleTime > 4 && !this.isAboveGround() && !this.isMoving && !this.isThrowing()) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
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