class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 3000;

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
         this.enemies = enemies;
         this.clouds = clouds;
         this.backgroundObjects = backgroundObjects;
         this.coins = coins;
         this.bottles = bottles;
    }  
} 