class BottleBar extends DrawableObject {
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 490;
        this.y = 0;  
        this.width = 200;
        this.height = 60;
        this.setBottles(0);
    }

    setBottles(bottles) {
        this.bottles = bottles;                                       // 0 ... 5 bottles
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottles >= 5) {
            return 5;
        } else if (this.bottles > 4) {
            return 4;
        } else if (this.bottles > 3) {
            return 3;
        } else if (this.bottles > 2) {
            return 2;
        } else if (this.bottles > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}