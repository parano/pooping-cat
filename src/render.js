var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var offsetX, offsetY;

// resize the map after user resize the window
window.onload = window.onresize = function() {
  size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  // ipad resolution 0.75
  canvas.width = size.width;
  canvas.height = size.height;

  offsetX = (canvas.width - canvas.height) / 2
  offsetY = 20;

  tileSize = (canvas.height - 2*offsetY) / mapRows;
}

var renderMap = function() {
  // clear the canvas
  context.clearRect(offsetX, offsetY, canvas.width, canvas.height);
  context.drawImage(bg, offsetX, offsetY, canvas.height-2*offsetY, canvas.height-2*offsetY);
  context.drawImage(fish, offsetX, offsetY, tileSize, tileSize);

  // draw the cats
  _.each(cats, function(cat){
    context.save();
    context.translate(offsetX + cat.col*tileSize + tileSize/2, 
                      offsetY + cat.row*tileSize + tileSize/2)
    context.rotate(cat.direction * Math.PI / 2)
    context.drawImage(cat.pic, 
                      -tileSize/2, 
                      -tileSize/2, 
                      tileSize, tileSize)
    context.restore();
  });

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
