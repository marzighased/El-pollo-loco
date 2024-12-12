let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    
    console.log('My Character is', world.character);


}