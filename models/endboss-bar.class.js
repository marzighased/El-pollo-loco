class EndbossBar extends DrawableObject {
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 493;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }   

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}