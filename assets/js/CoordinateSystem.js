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
    console.log('xmax: '+this.vals.xMax)
    var step =  (this.vals.xMax-this.vals.xMin+this.xOffset) / this.unitCount
    for(var i = 0; i <= this.unitCount; i++){
      xPos = this.toX(this.width/this.unitCount*i)

      this.canvas.drawLine(
        {x:xPos, y:this.toY(0.0 - this.measuringUnitLength)}, 
        {x:xPos, y:this.toY(0.0 + this.measuringUnitLength)})

      this.canvas.drawText(
        step * i + this.vals.xMin - this.xOffset, 
        {
          y: this.toY(0.0 - this.measuringUnitLength * 4), 
          x: xPos
        },'white')      
    }

    // y units
    step = ((this.vals.yMax - this.vals.yMin + this.yOffset) / this.unitCount)
    for(var i = 0; i <= this.unitCount; i++){
      yPos = this.toY(this.height/this.unitCount*i)

      this.canvas.drawLine(
        {y:yPos, x:this.toX(0.0 - this.measuringUnitLength)}, 
        {y:yPos, x:this.toX(0.0 + this.measuringUnitLength)})

      this.canvas.drawText(
        (step * i) + this.vals.yMin - this.yOffset, 
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
    this.vals = vals
    this.computeRanges(vals)
    this.canvas.clear()

    this.drawAxes()
    this.drawUnits()
    this.drawTextOnAxes(texts)

  }

  CoordinateSystem.prototype.alignGlyph = function(glyph, xVal, yVal){

    if(!isNaN(xVal))
      $(glyph).css("left", this.valueToX(xVal - this.vals.xMin + this.xOffset))
    if(!isNaN(yVal))
      $(glyph).css("top", this.valueToY(yVal  - this.vals.yMin + this.yOffset))

  }


  CoordinateSystem.prototype.computeRanges = function(vals){
    
    this.xEnd = this.canvasWidth - this.spacing
    // how many pixels anailable in width?
    this.width = this.xEnd - this.toX(0.0)
    this.xValueRange = vals.xMax - vals.xMin

    this.yEnd = this.spacing
    // how many pixels anailable in height?
    this.height = this.toY(0.0) - this.yEnd
    this.yValueRange = vals.yMax - vals.yMin   

    this.xOffset = this.xValueRange / 15
    this.yOffset = this.yValueRange / 15

    this.xValueRange = this.xValueRange + this.xOffset
    this.xValueRange = this.xValueRange + this.yOffset
  } 

  CoordinateSystem.prototype.toY = function(y){
    return this.canvasHeight - y - this.spacing 
  }   
  CoordinateSystem.prototype.toX = function(x){
    return x + this.spacing
  } 

  CoordinateSystem.prototype.valueToY = function(y){
    var relativeValue = y * (this.height / (this.vals.yMax - this.vals.yMin + this.yOffset))

    return this.toY(relativeValue)
  }   
  CoordinateSystem.prototype.valueToX = function(x){
    var relativeValue = x * (this.width / (this.vals.xMax - this.vals.xMin + this.xOffset))

    return this.toX(relativeValue)
  }   




