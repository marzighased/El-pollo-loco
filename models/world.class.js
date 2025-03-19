/**
 * @file world.class.js
 * @description Main game world controller for El Pollo Loco game
 */

/**
 * World class that manages all game objects and game logic
 * This class is responsible for rendering, collision detection, and game state management
 * @class World
 */
class World {
    /** The main playable character @type {Character} */
    character = new Character();
    
    /** Current level containing all game objects @type {Level} */
    level;
    
    /** Canvas element reference @type {HTMLCanvasElement} */
    canvas;
    
    /** Canvas rendering context @type {CanvasRenderingContext2D} */
    ctx;
    
    /** Keyboard input handler @type {Keyboard} */
    keyboard;
    
    /** Camera horizontal offset for scrolling @type {number} */
    camera_x = 0;
    
    /** Health status bar UI element @type {StatusBar} */
    statusBar = new StatusBar();
    
    /** Bottle count UI element @type {BottleBar} */
    bottleBar = new BottleBar();
    
    /** Coin count UI element @type {CoinBar} */
    coinBar = new CoinBar();
    
    /** Endboss health UI element @type {EndbossBar} */
    endbossBar = new EndbossBar();
    
    /** Array of currently active throwable objects @type {Array<ThrowableObject>} */
    throwableObjects = [];
    
    /** Array of all interval IDs for proper cleanup @type {Array<number>} */
    gameIntervals = [];
    
    /**
     * Creates a new game world instance
     * Initializes all game elements and starts the game loop
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

    /**
     * Sets up references between the world and its game objects
     * Establishes the world object as the parent of characters and enemies
     * @method setWorld
     */
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
     * Sets up various interval timers for game mechanics
     * @method run
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
     * Spawns new enemies periodically throughout the level
     * Creates chickens and chicks at random positions ahead of the player
     * @method spawnNewEnemies
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

    /**
     * Checks for collisions between the character and enemies
     * Handles jumping on enemies, taking damage, and death sequences
     * @method checkCollisions
     */
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

    /**
     * Checks for bottle throw actions and creates new throwable objects
     * Triggered when the D key is pressed and player has bottles
     * @method checkThrowObjects
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.world = this;
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.bottleBar.setBottles(this.character.bottles);
        }
    }

    /**
     * Checks for collisions between character and coins
     * Handles coin collection and updates UI
     * @method checkCollisionWithCoins
     */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.character.coins++;
                this.coinBar.setCoins(this.character.coins);
            }
        });
    }

    /**
     * Checks for collisions between character and bottles
     * Handles bottle collection and updates UI
     * @method checkBottleCollisions
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.character.bottles++;
                this.bottleBar.setBottles(this.character.bottles);
            }
        });
    }

    /**
     * Checks for collisions between thrown bottles and enemies
     * Handles damage to enemies and bottle splash effects
     * @method checkBottleHitsEndboss
     */
    checkBottleHitsEndboss() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) {
                    if (bottle.isColliding(enemy) && !bottle.isSplashed) {
                        enemy.hit();
                        bottle.splash();
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
     * Handles camera translation and object drawing order
     * @method draw
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

    /**
     * Adds multiple objects to the game map
     * Helper method for drawing collections of game objects
     * @method addObjectsToMap
     * @param {Array<MovableObject|DrawableObject>} objects - Array of objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the game map
     * Handles flipping images for objects facing different directions
     * @method addToMap
     * @param {MovableObject|DrawableObject} mo - Object to draw
     */
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

    /**
     * Flips an image horizontally for objects facing left
     * @method flipImage
     * @param {MovableObject|DrawableObject} mo - Object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas state after flipping an image
     * @method flipImageBack
     * @param {MovableObject|DrawableObject} mo - Object to restore
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Toggles game sound on/off
     * @method toggleSound
     * @param {boolean} muted - True to mute sounds, false to enable
     */
    toggleSound(muted) {
        window.audioManager.setMute(muted);
    }

    /**
     * Shows the victory screen when player wins
     * Stops the game and plays win sound
     * @method showWonScreen
     */
    showWonScreen() {
        document.getElementById('game-won').style.display = 'flex';
        window.audioManager.stop('background');
        window.audioManager.play('gameWin');
        this.stopGame();
        showGameWon();
    }
    
    /**
     * Shows the game over screen when player loses
     * Stops the game and plays lose sound
     * @method showLostScreen
     */
    showLostScreen() {
        document.getElementById('game-over').style.display = 'flex';
        window.audioManager.stop('background');
        window.audioManager.play('gameOver');
        this.stopGame();
        showGameOver();
    }
    
    /**
     * Shows the restart button
     * @method showRestartButton
     */
    showRestartButton() {
        document.getElementById('restartButton').classList.remove('d-none');
    }

    /**
     * Stops all game processes
     * Clears intervals and stops sounds
     * @method stopGame
     */
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

    /**
     * Resets the game state to initial values
     * Prepares for a new game
     * @method reset
     */
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