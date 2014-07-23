// Two Player Mode
var bg = new Image();
bg.src = "./assets/background.png";

// list of obstacles on the map
var obstacles = [];
var cats = [];
var prompts = [];
var flags = [];

var fish1 = new Flag(0, 0, "./assets/fish.png")
var fish2 = new Flag(mapCols-1, mapRows-1, "./assets/fish.png")
flags = [fish1, fish2];

// create first player on the map
var orangeCat = new Player(0, 
                           1, 
                           RIGHT, 
                           "./assets/cat_orange.png");
cats.push(orangeCat);

var orangePrompt = new Prompt("(offsetX - canvas.height/4)/2",
                              "0",
                              "canvas.height/4",
                              "canvas.height/2",
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

// green cat
var greenCat = new Player(1, 
                          0, 
                          DOWN, 
                          "./assets/cat_green.png");
cats.push(greenCat);

var greenPrompt = new Prompt("(offsetX - canvas.height/4)/2",
                              "canvas.height/2",
                              "canvas.height/4",
                              "canvas.height/2",
                              "./assets/prompts/green/green");
prompts.push(greenPrompt);

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 70: // press f
      greenCat.turnLeft();
    break;

    case 84: //press t
      greenCat.stepForward(map);
    break;

    case 72: // press h
      greenCat.turnRight();
    break;

    case 71: // press g
      greenCat.removeObstacle(map);
    break;

    case 52: // press 4
      greenPrompt.prev();
    break;
    
    case 53: // press 5
      greenPrompt.combo();
    break;
    
    case 54: // press 6
      greenPrompt.next();
    break;
  }
}, false);

// purple Cat
var purpleCat = new Player(mapCols-1, 
                           mapRows-2, 
                           LEFT, 
                           "./assets/cat_purple.png");
cats.push(purpleCat);

var purplePrompt = new Prompt("(canvas.height + offsetX) + (offsetX - canvas.height/4)/2",
                              "0",
                              "canvas.height/4",
                              "canvas.height/2",
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

    case 188: // press ,
      purplePrompt.prev();
    break;
    
    case 190: // press .
      purplePrompt.combo();
    break;

    case 191: // press ?
      purplePrompt.next();
    break;
  }
}, false);

// blue Cat
var blueCat = new Player(mapCols-2, 
                         mapRows-1, 
                         UP, 
                         "./assets/cat_blue.png");
cats.push(blueCat);

var bluePrompt = new Prompt("(canvas.height + offsetX) + (offsetX - canvas.height/4)/2",
                            "canvas.height/2",
                            "canvas.height/4",
                            "canvas.height/2",
                            "./assets/prompts/blue/blue");
prompts.push(bluePrompt);

document.addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 74: // press j
      blueCat.turnLeft();
    break;

    case 73: //press i
      blueCat.stepForward(map);
    break;

    case 76: // press l
      blueCat.turnRight();
    break;

    case 75: // press dow k
      blueCat.removeObstacle(map);
    break;

    case 55: // press 7
      bluePrompt.prev();
    break
    
    case 56: // press 8
      bluePrompt.combo();
    break

    case 57: // press 9
      bluePrompt.next();
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
