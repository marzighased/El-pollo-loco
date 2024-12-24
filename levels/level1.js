let level1;
function initLevel() {

level1 = new Level (
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud()
    ],

    [
      new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 0),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719*2),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719*2),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719*2),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719*2),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719*3),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719*3),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719*3),
      new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719*3)
    ],

    [
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'), 
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),  
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),  
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),  
        new Coin('img_pollo_locco/img/8_coin/coin_1.png') 
 
    ],

    [
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png')

    ]

 
 );
} 