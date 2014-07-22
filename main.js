var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var mapCols = 9;
var mapRows = 9;

var size, tileSize;

var bg = new Image();
bg.src = "./assets/background.png";

var fish = new Image();
fish.src = "./assets/fish.png";

// resize the map after user resize the window
window.onload = window.onresize = function() {
  size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
  tileSize = size.height / mapRows;
  canvas.width = size.height;
  canvas.height = size.height;
}

var UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3;

var Player = function(px,  py, direction, image){
  // position on the map
  this.col = px;
  this.row = py;

  this.pic = new Image();
  this.pic.src = image;

  // contorl key pressed
  this.leftPressed = false;
  this.rightPressed = false;
  this.movePressed = false;

  // facing direction
  this.direction = direction; // 0=up, 1right, 2down, 3left

  this.turnLeft = function() {
    this.direction = (this.direction + 3 ) % 4
    //console.log("Turnning Left, Current direction: " + this.direction)
  }

  this.turnRight = function() {
    this.direction = (this.direction + 1) % 4
    //console.log("Turnning Right, Current direction: " + this.direction)
  }

  this.stepForward = function(map) {
    console.log("step:" + this.direction)
    switch(this.direction) {
      case 0: // up
        if(this.row > 0 && map[this.row-1][this.col] === 0 ) {
          this.row -= 1;
        }
      break;

      case 1: // right
        if(this.col < mapCols-1 && map[this.row][this.col+1] === 0) {
          this.col += 1;
        }
      break;

      case 2: // down
        if(this.row < mapRows-1 && map[this.row+1][this.col] === 0) {
          this.row += 1;
        }
      break;

      case 3: // left
        if(this.col > 0 && map[this.row][this.col-1] === 0) {
          this.col -= 1;
        }
      break;

      default:
        console.log("Error on Moving forward !")
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
      //console.log("move forward")
      this.movePressed = false;
      this.stepForward(map);
    }
  }
}

var Obstacle = function(px, py) {
  this.col = px;
  this.row = py;
  this.pic = new Image();
  this.pic.src = "./assets/poop.png"
}

// list of obstacles on the map
var obstacles = [];

var addObstacle = function(px, py) {
  if(map[py][px] === 0){
    map[py][px] = 1;
    obstacles.push(new Obstacle(px, py));
  }
}

var removeObstacle = function(px, py) {
  obstacles = _.reject(obstacles, function(o){
    return o.col === px && o.row === py;
  })
}

canvas.addEventListener("mousedown", function(e){
  console.log("mousedown");
  var x = Math.floor((e.x - canvas.offsetLeft) / tileSize);
  var y = Math.floor((e.y - canvas.offsetTop) / tileSize);

  // testing mousedown event
  //context.fillStyle = "rgb(144,144,144)";
  //context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
  //alert("x:" + x + " y:" + y);
  
  // add or remove obstacle
  if(map[y][x] === 0) {
    addObstacle(x, y);
  } else {
    removeObstacle(x, y);
    map[y][x] = 0;
  }
}, false);

var map = [  //the 9x9 map - 1=not walkable, 0=empty space
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]; 

// create an empty map, 9*9 fill with 0s
//var map = _.map(_.range(9), function(){ 
//  return _.map(_.range(9), function(){ return 0;});
//})

// create first player on the map
var orangeCat = new Player(mapCols-2, 
                           mapRows-1, 
                           UP, 
                           "./assets/cat_orange.png");

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

var purpleCat = new Player(mapCols-1, 
                           mapRows-2, 
                           LEFT, 
                           "./assets/cat_purple.png");

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


var renderMap = function() {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bg, 0, 0, canvas.width, canvas.height);
  context.drawImage(fish, 0, 0, tileSize, tileSize);

  // draw the orange cat
  context.save();
  context.translate(orangeCat.col*tileSize + tileSize/2, 
                    orangeCat.row*tileSize + tileSize/2)
  context.rotate(orangeCat.direction * Math.PI / 2)
  context.drawImage(orangeCat.pic, 
                    -tileSize/2, 
                    -tileSize/2, 
                    tileSize, tileSize)
  context.restore();

  // draw the purple cat
  context.save();
  context.translate(purpleCat.col*tileSize + tileSize/2, 
                    purpleCat.row*tileSize + tileSize/2)
  context.rotate(purpleCat.direction * Math.PI / 2)
  context.drawImage(purpleCat.pic, 
                    -tileSize/2, 
                    -tileSize/2, 
                    tileSize, tileSize)
  context.restore();


  // draw the poops
  _.each(obstacles, function(obstacle){
    context.drawImage(obstacle.pic,
                     obstacle.col*tileSize,
                     obstacle.row*tileSize,
                     tileSize, tileSize)
  });
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
