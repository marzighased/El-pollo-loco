class Chick extends MovableObject {

    y = 370;  
    height = 50;  
    width = 50; 
    
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
   
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

    hit() {
        this.energy = 0; 
        window.audioManager.play('chickenDie');       
        this.playAnimation(this.IMAGES_DEAD);
    }

    die() {
        clearInterval(this.moveLeftInterval);
        clearInterval(this.playAnimationInterval);
        this.loadImage(this.IMAGES_DEAD[0]); 
        window.audioManager.play('chickenDie');
        this.speed = 0;
    }    
}