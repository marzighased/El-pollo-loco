class ThrowableObject extends MovableObject {

    throw_sound = new Audio('audio/throw-bottle.mp3');

    constructor(x, y) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw_sound.volume = 0.2;
        this.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throw_sound.play();
        setInterval(() => {
           this.x += 10;
        }, 25);
    }
}   