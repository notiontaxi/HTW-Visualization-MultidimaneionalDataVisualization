/*
CarData class

*/


window.CarData = CarData; 
"use strict";


  function CarData(arrayWithData){
    this.setData(arrayWithData);
  }

  CarData.prototype.getDataObject = function(){
    return this.dataArray;
  }

  CarData.prototype.setData = function(arrayWithData){
    this.car = arrayWithData[0];
    this.manufacturer = arrayWithData[1];
    this.mpg = arrayWithData[2];
    this.cylinders = arrayWithData[3];
    this.displacement = arrayWithData[4];
    this.horsepower = arrayWithData[5];
    this.weight = arrayWithData[6];
    this.acceleration = arrayWithData[7];
    this.modelYear = arrayWithData[8];
    this.origin = arrayWithData[9];

    this.dataArray = {
      car: this.car == 'NA'? undefined : this.car
      , cylinders: parseInt(this.cylinders)
      , manufacturer: this.manufacturer == 'NA'? undefined : this.manufacturer
      , mpg: parseFloat(this.mpg)
      , OnehndrtKilometersToNLitre : 235/this.mpg
      , displacementInCcm : this.displacement*16.384
      , displacementInCInch: this.displacement
      , horsepower : parseFloat(this.horsepower)
      , weightInTons : this.weight*0.0004536
      , weightInPounds: this.weight
      , acceleration : parseFloat(this.acceleration)
      , modelYear : parseInt(this.modelYear)
      , origin : this.origin == 'NA'? undefined : this.origin
    };
  }
  
