var Player = function(px,  py, direction, image){
  // position on the map
  this.col = px;
  this.row = py;
  map[py][px] = 2;

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
    //console.log("step:" + this.direction)
    switch(this.direction) {
      case 0: // up
        this.moveUp();
      break;

      case 1: // right
        this.moveRight();
      break;

      case 2: // down
        this.moveDown();
      break;

      case 3: // left
        this.moveLeft();
      break;

      default:
        console.log("error on moving forward !")
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

  this.moveUp = function(){
    var ahead_row = this.row-1;
    var ahead_col = this.col;
    console.log("moveup");

    if(this.row > 0){
      if (map[this.row-1][this.col] === 0 || map[this.row-1][this.col] === 3) {
        map[this.row][this.col] = 0;
        this.row -= 1;
        if(map[this.row][this.col] !== 3) {
          map[this.row][this.col] = 2;
        }
        return true;
      } else if(map[this.row-1][this.col] === 2){
        // find the cat that are infront
        console.log("finding cat ahead");
        player_ahead = _.find(cats, function(player){
          console.log(ahead_row);
          console.log(ahead_col);
          return player.row === ahead_row && player.col === ahead_col;
        });

        if(player_ahead !== undefined && player_ahead.moveUp()) {
          map[this.row][this.col] = 0;
          this.row -= 1;
          map[this.row][this.col] = 2;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  this.moveDown = function(){
    var ahead_row = this.row+1;
    var ahead_col = this.col;
    console.log("moveDown");

    if(this.row < mapRows-1){
      if(map[this.row+1][this.col] === 0 || map[this.row+1][this.col] === 3) {
        map[this.row][this.col] = 0;
        this.row += 1;
        if(map[this.row][this.col] !== 3) {
          map[this.row][this.col] = 2;
        }
        return true;
      } else if(map[this.row+1][this.col] === 2){
        // find the cat that are infront
        console.log("finding cat ahead");
        player_ahead = _.find(cats, function(player){
          console.log(ahead_row);
          console.log(ahead_col);
          return player.row === ahead_row && player.col === ahead_col;
        });

        if(player_ahead !== undefined && player_ahead.moveDown()) {
          map[this.row][this.col] = 0;
          this.row += 1;
          map[this.row][this.col] = 2;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else { 
      return false;
    }
  }
  
  this.moveLeft = function(){
    var ahead_row = this.row;
    var ahead_col = this.col-1;
    console.log("moveLeft");

    if(this.col > 0){
      if (map[this.row][this.col-1] === 0 || map[this.row][this.col-1] === 3) {
        map[this.row][this.col] = 0;
        this.col -= 1;
        if(map[this.row][this.col] !== 3) {
          map[this.row][this.col] = 2;
        }
        return true;
      } else if(map[this.row][this.col-1] === 2){
        // find the cat that are infront
        console.log("finding cat ahead");
        player_ahead = _.find(cats, function(player){
          console.log(ahead_row);
          console.log(ahead_col);
          return player.row === ahead_row && player.col === ahead_col;
        });

        if(player_ahead !== undefined && player_ahead.moveLeft()) {
          map[this.row][this.col] = 0;
          this.col -= 1;
          map[this.row][this.col] = 2;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  this.moveRight = function(){
    var ahead_row = this.row;
    var ahead_col = this.col+1;
    console.log("moveRight");

    if(this.col < mapCols-1){
      if (map[this.row][this.col+1] === 0 || map[this.row][this.col+1] === 3) {
        map[this.row][this.col] = 0;
        this.col += 1;
        if(map[this.row][this.col] !== 3) {
          map[this.row][this.col] = 2;
        }
        return true;
      } else if(map[this.row][this.col+1] === 2){
        // find the cat that are infront
        console.log("finding cat ahead");
        player_ahead = _.find(cats, function(player){
          console.log(ahead_row);
          console.log(ahead_col);
          return player.row === ahead_row && player.col === ahead_col;
        });

        if(player_ahead !== undefined && player_ahead.moveRight()) {
          map[this.row][this.col] = 0;
          this.col += 1;
          map[this.row][this.col] = 2;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }

    //map[this.row][this.col] = 0;
    //this.col += 1;
    //map[this.row][this.col] = 2;
  }
}

