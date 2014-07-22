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
  this.removeObstaclePressed = false;

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

  this.removeObstacle = function(map){
    console.log("Remvoing Obstacle");
    switch(this.direction) {
      case 0: // up
        if(this.row > 0) {
          removeObstacle(this.col, this.row-1);
        }
      break;

      case 1: // right
        if(this.col < mapCols-1) {
          removeObstacle(this.col+1, this.row);
        }
      break;

      case 2: // down
        if(this.row < mapRows-1) {
          removeObstacle(this.col, this.row+1);
        }
      break;

      case 3: // left
        if(this.col > 0) {
          removeObstacle(this.col-1, this.row);
        }
      break;

      default:
        console.log("Error on Removing Obstacle !")
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
    } else if (this.removeObstaclePressed) {
      this.removeObstaclePressed = false;
      this.removeObstacle(map)
    }
  }
}

