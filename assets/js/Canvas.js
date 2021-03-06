/*
Canvas class

*/


window.Canvas = Canvas; 
"use strict";


  function Canvas(id){
    this.id = id;
    this.cv = document.getElementById(this.id);
    this.ctx = this.cv.getContext('2d');

    this.updateSize();
    
    this.highlight(false);

    this.ctx.font = "bold 12px sans-serif"
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
  }

  Canvas.prototype.getElement = function(){
    return $('#'+this.id)  
  }



  Canvas.prototype.getContext = function(){
    return this.ctx;
  }

  Canvas.prototype.updateSize = function(func) {

    this.ctx.canvas.width  = $('#container').width()*.833;
    $("#canvas-overlay").css({
      'left': this.ctx.canvas.left+'px',
      'top': this.ctx.canvas.top+'px'
    })
    if(!!func)
      func();
  }

  Canvas.prototype.highlight = function(onOrOff){
    if (onOrOff)
      this.ctx.fillStyle="#4A8FF0";
    else
      this.ctx.fillStyle="#FFFFFF";

    this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

   Canvas.prototype.clear = function(){
    this.ctx.fillStyle="lightgrey"
    this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
  } 

  // DRAWING

  Canvas.prototype.drawLine = function(startPoint, endPoint){
    this.ctx.moveTo(startPoint.x,startPoint.y);
    this.ctx.lineTo(endPoint.x,endPoint.y);
    this.ctx.stroke();
  }

  Canvas.prototype.drawText = function(text, pos, color,rot){
    this.ctx.font = "bold 12px sans-serif"
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    // cut if its a number
    if(!isNaN(text*2))
      text = text.toFixed(1)

    this.ctx.fillStyle = color;

    // rotate text by -90 degrees
    if(rot){
      this.ctx.save()
      this.ctx.translate(pos.x, pos.y)
      this.ctx.rotate(Math.PI/2)
      this.ctx.fillText(text, 0, 0)
      this.ctx.restore()
    }
    else
      this.ctx.fillText(text, pos.x, pos.y);
  }




