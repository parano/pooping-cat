var Prompt = function(x, y, width, height, image_prefix) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.images = _.map(_.range(8), function(i){ 
    var image = new Image(); 
    image.src = image_prefix + "_0" + (i+1) + ".png"
    return image;
  });

  this.counter = 0; // 0 - 10

  this.showCombo = false;

  this.cur = function(){
    if(this.showCombo) { // show combo card
      return 7;
    } else if(this.counter === 0) {
      return 0; // draw 7 cards
    } else if (this.counter % 2 === 0) {
      return (this.counter/2) + 1; // review a card
    } else {
      return 1; // wait
    }
  };

  this.next = function(){
    this.showCombo = false;
    this.counter = (this.counter + 1) % 12;
  }

  this.prev = function(){
    this.counter = (this.counter + 11) % 12;
  }

  this.combo = function(){
    this.showCombo = true;
  }
  //this.texts = [
  //  "Go 1st Next Round",
  //  "Go 2nd Next Round",
  //]
  //this.drawText = function(ctx) {
  //  ctx.save();
  //  ctx.translate(this.x - width/2, this.y + height/2)
  //  ctx.rotate(Math.PI / 2);
  //  ctx.font = "14pt Calibri";
  //  ctx.fillStyle = 'white';
  //  ctx.fillText(this.texts[0], -width/2, -height/2);
  //  ctx.restore();
  //}
}

