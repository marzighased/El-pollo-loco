class Bottle extends MovableObject {
    height = 60;
    width = 50;
    

    IMAGES_BOTTLE = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        
        
        this.x = 200 + Math.random() * 2000;
        this.y = 350;
        
        
        this.offset = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        this.animate();
    }

    
    
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 200);
    }
}