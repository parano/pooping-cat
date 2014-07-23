// Two Player Mode
var bg = new Image();
bg.src = "./assets/background.png";

// list of obstacles on the map
var obstacles = [];
var cats = [];
var prompts = [];
var flags = [];

var fish = new Flag(0, 0, "./assets/fish.png")
flags.push(fish);

// create first player on the map
var orangeCat = new Player(mapCols-2, 
                           mapRows-1, 
                           UP, 
                           "./assets/cat_orange.png");
cats.push(orangeCat);

var orangePrompt = new Prompt("0",
                              "(canvas.height - offsetX*2)/2",
                              "offsetX",
                              "offsetX * 2",
                              "./assets/prompts/orange/orange");
prompts.push(orangePrompt);

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

    case 49: // press 1
      orangePrompt.prev();
    break;
    
    case 50: // press 2
      orangePrompt.combo();
    break;
    
    case 51: // press 3
      orangePrompt.next();
    break;
  }
}, false);


var purpleCat = new Player(mapCols-1, 
                           mapRows-2, 
                           LEFT, 
                           "./assets/cat_purple.png");
cats.push(purpleCat);

var purplePrompt = new Prompt("(canvas.height + offsetX)",
                              "(canvas.height - offsetX*2)/2",
                              "offsetX",
                              "offsetX * 2",
                              "./assets/prompts/purple/purple");
prompts.push(purplePrompt);

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

    case 52: // press 4
      purplePrompt.prev();
    break
    
    case 53: // press 5
      purplePrompt.combo();
    break

    case 54: // press 6
      purplePrompt.next();
    break
  }
}, false);



//var purplePrompt = new Prompt(0,0,300,400);
//prompts.push(purplePrompt);

var updateGame = function() {
  renderMap();

  requestAnimationFrame(function() {
    updateGame();
  });
}

updateGame();
