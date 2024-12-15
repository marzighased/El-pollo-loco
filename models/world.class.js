class World {

   character = new Character();
   level = level1;
   canvas;
   ctx;
   keyboard;
   camera_x = 0;

   constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
   }


   setWorld() {
      this.character.world = this;
   }



   draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       this.ctx.translate(this.camera_x, 0);

       this.addObjectsToMap(this.level.backgroundObjects);
       this.addToMap(this.character);
       this.addObjectsToMap(this.level.enemies);
       this.addObjectsToMap(this.level.clouds);

       this.ctx.translate(-this.camera_x, 0);



        // Draw wird immer wieder aufgerufen
        requestAnimationFrame(() => {
          this.draw();
     });
   }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
  
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
           this.flipImageBack(mo); 
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}