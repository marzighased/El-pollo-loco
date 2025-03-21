/**
 * @file endboss.class.js
 * @description Implementation of the final boss enemy in El Pollo Loco game
 */

/**
 * Endboss class that extends MovableObject
 * This class represents the final boss chicken enemy with special attack patterns and behaviors
 * @class Endboss
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** Height of the boss in pixels @type {number} */
    height = 400;
    
    /** Width of the boss in pixels @type {number} */
    width = 250;
    
    /** Vertical position of the boss @type {number} */
    y = 55;
    
    /** Initial energy/health value @type {number} */
    energy = 100;
    
    /** Movement speed @type {number} */
    speed = 5;
    
    /** Flag indicating if boss is dead @type {boolean} */
    isDead = false;
    
    /** Flag indicating if death animation has been played @type {boolean} */
    isDeadAnimationPlayed = false;

    /**
     * Image paths for walking animation
     * @type {Array<string>}
     */
    IMAGES_WALKING = [  
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Image paths for attack animation
     * @type {Array<string>}
     */
    IMAGES_ATTACKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png', 
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png' 
    ];

    /**
     * Image paths for hurt animation
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Image paths for death animation
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Constructor for Endboss class
     * Initializes position, dimensions, appearance, and behavior
     * @constructor
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2500;
        this.y = 55;
        this.height = 400;
        this.width = 250;
        this.speed = 25;
        this.energy = 100;

        this.offset = {
           x: 10,
           y: 70,
           width: 15,
           height: 90
        };

    }

    /** Flag indicating if boss is currently attacking @type {boolean} */
    isAttacking = false;

    /**
     * Initializes the boss behaviors and animations
     * @method initializeEndboss
     */
    initializeEndboss() {
        this.animate();
    }

    /**
     * Checks if the player character is within detection range
     * @method isCharacterNear
     * @returns {boolean} True if character is within the boss's detection range
     */
    isCharacterNear() {
        if (!this.world || !this.world.character) return false;
        return Math.abs(this.world.character.x - this.x) < 500;
    }

    /**
     * Starts the boss attack sequence
     * Triggers attack animation and sound effect
     * @method startAttacking
     */
    startAttacking() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            window.audioManager.play('endbossAttack');
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        }
    }

    /**
     * Handles damage taken by the boss
     * Manages energy reduction, death animation, and game completion
     * @method hit
     */
    hit() {
        if (this.isDead) return;
        
        this.energy -= 20;
        
        if (this.energy <= 0) {
            this.handleDeath();
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    
    /**
     * Handles the boss death sequence
     * Sets up death state and plays death sound
     * @method handleDeath
     */
    handleDeath() {
        this.energy = 0;
        this.isDead = true;
        window.audioManager.play('endbossDie');
        this.playDeathAnimation();
    }
    
    /**
     * Plays the boss death animation sequence
     * Cycles through death images and triggers game won screen when complete
     * @method playDeathAnimation
     */
    playDeathAnimation() {
        let currentImageIndex = 0;
        let deathInterval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(deathInterval);
                this.showGameWonScreen();
            }
        }, 200);
    }
    
    /**
     * Shows the game won screen after a delay
     * Indicates successful completion of the game
     * @method showGameWonScreen
     */
    showGameWonScreen() {
        if (this.world) {
            setTimeout(() => {
                this.world.showWonScreen();
            }, 1000);
        }
    }
     
    /**
     * Controls animation and movement behavior of the boss
     * Handles different states including hurt, attacking, and walking
     * @method animate
     */
    animate() {
        setInterval(() => {
            if (this.isDead) return;
            
            this.updateAnimationState();
            this.checkForCharacterProximity();
        }, 200);
    }

    /**
     * Updates animation based on current boss state
     */
    updateAnimationState() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACKING);
            this.moveTowardsCharacter();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Moves boss towards character when attacking
     */
    moveTowardsCharacter() {
        if (this.world && this.world.character) {
            if (this.world.character.x < this.x) {
                this.x -= this.speed;
                this.otherDirection = false;
            } else {
                this.x += this.speed;
                this.otherDirection = true;
            }
        }
    }

    /**
     * Checks if character is nearby and starts attacking if true
     */
    checkForCharacterProximity() {
        if (!this.isAttacking && this.isCharacterNear()) {
            this.startAttacking();
        }
    }

}