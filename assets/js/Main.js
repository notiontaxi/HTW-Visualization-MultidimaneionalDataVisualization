$(function() {

  // workaround for older safari versions
  if(!Function.prototype.bind){
    Function.prototype.bind = function (bind) {
        var self = this;
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return self.apply(bind || null, args);
        };
    };    
  }




  var canvas = new window.Canvas('myCanvas');
  var coordSys = new window.CoordinateSystem();
  var fileReader = new window.FileProcessor();
  var gui = new window.Gui(canvas, fileReader, coordSys);

  gui.start()

});