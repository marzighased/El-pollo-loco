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
    backgroundMusic = new Audio('audio/background-music.mp3');
    gameOverSound = new Audio('audio/lost.mp3');
    gameWinSound = new Audio('audio/won.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.setWorld();
        this.draw();
        this.run();
        this.spawnNewEnemies();

        this.backgroundMusic.volume = 0.1; 
        this.backgroundMusic.loop = true; 
        this.playBackgroundMusic();
        this.gameOverSound.volume = 0.5; 
        this.gameWinSound.volume = 0.5;
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
    
                
                if (this.character.isAboveGround() && characterBottom >= enemyTop) {
                    if (enemy instanceof Chicken || enemy instanceof Chick) {
                        enemy.hit();
                        const index = this.level.enemies.indexOf(enemy);
                        if (index > -1) {
                            this.level.enemies.splice(index, 1);
                        }
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
        this.addObjectsToMap(this.level.clouds);  
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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

    playBackgroundMusic() {
        this.backgroundMusic.play();
    }

    
    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    
    toggleSound(muted) {
        this.backgroundMusic.muted = muted;
        this.character.walking_sound.muted = muted;
        this.character.jumping_sound.muted = muted;
        this.character.hurt_sound.muted = muted;
        this.character.character_dead_sound.muted = muted;
        this.level.enemies.forEach(enemy => {
           if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.dying_sound.muted = muted;
           }
           if (enemy instanceof Endboss) {
            enemy.attack_sound.muted = muted;
            enemy.dying_sound.muted = muted;
            }
        });
    
        this.throwableObjects.forEach(obj => {
           if (obj.throw_sound) {
            obj.throw_sound.muted = muted;
           }
        });
    }

    showWonScreen() {
        this.stopBackgroundMusic();
        this.gameWinSound.play();
        this.stopGame();
        document.getElementById('game-won').classList.remove('d-none');
    }
    
    showLostScreen() {
        this.stopBackgroundMusic();
        this.gameOverSound.play();
        this.stopGame();
        document.getElementById('game-over').classList.remove('d-none');
    }
    

    showRestartButton() {
        document.getElementById('restartButton').classList.remove('d-none');
    }

    stopGame() {
    
        this.gameIntervals.forEach(interval => clearInterval(interval));
        this.gameIntervals = [];

        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.stopSounds();
            }
        });
    }

    stopAllSounds() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.gameOverSound.pause();
        this.gameOverSound.currentTime = 0;
        this.gameWinSound.pause();
        this.gameWinSound.currentTime = 0;
    }


    reset() {
        this.stopAllSounds();  
        this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
            enemy.stopSounds();
        }
      });

    
    if (this.character) {
        this.character.reset();
        }
     
        this.throwableObjects = [];
        this.camera_x = 0;
        this.statusBar.setPercentage(100);
        this.bottleBar.setBottles(0);
        this.coinBar.setCoins(0);
        this.endbossBar.setPercentage(100);
    }
}