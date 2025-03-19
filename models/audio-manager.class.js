/**
 * @file audio-manager.class.js
 * @description Manages all sound effects and music for the El Pollo Loco game
 */

/**
 * Manages all sound effects and music for the game
 * @class AudioManager
 */
class AudioManager {
    /**
     * Creates a new AudioManager instance and initializes all game sounds
     * @constructor
     */
    constructor() {
        /**
         * Collection of all game audio elements
         * @type {Object.<string, HTMLAudioElement>}
         */
        this.sounds = {
            background: new Audio('audio/background-music.mp3'),
            walking: new Audio('audio/walking.mp3'),
            jumping: new Audio('audio/jumping.mp3'),
            hurt: new Audio('audio/hurt.mp3'),
            characterDead: new Audio('audio/character-die.mp3'),
            chickenDie: new Audio('audio/chicken-squash.mp3'),
            throwBottle: new Audio('audio/throw-bottle.mp3'),
            gameOver: new Audio('audio/lost.mp3'),
            gameWin: new Audio('audio/won.mp3'),
            endbossAttack: new Audio('audio/endboss-sound.mp3'),
            endbossDie: new Audio('audio/endboss-die.mp3')
        };

        /**
         * Sets default volume levels for all sound effects
         * @type {Object.<string, number>}
         */
        this.setDefaultVolumes({ 
            background: 0.1,
            walking: 0.5,
            jumping: 0.5,
            hurt: 0.5,
            characterDead: 0.4,
            chickenDie: 0.4,
            throwBottle: 0.2,
            gameOver: 0.5,
            gameWin: 0.5,
            endbossAttack: 1,
            endbossDie: 1
        });

        /**
         * Flag indicating whether all sounds are muted
         * @type {boolean}
         */
        this.isMuted = false;
    }

    /**
     * Sets default volume levels for all sound effects
     * @param {Object.<string, number>} volumes - Object mapping sound names to volume levels (0.0 to 1.0)
     */
    setDefaultVolumes(volumes) {
        for (let [key, value] of Object.entries(volumes)) {
            if (this.sounds[key]) {
                this.sounds[key].volume = value;
            }
        }
    }

    /**
     * Plays a specific sound effect
     * @param {string} soundName - Name of the sound to play
     */
    play(soundName) {
        if (!this.isMuted && this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }
    
    /**
     * Stops a specific sound effect
     * @param {string} soundName - Name of the sound to stop
     */
    stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    /**
     * Stops all sound effects and music
     */
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Toggles mute state for all sounds
     * @returns {boolean} The new mute state
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        Object.values(this.sounds).forEach(sound => {
            sound.muted = this.isMuted;
        });
        return this.isMuted;
    }

    /**
     * Sets the mute state for all sounds
     * @param {boolean} muted - True to mute all sounds, false to unmute
     */
    setMute(muted) {
        this.isMuted = muted;
        Object.values(this.sounds).forEach(sound => {
            sound.muted = this.isMuted;
        });
    }

    /**
     * Plays a sound in loop mode
     * @param {string} soundName - Name of the sound to loop
     */
    playLoop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].loop = true;
            this.play(soundName);
        }
    }
}

/**
 * Global instance of the AudioManager
 * @type {AudioManager}
 */
window.audioManager = new AudioManager();