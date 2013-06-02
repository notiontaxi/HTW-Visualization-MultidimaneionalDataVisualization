/*
GlyphType2 class

*/


window.GlyphFactory = GlyphFactory; 
"use strict";


  function GlyphFactory(){
    this.svgns = "http://www.w3.org/2000/svg"
    this.container = $("#canvas-overlay")
    this.createColors()

  }


  GlyphFactory.prototype.getSvgContainer = function() {
    return this.mySvg
  }


  GlyphFactory.prototype.reset = function() {
    this.container.empty();
  }

  GlyphFactory.prototype.createGlyph = function(dataObject, mode) {

    if(mode == 'manufacturing-action' || mode == 'origin-action')
      return this.glyphTypeOne(dataObject)
    else
      return this.glyphTypeTwo(dataObject)
}

  GlyphFactory.prototype.glyphTypeOne = function(dataObject){
    var glyph = document.createElement("div")
    $(glyph).addClass("glyph");
    //glyph.innerHTML = 8
    $(glyph).css("width", "20px")
    $(glyph).css("height", "20px")
    
    if(!isNaN(dataObject.modelYear))
      glyph.innerHTML = dataObject.modelYear

    mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $(mySvg).addClass("inner-svg");
    $(mySvg).css("z-index",'-1');
    mySvg.setAttribute("version", "1.2");
    mySvg.setAttribute("baseProfile", "tiny"); 

    $(mySvg).css('position', 'relative')
    $(mySvg).css('top', '-25px')
    $(mySvg).css('left', '-3px')

    if(dataObject.origin == 'American'){
      shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      shape.setAttribute("r", 10);
      shape.setAttribute("cx",10);
      shape.setAttribute("cy",10);
    }else if(dataObject.origin == 'European'){
      shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      shape.setAttributeNS(null, "x", "0");
      shape.setAttributeNS(null, "y", "0");
      shape.setAttributeNS(null, "width", "20");
      shape.setAttributeNS(null, "height", "20");     
    }else{
      shape = document.createElementNS(this.svgns, "polygon")
      shape.setAttributeNS(null, "points", "10,0 20,20 0,20")
      $(mySvg).css('top', '-28px')
    }

    shape.setAttribute("fill", this.cumputeColor(dataObject));



    mySvg.appendChild(shape)
    glyph.appendChild(mySvg)

    this.container.append(glyph)




    this.addHover(glyph, dataObject)

    return glyph
  }

  GlyphFactory.prototype.glyphTypeTwo = function(dataObject){
    var glyph = document.createElement("div")
    $(glyph).addClass("glyph");
    
    
    $(glyph).css("height", "15px")
    
    
    if(!isNaN(dataObject.cylinders)){

      var cylinders = '|'
      for(var i = 1; i < dataObject.cylinders; i++)
        if(i%4 == 0)
          cylinders += '.|'
        else
          cylinders += '|'

        var width = 13 + 4 * dataObject.displacementInCcm/1000
      }else{
        var cylinders = '?'
        var width = 13
      }
      $(glyph).css("width", width+"px")
      glyph.innerHTML = cylinders

    mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $(mySvg).addClass("inner-svg");
    $(mySvg).css("z-index",'-1');
    mySvg.setAttribute("version", "1.2");
    mySvg.setAttribute("baseProfile", "tiny"); 

    $(mySvg).css('position', 'relative')
    $(mySvg).css('top', '-26px')
    $(mySvg).css('left', '0px')

    shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    shape.setAttributeNS(null, "x", "0");
    shape.setAttributeNS(null, "y", "0");
    shape.setAttributeNS(null, "width", width);
    shape.setAttributeNS(null, "height", "20");     

    shape.setAttribute("fill", this.cumputeColor(dataObject));

    mySvg.appendChild(shape)
    glyph.appendChild(mySvg)

    this.container.append(glyph)

    


    this.addHover(glyph, dataObject)

    return glyph
  }

  GlyphFactory.prototype.addHover = function(element, data){
    var text = ""
         + "Manufacturer: " +data.manufacturer+" \n "
         + "| Car: " + data.car+" \n "
         + "| origin: " +data.origin+" \n "
         + "| Horsepower: " +data.horsepower+" \n "
         + "| Model year: " + data.modelYear+" \n "
         + "| Litre / 100 Km: "+data.OnehndrtKilometersToNLitre.toFixed(1)+" \n "
         + "| Miles per gallon: " +data.mpg+" \n "
         + "| Acceleration: "+data.acceleration+" \n "
         + "| Cylinders: " + data.cylinders+" \n "
         + "| Displacement in inch: " + data.displacementInCInch+" \n "
         + "| Displacement in ccm: " + data.displacementInCcm+" \n "
         + "| Weight in pounds: "+data.weightInPounds+" \n "
         + "| Weight in tons: "+data.weightInTons.toFixed(1)+" \n "

    $(element).attr("title", text)
    $(element).tooltip(
      {
        content: function() {return $(this).attr("title");}
      })

  }

  GlyphFactory.prototype.cumputeColor = function(dataObject){

    val = Math.round(dataObject.OnehndrtKilometersToNLitre);
    if(isNaN(val))
      return '#FFFFFF'

    if(val > 35)
      return this.colors[0]

    return this.colors[this.colors.length - val - 4]

  }

  GlyphFactory.prototype.createColors = function(dataObject){
    this.colors = Array(
      '#FF0000'
      , '#FF1000'
      , '#FF2000'
      , '#FF3000'
      , '#FF4000'
      , '#FF5000'
      , '#FF6000'
      , '#FF7000'
      , '#FF8000'
      , '#FF9000'
      , '#FFA000'
      , '#FFB000'
      , '#FFC000'
      , '#FFD000'
      , '#FFE000'
      , '#FFF000'
      , '#FFFF00'
      , '#F0FF00' 
      , '#E0FF00'
      , '#D0FF00'
      , '#C0FF00'
      , '#B0FF00'
      , '#A0FF00'
      , '#90FF00'
      , '#80FF00'
      , '#70FF00'
      , '#60FF00'
      , '#50FF00'
      , '#40FF00'
      , '#30FF00'
      , '#20FF00'
      , '#10FF00'
    )

  }


