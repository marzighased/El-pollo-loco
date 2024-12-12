class World {

   character = new Character();
   enemies = [
      new Chicken(),
      new Chicken(),
      new Chicken(),
   ];

   ctx;

   constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.draw();
   }



   draw() {
       this.ctx.drawImage(image, dx, dy);
}   
}