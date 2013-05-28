/*
GUI class
*/

window.Gui = Gui; 
"use strict";

  function Gui(canvas, fileReader, coordSys){
    this.canvas = canvas;
    this.fileReader = fileReader;
    this.coordSystem = coordSys;

    this.bindEvents();
  }

  Gui.prototype.bindEvents = function(){
    $('#visualization-mode').click(function(e){
      this.canvas.switchViewTo(e.target.id);
    }.bind(this));

    dropZone = document.getElementById('myCanvas');
    dropZone.addEventListener('drop', function(event){this.fileReader.processFile(event);this.draw()}.bind(this), false);
    dropZone.addEventListener('dragover', function(event){this.showDragOver(event, true)}.bind(this), false);
    dropZone.addEventListener('dragleave', function(event){this.showDragOver(event, false)}.bind(this), false);

  }



  Gui.prototype.draw = function(event, onOrOff){

  }


  Gui.prototype.showDragOver = function(event, onOrOff){
    event.stopPropagation();
    event.preventDefault();
    this.canvas.highlight(onOrOff);
  }




