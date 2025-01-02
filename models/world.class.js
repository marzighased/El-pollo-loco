class World {

   character = new Character();
   level;
   canvas;
   ctx;
   keyboard;
   camera_x = 0;
   statusBar = new StatusBar();
   bottleBar = new BottleBar();
   coinBar = new CoinBar();
   endbossBar = new EndbossBar();
   throwableObjects = [];

   constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.level = level1;
      this.setWorld();
      this.draw();
      this.run();

   }


   setWorld() {
    this.character.world = this;
    this.character.keyboard = this.keyboard;
    this.character.startAnimations();  
    this.level.enemies.forEach((enemy) => {
        enemy.world = this;
        if (enemy instanceof Endboss) {
            enemy.initializeEndboss();
        }
    });
}

   run() {
      setInterval(() => {
          this.checkCollisions();
          this.checkThrowObjects();
          this.checkBottleCollisions();  
          this.checkCollisionWithCoins();
          this.checkBottleHitsEndboss();  
        }, 200);
   }


   checkThrowObjects() {
       if (this.keyboard.D) {                          
           let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
           this.throwableObjects.push(bottle);
       }
   }


   checkCollisions() {

       this.level.enemies.forEach((enemy) => {
         if (this.character.isColliding(enemy)) {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
            }
        });
   }


   checkCollisionWithCoins() {
    this.level.coins.forEach((coin, index) => { 
        if (this.character.isColliding(coin)) {
            this.level.coins.splice(index, 1);        
            this.coinBar.setCoins(this.coins.coinBar);   
        }
    });
 }


   checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
            this.level.bottles.splice(index, 1);
            this.character.bottles++;
            this.bottleBar.setBottles(this.character.bottles);
        }
    });
   }


   checkBottleHitsEndboss() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (bottle.isColliding(enemy)) {
                    enemy.hit(); 
                    this.throwableObjects.splice(bottleIndex, 1);
                    this.endbossBar.setPercentage(enemy.energy); 
 
                }
            }
        });
    });
 }


 showYouWonScreen() {
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    
    let youWonImage = new Image();
    youWonImage.src = 'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png';
    youWonImage.onload = () => {
        this.ctx.drawImage(youWonImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }



   draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       this.ctx.translate(this.camera_x, 0);

       this.addObjectsToMap(this.level.backgroundObjects);

       this.ctx.translate(-this.camera_x, 0);  
       // ---- Space for fixed objects----//
       
       this.ctx.translate(this.camera_x, 0);  

       this.addToMap(this.character);
       this.addObjectsToMap(this.level.enemies);
       this.addObjectsToMap(this.level.clouds);
       this.addObjectsToMap(this.level.coins);
       this.addObjectsToMap(this.level.bottles);
       this.addObjectsToMap(this.throwableObjects);

       this.ctx.translate(-this.camera_x, 0);

       this.addToMap(this.statusBar);
       this.addToMap(this.bottleBar);
       this.addToMap(this.coinBar);
       this.addToMap(this.endbossBar);



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
        mo.drawOffsetFrame(this.ctx);


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