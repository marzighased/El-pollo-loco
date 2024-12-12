class MovableObject {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 100;
    img;



    loadImage(path) {
        this.img = new Image();  //this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}