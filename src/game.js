// Two Player Mode

var fish = new Image();
fish.src = "./assets/fish.png";

var bg = new Image();
bg.src = "./assets/background.png";

// list of obstacles on the map
var obstacles = [];


// create first player on the map
var orangeCat = new Player(mapCols-2, 
                           mapRows-1, 
                           UP, 
                           "./assets/cat_orange.png");

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 65: // press a
      orangeCat.turnLeft();
    break;

    case 87: //press w
      orangeCat.stepForward(map);
    break;

    case 68: // press d
      orangeCat.turnRight();
    break;

    case 83: // press s
      orangeCat.removeObstacle(map);
    break;
  }
}, false);

var purpleCat = new Player(mapCols-1, 
                           mapRows-2, 
                           LEFT, 
                           "./assets/cat_purple.png");

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 37: // press left arrow
      purpleCat.turnLeft();
    break;

    case 38: //press up arrow
      purpleCat.stepForward(map);
    break;

    case 39: // press right arrow
      purpleCat.turnRight();
    break;

    case 40: // press down arrow
      purpleCat.removeObstacle(map);
    break;
  }
}, false);

var updateGame = function() {
  renderMap();

  requestAnimationFrame(function() {
    updateGame();
  });
}

updateGame();
