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
    $('#showMode').html('Performance data')
    $('#showMode').attr('title',"Current visualization-mode")
    $('#container').tooltip();

    this.resizeContainer()

    this.glyphFactory = new GlyphFactory()

    $('#canvas-overlay').append(this.glyphFactory.getSvgContainer())
  }

  Gui.prototype.bindEvents = function(){
    $('#visualization-mode').click(function(e){
      this.switchViewTo(e.target.id);
    }.bind(this));

    dropZone = document.getElementById('canvas-overlay');
    dropZone.addEventListener('drop', function(event){var val = this.fileProcessor.processFile(event, this.start, this)}.bind(this), false);
    dropZone.addEventListener('dragover', function(event){this.showDragOver(event, true)}.bind(this), false);
    dropZone.addEventListener('dragleave', function(event){this.showDragOver(event, false)}.bind(this), false);

     window.onresize = function(e){
      this.canvas.updateSize(function(){this.draw()}.bind(this));
      
     }.bind(this);  
  }



  // pass thet to be in own context again
  Gui.prototype.start = function(data, that){

    if(!!data){
      that.data = data
      that.mode = $('#mode').html()
      
      that.draw(mode)
    }

  }


  Gui.prototype.resizeContainer = function(){
    $("#canvas-overlay").css({
      'left': this.canvas.getElement().position().left+'px',
      'top': this.canvas.getElement().position().top+'px',
      'width': this.canvas.getElement().width()+'px',
      'height': this.canvas.getElement().height()+'px'
    }); 

  }

  Gui.prototype.draw = function(){
    this.resizeContainer()
    console.log('drawing mode '+this.mode)

    // draw coordinate system
    this.coordSystem.meashured(this.calcMinMaxVals(), this.textForAxes())

    // create and draw glyphs
    var objArray = this.data.getObjectArray()

    this.glyphFactory.reset()

    for(var i = 0; i < objArray.length; i++){
      var currDataObj = objArray[i].getDataObject()

      // x axis: PS  /  y axis: Weight
      if(this.mode == 'performance-action' || this.mode == 'manufacturing-action'){      
        if(!isNaN(currDataObj.horsepower) && !isNaN(currDataObj.weightInTons)){
          var glyph = this.glyphFactory.createGlyph(currDataObj, this.mode)
          this.coordSystem.alignGlyph(glyph, currDataObj.horsepower, currDataObj.weightInTons)
        }       
      }
      // x axis: acceleration  /  y axis: hubraum
      else if(this.mode == 'origin-action'){
        if(!isNaN(currDataObj.acceleration) && !isNaN(currDataObj.displacementInCcm)){
          var glyph = this.glyphFactory.createGlyph(currDataObj, this.mode)
          this.coordSystem.alignGlyph(glyph, currDataObj.acceleration, currDataObj.displacementInCcm)
        }  
      }   
    }

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

 Gui.prototype.textForAxes = function(){

    var texts
    // x axis: PS  /  y axis: Weight
    if(this.mode == 'performance-action' || this.mode == 'manufacturing-action'){      
      texts = {
          x: 'PS'
        , y: 'Weight in Tons'
      }        
    } 
    // x axis: acceleration  /  y axis: hubraum
    else if(this.mode == 'origin-action'){
      texts = {
          x: '0-100 Km/h in sec'
        , y: 'Ccm'
      }
    }

    return texts    
  } 

  Gui.prototype.switchViewTo = function(mode){
    $('#mode').html(mode)

    if(mode == 'performance-action')
      $('#showMode').html('Performance data')
    else if(mode == 'manufacturing-action'){
      $('#showMode').html('Performance and manufacturing data')
      console.log(mode)
    }
    else if(mode == 'origin-action')
      $('#showMode').html('Performance and origin data')

    this.mode = mode

    this.draw(mode)
  }

  Gui.prototype.showDragOver = function(event, onOrOff){
    event.stopPropagation();
    event.preventDefault();
    this.canvas.highlight(onOrOff);
  }




