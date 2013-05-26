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
      car : this.car,
      manufacturer: this.manufacturer,
      mpg : this.mpg,
      cylinders : this.cylinders,
      displacement : this.displacement,
      horsepower : this.horsepower,
      weight : this.weight,
      acceleration : this.acceleration,
      modelYear : this.modelYear,
      origin : this.origin
    };
  }
  
