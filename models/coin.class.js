class Coin extends MovableObject {
    height = 80;
    width = 80;
    y = 290;  

    IMAGES = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 2000;  
        this.y = 50 + Math.random() * 150;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200); 
    } 
}  