var UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3;

var mapCols = 9;
var mapRows = 9;

var size, tileSize;

var Obstacle = function(px, py) {
  this.col = px;
  this.row = py;
  this.pic = new Image();
  this.pic.src = "./assets/poop.png"
}

canvas.addEventListener("mousedown", function(e){
  console.log("mousedown");
  var x = Math.floor((e.x - canvas.offsetLeft - offsetX) / tileSize);
  var y = Math.floor((e.y - canvas.offsetTop - offsetY) / tileSize);

  // testing mousedown event
  //context.fillStyle = "rgb(144,144,144)";
  //context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
  //alert("x:" + x + " y:" + y);
  
  // add or remove obstacle
  if(map[y][x] === 0) {
    addObstacle(x, y);
  } else {
    removeObstacle(x, y);
  }
}, false);

var addObstacle = function(px, py) {
  if(map[py][px] === 0){
    map[py][px] = 1;
    obstacles.push(new Obstacle(px, py));
  }
}

var removeObstacle = function(px, py) {
  obstacles = _.reject(obstacles, function(o){
    return o.col === px && o.row === py;
  });
  map[py][px] = 0;
}

var map = [  //the 9x9 map - 1=Obstacle, 0=Empty, 2=Player, 3=win
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
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

