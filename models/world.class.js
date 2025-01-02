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
        this.spawnNewEnemies();
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
            this.checkEnemySquash();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkCollisionWithCoins();
            this.checkBottleHitsEndboss();
        }, 200);
    }

    spawnNewEnemies() {
        setInterval(() => {
            if (!this.character.isDead() && this.level.enemies.length < 10) {  
                if (Math.random() < 0.2) {  
                    let enemy;
                    if (Math.random() < 0.4) {
                        enemy = new Chicken();
                    } else {
                        enemy = new Chick();
                    }
                    
                    enemy.x = this.character.x + 1000 + Math.random() * 500; 
                    enemy.world = this;
                    this.level.enemies.push(enemy);
                }
            }
        }, 4000);  
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                if (enemy instanceof Chicken) {
                    this.character.energy -= 5;
                } else if (enemy instanceof Chick) {
                    this.character.energy -= 2;
                } else if (enemy instanceof Endboss) {
                    this.character.energy -= 10;
                }
                
                if (this.character.energy < 0) {
                    this.character.energy = 0;
                }
                
                this.character.lastHit = new Date().getTime();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkEnemySquash() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof Chick) && !enemy.isSquashed) {
                if (this.character.isAboveGround() && this.character.speedY <= 0) {  
                    let characterBottom = this.character.y + this.character.height;
                    let enemyTop = enemy.y;
                    let characterCenter = this.character.x + (this.character.width / 2);
                    let enemyLeft = enemy.x;
                    let enemyRight = enemy.x + enemy.width;
    
                    if (this.character.isColliding(enemy) && 
                        characterBottom >= enemyTop && 
                        characterBottom <= enemyTop + 60 &&   
                        characterCenter >= enemyLeft - 20 &&  
                        characterCenter <= enemyRight + 20) {
                        
                        let squashSound = new Audio('audio/squash.mp3');
                        squashSound.play();
                        
                        enemy.squash();
                        this.character.speedY = 15;
                    }
                }
            }
        });
        
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.remove);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.bottleBar.setBottles(this.character.bottles);
        }
    }

    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.character.coins++;
                this.coinBar.setCoins(this.character.coins);
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

    
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

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