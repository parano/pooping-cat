var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

var mapCols = 9;
var mapRows = 9;
var tileSize = size.height / mapRows;

canvas.width = tileSize * mapCols;
canvas.height = tileSize * mapRows;

var UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3;

var Player = function(px,  py, direction){
  // position on the map
  this.col = px;
  this.row = py;

  // contorl key pressed
  this.leftPressed = false;
  this.rightPressed = false;
  this.movePressed = false;

  // facing direction
  this.direction = direction; // 0=up, 1right, 2down, 3left

  this.turnLeft = function() {
    this.direction = (this.direction + 3 ) % 4
    console.log("Turnning Left, Current direction: " + this.direction)
  }

  this.turnRight = function() {
    this.direction = (this.direction + 1) % 4
    console.log("Turnning Right, Current direction: " + this.direction)
  }

  this.stepForward = function(map) {
    //if(this.collisionsTesting(map)) {
      console.log("step:" + this.direction)
      switch(this.direction) {
        case 0: // up
          this.row -= 1;
        break;

        case 1: // right
          this.col += 1;
        break;

        case 2: // down
          this.row += 1;
        break;

        case 3: // left
          this.col -= 1;
        break;

        default:
          console.log("Error on Moving forward !")
      }
    //}
  }

  this.collisionsTesting = function(map) {
    // return true if the direction that the play facing is walkable
    switch(this.direction) {
      case 0: // up
        return true
      break;

      case 1: // right
        return true
      break;

      case 2: // down
        return true
      break;

      case 3: // left
        return true
      break;

      default:
        console.log("Error on collision test !")
        return false;
    }
  }

  this.update = function() {
    if(this.leftPressed) {
      // rotate left
      this.leftPressed = false;
      this.turnLeft();
    } else if (this.rightPressed) {
      // rotate right
      this.rightPressed = false;
      this.turnRight();
    } else if (this.movePressed) {
      // move forward 1 step
      console.log("move forward")
      this.movePressed = false;
      this.stepForward(map);
    }
  }
}

var Obstacle = function(px, py) {
  this.col = px;
  this.row = py;
}

//var map = [ // the 9x9 map - 1=not walkable, 0=empty space
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0, 0, 0]
//]; 

// create an empty map, 9*9 fill with 0s
var map = _.map(_.range(9), function(){ 
  return _.map(_.range(9), function(){ return 0;});
})

// create first player on the map
var orangeCat = new Player(mapCols-2, mapRows-1, UP);
document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 65: // press a
      orangeCat.leftPressed=true;
    break;

    case 87: //press w
      orangeCat.movePressed=true;
    break;

    case 68: // press d
      orangeCat.rightPressed=true;
    break;
  }
}, false);

var purpleCat = new Player(mapCols-1, mapRows-2, LEFT);
document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 37: // press left arrow
      purpleCat.leftPressed=true;
    break;

    case 38: //press up arrow
      purpleCat.movePressed=true;
    break;

    case 39: // press right arrow
      purpleCat.rightPressed=true;
    break;
  }
}, false);

// list of obstacles on the map
var obstacles = [];


var renderMap = function() {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the grids
  context.strokeStyle = "#ff0000";
  for(var i=0; i<mapRows; i++) {
    for(var j=0; j<mapCols; j++) {
      context.strokeRect(j*tileSize,i*tileSize,tileSize,tileSize); 
    }
  }
  
  // draw the orange cat
  context.fillStyle = "#00ff00";
  context.fillRect(orangeCat.col*tileSize, orangeCat.row*tileSize, 
                    tileSize, tileSize);


  // draw the purple cat
  context.fillStyle = "#00ffff";
  context.fillRect(purpleCat.col*tileSize, purpleCat.row*tileSize, 
                    tileSize, tileSize);
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };
})();


var updateGame = function() {
  orangeCat.update();
  purpleCat.update();

  renderMap();

  requestAnimationFrame(function() {
    updateGame();
  });
}

updateGame();
