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
    gameIntervals = [];

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
        const interval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkCollisionWithCoins();
            this.checkBottleHitsEndboss();
        }, 200);
        this.gameIntervals.push(interval);
    }

    spawnNewEnemies() {
        const interval = setInterval(() => {
            if (!this.character.isDead() && this.level.enemies.length < 10) {
                if (Math.random() < 0.4) {
                    let enemy;
                    if (Math.random() < 0.5) {
                        enemy = new Chicken();
                    } else {
                        enemy = new Chick();
                    }
                    
                    const minDistance = 400;  
                    const maxDistance = 800;  
                    let spawnX = this.character.x + minDistance + Math.random() * (maxDistance - minDistance);
                    spawnX = Math.min(spawnX, this.level.level_end_x - 500);
                    
                    enemy.x = spawnX;
                    enemy.world = this;
                    this.level.enemies.push(enemy);
                }
            }
        }, 2000);
        this.gameIntervals.push(interval);
    }

    
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isDead()) {
                let characterBottom = this.character.y + this.character.height;
                let enemyTop = enemy.y;
    
                // برخورد از بالا با پرش - دشمن حذف میشه
                if (this.character.isAboveGround() && characterBottom >= enemyTop) {
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        const index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                            this.level.enemies.splice(index, 1);
                        }
                        return;
                    }
                } 
                // برخورد از پهلو - کاراکتر آسیب میبینه
                else {
                    if (!this.character.isHurt()) {
                        if (enemy instanceof Chicken) {
                            this.character.hit(10);
                            this.statusBar.setPercentage(this.character.energy);
                        } else if (enemy instanceof Chick) {
                            this.character.hit(5);
                            this.statusBar.setPercentage(this.character.energy);
                        } else if (enemy instanceof Endboss && enemy.isAttacking) {
                            this.character.hit(25);
                            this.statusBar.setPercentage(this.character.energy);
                        }
    
                        if (this.character.isDead()) {
                            this.character.playDeathAnimation();
                            setTimeout(() => {
                                this.stopGame();
                                document.getElementById('game-over').classList.remove('d-none');
                            }, 1000);
                        }
                    }
                }
            }
        });
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

        // Draw next frame
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
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

    showWonScreen() {
        this.stopGame();
        document.getElementById('game-won').classList.remove('d-none');
    }
    
    showLostScreen() {
        this.stopGame();
        document.getElementById('game-over').classList.remove('d-none');
    }
    

    showRestartButton() {
        let button = document.getElementById('restartButton');
        if (button) {
            button.style.display = 'block';
            button.style.position = 'absolute';
            button.style.top = '70%';
            button.style.left = '50%';
            button.style.transform = 'translate(-50%, -50%)';
            button.style.zIndex = '1000';
        }
    }

    stopGame() {
    
        this.gameIntervals.forEach(interval => clearInterval(interval));
        this.gameIntervals = [];
    }
}