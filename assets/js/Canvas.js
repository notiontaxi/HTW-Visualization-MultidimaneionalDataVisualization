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

  // DRAWING

  Canvas.prototype.drawLine = function(startPoint, endPoint){
    this.ctx.moveTo(startPoint.x,startPoint.y);
    this.ctx.lineTo(endPoint.x,endPoint.y);
    this.ctx.stroke();
  }




