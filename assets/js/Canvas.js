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
    this.bindEvents();
    this.highlight(false);

    this.ctx.font = "bold 12px sans-serif"
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
  }

  Canvas.prototype.bindEvents = function(){
    window.onresize = function(e){
      this.updateSize();
    }.bind(this);    
  }

  Canvas.prototype.getContext = function(){
    return this.ctx;
  }

  Canvas.prototype.updateSize = function() {
    this.ctx.canvas.width  = $('#container').width()*.833;
  }

  Canvas.prototype.highlight = function(onOrOff){
    if (onOrOff)
      this.ctx.fillStyle="#4A8FF0";
    else
      this.ctx.fillStyle="#FFFFFF";

    this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

   Canvas.prototype.clear = function(){
    this.ctx.fillStyle="#4A8FF0"
    this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
  } 

  // DRAWING

  Canvas.prototype.drawLine = function(startPoint, endPoint){
    this.ctx.moveTo(startPoint.x,startPoint.y);
    this.ctx.lineTo(endPoint.x,endPoint.y);
    this.ctx.stroke();
  }

  Canvas.prototype.drawText = function(text, pos, color,rot){
    // cut if its a number
    console.log(text*2)
    if(!isNaN(text*2))
      text = text.toFixed(1)

    this.ctx.fillStyle = color;

    if(rot){
      this.ctx.save()
      this.ctx.translate(pos.x, pos.y);
      this.ctx.rotate(Math.PI/2)
      this.ctx.fillText(text, 0, 0);
    }
    else
      this.ctx.fillText(text, pos.x, pos.y);

    if(rot)
      this.ctx.restore()
  }




