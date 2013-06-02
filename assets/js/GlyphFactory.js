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

    circleElement.setAttribute("fill", this.cumputeColor(dataObject));

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
         + "Manufacturer: " +data.manufacturer+" \n "
         + "Car: " + data.car+" \n "
         + "origin: " +data.origin+" \n "
         + "Horsepower: " +data.horsepower+" \n "
         + "Model year: " + data.modelYear+" \n "
         + "Litre / 100 Km: "+data.OnehndrtKilometersToNLitre.toFixed(1)+" \n "
         + "Miles per gallon: " +data.mpg+" \n "
         + "Acceleration: "+data.acceleration+" \n "
         + "Cylinders: " + data.cylinders+" \n "
         + "Displacement in inch: " + data.displacementInCInch+" \n "
         + "Displacement in ccm: " + data.displacementInCcm+" \n "
         + "Weight in pounds: "+data.weightInPounds+" \n "
         + "Weight in tons: "+data.weightInTons.toFixed(1)+" \n "

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


