class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    speed = 5;
    isDead = false;  
    isDeadAnimationPlayed = false;

    constructor() {
        super().loadImage('img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2500;
        this.offset = {
            x: 10,
            y: 70,
            width: 15,
            height: 90
        };
    }

    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    isAttacking = false;

    initializeEndboss() {
        this.animate();
    }

    isCharacterNear() {
        if (!this.world || !this.world.character) return false;
        return Math.abs(this.world.character.x - this.x) < 500;
    }

    startAttacking() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        }
    }


    hit() {
        if (this.isDead) return;
        
        this.energy -= 20;
        console.log('Endboss hit! Energy:', this.energy);
        
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead = true;
            console.log('Endboss died!');
            
            let currentImageIndex = 0;
            let deathInterval = setInterval(() => {
                if (currentImageIndex < this.IMAGES_DEAD.length) {
                    this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                    currentImageIndex++;
                } else {
                    clearInterval(deathInterval);
                    
                    if (this.world) {
                        this.world.showYouWonScreen();
                    }
                }
            }, 200);
            
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    animate() {
        setInterval(() => {
            if (this.isDead) return;  
    
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACKING);
                if (this.world && this.world.character) {
                    if (this.world.character.x < this.x) {
                        this.x -= this.speed;
                        this.otherDirection = false;
                    } else {
                        this.x += this.speed;
                        this.otherDirection = true;
                    }
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
    
            if (!this.isAttacking && this.isCharacterNear()) {
                this.startAttacking();
            }
        }, 200);
    }
    
    
}