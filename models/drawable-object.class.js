/**
 * @file drawable-object.class.js
 * @description Base implementation for all drawable objects in El Pollo Loco game
 */

/**
 * Base class for all renderable objects in the game
 * @class DrawableObject
 */
class DrawableObject {
    /** Image object for rendering @type {HTMLImageElement} */
    img;
    
    /** Cache for storing loaded images @type {Object.<string, HTMLImageElement>} */
    imageCache = {};
    
    /** Current frame index for animations @type {number} */
    currentImage = 0;
    
    /** Horizontal position @type {number} */
    x = 120;
    
    /** Vertical position @type {number} */
    y = 290;
    
    /** Height in pixels @type {number} */
    height = 150;
    
    /** Width in pixels @type {number} */
    width = 100;

    /**
     * Collision detection offset values
     * @type {Object}
     * @property {number} x - Horizontal offset from left
     * @property {number} y - Vertical offset from top
     * @property {number} width - Width reduction for collision box
     * @property {number} height - Height reduction for collision box
     */
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

    /**
     * Draws a debug frame around the object
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawFrame(ctx) {
        if (false) {
             ctx.beginPath();
             ctx.lineWidth = '5';
             ctx.strokeStyle = 'blue';
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.stroke();
        }
    }

    /**
     * Draws a debug frame showing collision detection area
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
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