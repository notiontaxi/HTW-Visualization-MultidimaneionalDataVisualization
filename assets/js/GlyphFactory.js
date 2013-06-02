/*
GlyphType2 class

*/


window.GlyphFactory = GlyphFactory; 
"use strict";


  function GlyphFactory(){
    this.svgns = "http://www.w3.org/2000/svg"
    this.container = $("#canvas-overlay")
  }


  GlyphFactory.prototype.getSvgContainer = function() {
    return this.mySvg
  }


  GlyphFactory.prototype.reset = function() {
    this.container.empty();
  }

  GlyphFactory.prototype.createGlyph = function(dataObject, mode) {

    var glyph = document.createElement("div")
    $(glyph).css("width", "20px")
    $(glyph).css("height", "20px")

    $(glyph).addClass("glyph");

    mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    mySvg.setAttribute("version", "1.2");
    mySvg.setAttribute("baseProfile", "tiny"); 

    circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleElement.setAttribute("r", 10);
    circleElement.setAttribute("cx",10);
    circleElement.setAttribute("cy",10);

    circleElement.setAttribute("fill", "#336699");

    mySvg.appendChild(circleElement)
    glyph.appendChild(mySvg)

    this.container.append(glyph)

    shape = document.createElementNS(this.svgns, "polygon")
    shape.setAttributeNS(null, "points", "5,5 45,45 5,45")
    shape.setAttributeNS(null, "fill", "red")
    shape.setAttributeNS(null, "stroke", "red")

    this.addHover(glyph, dataObject)
    return glyph
}

  GlyphFactory.prototype.addHover = function(element, data){
    var text = ""
         + "Litre / 100 Km: "+data.OnehndrtKilometersToNLitre.toFixed(1)+" \n "
         + "Acceleration: "+data.acceleration+" \n "
         + "Car: " + data.car+" \n "
         + "Cylinders: " + data.cylinders+" \n "
         + "Displacement in inch: " + data.displacementInCInch+" \n "
         + "Displacement in ccm: " + data.displacementInCcm+" \n "
         + "Horsepower: " +data.horsepower+" \n "
         + "Manufacturer: " +data.manufacturer+" \n "
         + "Model year: " + data.modelYear+" \n "
         + "Miles per gallon: " +data.mpg+" \n "
         + "origin: " +data.origin+" \n "
         + "Weight in pounds: "+data.weightInPounds+" \n "
         + "Weight in tons: "+data.weightInTons.toFixed(1)+" \n "

    $(element).attr("title", text)
    $(element).tooltip(
      {
        content: function() {return $(this).attr("title");}
      })

  }


