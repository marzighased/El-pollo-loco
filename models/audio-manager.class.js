/**
 * Manages all sound effects and music for the game
 * @class AudioManager
 */
class AudioManager {
    constructor() {
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

        this.isMuted = false;
    }

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

    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        Object.values(this.sounds).forEach(sound => {
            sound.muted = this.isMuted;
        });
        return this.isMuted;
    }

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


window.audioManager = new AudioManager();