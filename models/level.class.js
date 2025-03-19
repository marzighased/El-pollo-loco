/**
 * @file level.class.js
 * @description Implementation of the level configuration for El Pollo Loco game
 */

/**
 * Level class that defines the game map and elements
 * This class contains all enemies, clouds, background objects, collectibles, and boundaries for a game level
 * @class Level
 */
class Level {
    /** Array of enemy objects in the level @type {Array<MovableObject>} */
    enemies;
    
    /** Array of cloud objects for parallax background @type {Array<Cloud>} */
    clouds;
    
    /** Array of background layer objects @type {Array<BackgroundObject>} */
    backgroundObjects;
    
    /** Array of collectable coin objects @type {Array<Coin>} */
    coins;
    
    /** Array of collectable bottle objects @type {Array<Bottle>} */
    bottles;
    
    /** X-coordinate where the level ends @type {number} */
    level_end_x = 3000;

    /**
     * Creates a new Level instance with all game elements
     * @constructor
     * @param {Array<MovableObject>} enemies - All enemy objects in the level
     * @param {Array<Cloud>} clouds - All cloud objects for the background
     * @param {Array<BackgroundObject>} backgroundObjects - All background layer objects
     * @param {Array<Coin>} coins - All collectable coin objects
     * @param {Array<Bottle>} bottles - All collectable bottle objects
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
         this.enemies = enemies;
         this.clouds = clouds;
         this.backgroundObjects = backgroundObjects;
         this.coins = coins;
         this.bottles = bottles;  
    }  
}