class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;
    energy = 5;
    isSquashed = false;


    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'  
    ];
   
    constructor() {
        super().loadImage('./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        
        this.offset = {
            x: 0,    
            y: 0,    
            width: 0, 
            height: 0 
        };

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

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

  animate() {

      setInterval(() => {
          this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
      }, 200);
    }

}  