var Prompt = function(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.text = "Draw 7 Cards And Plan Your Steps"
  this.draw = function(ctx){
    ctx.save();
    ctx.translate(this.x + width/2, this.y + height/2)
    ctx.rotate(Math.PI / 2);
    ctx.font = "italic 20pt Calibri";
    ctx.fillText(this.text, -width/2, -height/2);
    ctx.restore();
  }
}

/*
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
  */
