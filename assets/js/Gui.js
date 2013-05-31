/*
GUI class
*/

window.Gui = Gui; 
"use strict";

  function Gui(canvas, fileProcessor, coordSys){
    this.canvas = canvas;
    this.fileProcessor = fileProcessor;
    this.coordSystem = coordSys;

    this.bindEvents();
    $('#mode').html('performance-action')
  }

  Gui.prototype.bindEvents = function(){
    $('#visualization-mode').click(function(e){
      this.switchViewTo(e.target.id);
    }.bind(this));

    dropZone = document.getElementById('myCanvas');
    dropZone.addEventListener('drop', function(event){var val = this.fileProcessor.processFile(event, this.start, this)}.bind(this), false);
    dropZone.addEventListener('dragover', function(event){this.showDragOver(event, true)}.bind(this), false);
    dropZone.addEventListener('dragleave', function(event){this.showDragOver(event, false)}.bind(this), false);

  }


  // pass thet to be in own context again
  Gui.prototype.start = function(data, that){

    if(!!data){
      that.data = data
      that.mode = $('#mode').html()
      
      that.draw(mode)
    }

  }



  Gui.prototype.draw = function(){

    console.log('drawing mode '+this.mode)

    this.coordSystem.meashured(this.calcMinMaxVals())

    //objects = this.data.getObjectArray()
    
    //console.log(vals)
    // x axis / y axis
    //
    //console.log(objects[0].getDataObject())

    // glyphs

    // legend
  }

  Gui.prototype.calcMinMaxVals = function(){
    // calculate max and min values for axes
    var vals
    // x axis: PS  /  y axis: Weight
    if(this.mode == 'performance-action' || this.mode == 'manufacturing-action'){      
      vals = {
          xMin: this.data.getObjWithSmallestValueOf('horsepower').horsepower
        , xMax: this.data.getObjWithBiggestValueOf('horsepower').horsepower
        , yMin: this.data.getObjWithSmallestValueOf('weightInTons').weightInTons
        , yMax: this.data.getObjWithBiggestValueOf('weightInTons').weightInTons
      }        
    } 
    // x axis: acceleration  /  y axis: hubraum
    else if(this.mode == 'origin-action'){
      console.log('origin')
      vals = {
          xMin: this.data.getObjWithSmallestValueOf('acceleration').acceleration
        , xMax: this.data.getObjWithBiggestValueOf('acceleration').acceleration
        , yMin: this.data.getObjWithSmallestValueOf('displacementInCcm').displacementInCcm
        , yMax: this.data.getObjWithBiggestValueOf('displacementInCcm').displacementInCcm
      }
    }

    return vals    
  }

  Gui.prototype.switchViewTo = function(mode){
    $('#mode').html(mode)
    this.mode = mode
    this.draw(mode)
  }

  Gui.prototype.showDragOver = function(event, onOrOff){
    event.stopPropagation();
    event.preventDefault();
    this.canvas.highlight(onOrOff);
  }




