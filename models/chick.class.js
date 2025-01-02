class Chick extends MovableObject {
    y = 380;  
    height = 40;  
    width = 40;
    energy = 5;  
    isSquashed = false;

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
            x: 0,    
            y: 0,    
            width: 0, 
            height: 0 
        };

        this.x = 200 + Math.random() * 500; 
        this.speed = 0.15 * 0.7; 

        this.animate();
    }


    squash() {
    this.isSquashed = true;
    this.speed = 0;
    this.playAnimation(this.IMAGES_DEAD);
    
    setTimeout(() => {
        this.remove = true;
    }, 500);
   }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    animate() {
        setInterval(() => {
            if (!this.isSquashed) {  
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isSquashed) {  
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}