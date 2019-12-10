var Helper = require("./../helper/helper");
var Object = require("./Object");

var readline = Helper.getReadlineInterface("data");
var promise = Helper.getArrayFromReadline(readline);
promise.then(arr => {
    something(arr);
}).catch(err => {
    console.log(err);
});


function something(arr) {

    var line, objectCenter;
    var mapOfObjects = new Map();

    for (var i in arr) {
        line = arr[i];
        objectCenter = splitLineToXOrbitsY(line);
    }

}

function getObjectFromMap(map, key){
    if (map.has(key))   return map.get(key);
    return null;
}

function splitLineToXOrbitsY(line){
    var arr = line.toString().split(")");
    return {
        object: arr[1],
        center: arr[0]
    };
}


