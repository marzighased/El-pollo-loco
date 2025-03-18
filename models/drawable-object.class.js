/**
 * Base class for all renderable objects in the game
 * @class DrawableObject
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 290;
    height = 150;
    width = 100;

    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    /**
     * Loads an image from the specified path
     * @param {string} path - Path to the image file 
     */
    loadImage(path) {
        this.img = new Image();  //this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas context
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) { 
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {

        if (false) {
             ctx.beginPath();
             ctx.lineWidth = '5';
             ctx.strokeStyle = 'blue';
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.stroke();
        }
    }


    drawOffsetFrame(ctx) {
        if (false) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.x, 
                this.y + this.offset.y, 
                this.width - this.offset.width, 
                this.height - this.offset.height
            );
            ctx.stroke();
        }
    } 

    /**
     * Loads multiple images and stores them in the imageCache
     * @param {Array<string>} arr - Array of image paths
     */
    loadImages(arr) {

        arr.forEach((path) => {
            
        
          let img = new Image();
          img.src = path;
          img.style = 'transform: scaleX(-1)';
          this.imageCache[path] = img;

        });
    }  
}