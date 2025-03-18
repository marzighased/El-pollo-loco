/**
 * Main game world that manages all game objects and logic
 * @class World
 */
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
    
    /**
     * Creates a new game world instance
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering 
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.setWorld();
        this.draw();
        this.run();
        this.spawnNewEnemies();
        window.audioManager.playLoop('background');  
        
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
    /**
     * Runs the main game loop including collision detection
     */

    run() {
        const interval = setInterval(() => {
            this.checkCollisions();
            this.checkBottleCollisions();
            this.checkCollisionWithCoins();
            this.checkBottleHitsEndboss();
        }, 200);
        this.gameIntervals.push(interval);

        const throwInterval = setInterval(() => {
            this.checkThrowObjects();
        }, 100);
        this.gameIntervals.push(throwInterval);
    }
    /**
     * Spawns new enemies periodically
     */
    spawnNewEnemies() {
        const interval = setInterval(() => {
            if (!this.character.isDead() && this.level.enemies.length < 15) {
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
        }, 1500);
        this.gameIntervals.push(interval);
    }

    checkCollisions() {
        const interval = setInterval(() => {
            if (!this.character) return; 
    
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.character.isDead()) {
                    let characterBottom = this.character.y + this.character.height;
                    let enemyTop = enemy.y;
                    let characterTop = this.character.y;
                    let characterCenter = this.character.x + this.character.width / 2;
                    let enemyCenter = enemy.x + enemy.width / 2;
                    
                    if (this.character.speedY < 0 &&
                        characterBottom >= enemyTop && 
                        characterBottom <= enemyTop + 50 &&
                        Math.abs(characterCenter - enemyCenter) < 50) { 
                        
                        if (enemy instanceof Chicken || enemy instanceof Chick) {
                            enemy.hit();
                            const index = this.level.enemies.indexOf(enemy);
                            if (index > -1) {
                                this.level.enemies.splice(index, 1);
                            }
                            
                            this.character.speedY = 15;
                            return;
                        }
                    } 
                    
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
                                
                                if (characterCenter < enemyCenter) {
                                    this.character.x -= 20;
                                } else {
                                    this.character.x += 20;
                                }
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
    
            if (this.character.x < -100) {
                this.character.x = -100;
            }
            if (this.character.x > 2200) {
                this.character.x = 2200;
            }
    
        }, 50);
        
        this.gameIntervals.push(interval);
    }

    

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.world = this;
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
                    if (bottle.isColliding(enemy) && !bottle.isSplashed) {
                        enemy.hit();
                        bottle.splash();
                        //this.throwableObjects.splice(bottleIndex, 1);
                        this.endbossBar.setPercentage(enemy.energy);
                    }
                } else if ((enemy instanceof Chicken || enemy instanceof Chick) && 
                       bottle.isColliding(enemy) && !bottle.isSplashed) {

                    enemy.hit();
                    bottle.splash();
                }
            });

            if (bottle.y >= 350 && !bottle.isSplashed) {
                bottle.splash();
            }
        });
    }
    /**
     * Renders all game objects to the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds); 
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    
        
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    
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

 
    toggleSound(muted) {
        window.audioManager.setMute(muted);
    }

    showWonScreen() {
        document.getElementById('game-won').style.display = 'flex';
        window.audioManager.stop('background');
        window.audioManager.play('gameWin');
        this.stopGame();
        showGameWon();
    }
    
    showLostScreen() {
        document.getElementById('game-over').style.display = 'flex';
        window.audioManager.stop('background');
        window.audioManager.play('gameOver');
        this.stopGame();
        showGameOver();
    }
    

    showRestartButton() {
        document.getElementById('restartButton').classList.remove('d-none');
    }

    stopGame() {
        window.audioManager.stopAll();
        this.gameIntervals.forEach(interval => clearInterval(interval));
        this.gameIntervals = [];

        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.isDead = true; 
                enemy.isAttacking = false; 
            }
        });
    }



    reset() {
        
        if (this.character) {
            this.character.reset();
        }
    
        
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.isDead = false;
                enemy.isAttacking = false;
                enemy.energy = 100;
            }
        });
    
        
        this.statusBar.setPercentage(100);
        this.bottleBar.setBottles(0);
        this.coinBar.setCoins(0);
        this.endbossBar.setPercentage(100);
    
        
        this.throwableObjects = [];
        
        
        this.camera_x = 0;
    
        window.audioManager.stopAll();
    }
}