/**
 * @file keyboard.class.js
 * @description Implementation of keyboard input handling for El Pollo Loco game
 */

/**
 * Keyboard class that tracks keyboard input state
 * This class stores boolean flags for each key used in game controls
 * @class Keyboard
 */
class Keyboard {
    /** Flag for left arrow key pressed state @type {boolean} */
    LEFT = false; 
    
    /** Flag for right arrow key pressed state @type {boolean} */
    RIGHT = false;
    
    /** Flag for up arrow key pressed state @type {boolean} */
    UP = false;
    
    /** Flag for down arrow key pressed state @type {boolean} */
    DOWN = false;
    
    /** Flag for spacebar pressed state @type {boolean} */
    SPACE = false;
    
    /** Flag for D key pressed state (used for throwing bottles) @type {boolean} */
    D = false;  
}