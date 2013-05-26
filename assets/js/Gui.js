/*
GUI class
*/

window.Gui = Gui; 
"use strict";

  function Gui(canvas, fileReader){
    this.canvas = canvas;
    this.fileReader = fileReader;

    this.bindEvents();
  }

  Gui.prototype.bindEvents = function(){
    $('#visualization-mode').click(function(e){
      this.canvas.switchViewTo(e.target.id);
    }.bind(this));

    dropZone = document.getElementById('myCanvas');
    dropZone.addEventListener('drop', function(event){this.fileReader.processFile(event)}.bind(this), false);
    dropZone.addEventListener('dragover', function(event){this.showDragOver(event, true)}.bind(this), false);
    dropZone.addEventListener('dragleave', function(event){this.showDragOver(event, false)}.bind(this), false);

  }

  Gui.prototype.showDragOver = function(event, onOrOff){
    event.stopPropagation();
    event.preventDefault();
    this.canvas.highlight(onOrOff);
  }




