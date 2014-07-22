var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

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
