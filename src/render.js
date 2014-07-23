var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var offsetX, offsetY;

// resize the map after user resize the window
window.onload = window.onresize = function() {
  size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
  tileSize = size.height / mapRows;
  canvas.width = size.width;
  canvas.height = size.height;

  // ipad resolution 0.75
  offsetX = (size.width - size.height) / 2
  offsetY = 0;
}

var renderMap = function() {
  // clear the canvas
  context.clearRect(offsetX, offsetY, canvas.width, canvas.height);
  context.drawImage(bg, offsetX, offsetY, canvas.height, canvas.height);
  context.drawImage(fish, offsetX, offsetY, tileSize, tileSize);

  // draw the orange cat
  context.save();
  context.translate(offsetX + orangeCat.col*tileSize + tileSize/2, 
                    offsetY + orangeCat.row*tileSize + tileSize/2)
  context.rotate(orangeCat.direction * Math.PI / 2)
  context.drawImage(orangeCat.pic, 
                    -tileSize/2, 
                    -tileSize/2, 
                    tileSize, tileSize)
  context.restore();

  // draw the purple cat
  context.save();
  context.translate(offsetX + purpleCat.col*tileSize + tileSize/2, 
                    offsetY + purpleCat.row*tileSize + tileSize/2)
  context.rotate(purpleCat.direction * Math.PI / 2)
  context.drawImage(purpleCat.pic, 
                    -tileSize/2, 
                    -tileSize/2, 
                    tileSize, tileSize)
  context.restore();

  // draw the poops
  _.each(obstacles, function(obstacle){
    context.drawImage(obstacle.pic,
                     offsetX + obstacle.col*tileSize,
                     offsetY + obstacle.row*tileSize,
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
  renderMap();

  requestAnimationFrame(function() {
    updateGame();
  });
}

updateGame();
