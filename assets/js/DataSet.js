/*
DataSet class

*/


window.DataSet = DataSet
"use strict"


  function DataSet(dataArrayOfObjects){
    this.data = dataArrayOfObjects
  }

  DataSet.prototype.getObjectArray = function(){
    return this.data
  }

  /**
  usage: dataSet.getObjWithSmallestValueOf('OnehndrtKilometersToNLitre'))
  */
  DataSet.prototype.getObjWithBiggestValueOf = function(field){
    var biggestValueObj = undefined
    var biggestValue = -Infinity
    for(var i = 0; i < this.data.length; i++){
      var currDataObj = this.data[i].getDataObject()
      if(currDataObj[field] > biggestValue){
        biggestValue = currDataObj[field]
        biggestValueObj = currDataObj
      }
    }
    return biggestValueObj;
  }

  DataSet.prototype.getObjWithSmallestValueOf = function(field){
    var smallestValueObj = undefined
    var smallesValue = Infinity
    for(var i = 0; i < this.data.length; i++){
      var currDataObj = this.data[i].getDataObject()
      if(currDataObj[field] < smallesValue){
        smallesValue = currDataObj[field]
        smallestValueObj = currDataObj
      }
    }
    return smallestValueObj;
  }







