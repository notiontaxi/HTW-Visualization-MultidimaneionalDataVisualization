/*
GUI class
*/

window.CoordinateSystem = CoordinateSystem; 
"use strict";

  function CoordinateSystem(canvas){
    this.canvas = canvas;

    this.spacing = 50
    this.measuringUnitLength = 4
    this.unitCount = 10;
    this.canvasHeight = this.canvas.ctx.canvas.height
    this.canvasWidth = this.canvas.ctx.canvas.width
  }


  CoordinateSystem.prototype.drawAxes = function(){
    // x axis
    this.canvas.drawLine({x:this.toX(0.0), y:this.toY(0.0)}, {x:this.toX(this.width), y:this.toY(0.0)})

    // y axis
    this.canvas.drawLine({x:this.toX(0.0), y:this.toY(0.0)}, {x:this.toX(0.0), y:this.toY(this.height)})
  }

  CoordinateSystem.prototype.drawUnits = function(){
    // x units
    var step = this.xValueRange / this.unitCount
    for(var i = 1; i <= this.unitCount; i++){
      xPos = this.toX(this.width/this.unitCount*i)

      this.canvas.drawLine(
        {x:xPos, y:this.toY(0.0 - this.measuringUnitLength)}, 
        {x:xPos, y:this.toY(0.0 + this.measuringUnitLength)})

      this.canvas.drawText(
        step * i, 
        {
          y: this.toY(0.0 - this.measuringUnitLength * 4), 
          x: xPos
        },'white')      
    }

    // y units
    step = this.yValueRange / this.unitCount
    for(var i = 1; i <= this.unitCount; i++){
      yPos = this.toY(this.height/this.unitCount*i)

      this.canvas.drawLine(
        {y:yPos, x:this.toX(0.0 - this.measuringUnitLength)}, 
        {y:yPos, x:this.toX(0.0 + this.measuringUnitLength)})

      this.canvas.drawText(
        step * i, 
        {
          x: this.toX(0.0) - this.spacing/2, 
          y: yPos
        },'white')
    }
 }

  CoordinateSystem.prototype.drawTextOnAxes = function(texts){

    this.canvas.drawText(
      texts.y, 
      {
        x: this.toX(0.0), 
        y: this.toY(this.height) - this.spacing / 2
      },'black')

    this.canvas.drawText(
      texts.x, 
      {
        x: this.toX(this.width) + this.spacing / 2, 
        y: this.toY(0.0)-10
      },'black',true)


  }

  CoordinateSystem.prototype.meashured = function(vals, texts){

    this.computeRanges(vals)
    this.canvas.clear()

    this.drawAxes()
    this.drawUnits()
    this.drawTextOnAxes(texts)

  }

  CoordinateSystem.prototype.computeRanges = function(vals){

    this.xEnd = this.canvasWidth - this.spacing
    this.width = this.xEnd - this.toX(0.0)
    this.xValueRange = vals.xMax - vals.xMin

    this.yEnd = this.spacing
    this.height = this.toY(0.0) - this.yEnd
    this.yValueRange = vals.yMax - vals.yMin    
  } 

  CoordinateSystem.prototype.toY = function(y){
    return this.canvasHeight - y - this.spacing
  }   
  CoordinateSystem.prototype.toX = function(x){
    return x + this.spacing
  } 




