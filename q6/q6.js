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
    var mapOfObjects = new Map();
    var line;
    var object, center;
    var root;

    for (var i in arr) {
        line = arr[i];
        var {objectName, centerName} = splitLineToXOrbitsY(line);
        object = getObjectFromMap(mapOfObjects, objectName);
        center = getObjectFromMap(mapOfObjects, centerName);

        if (object==null) {
            object = new Object(objectName);
            mapOfObjects.set(objectName, object);
        }
        if (center==null) {
            center = new Object(centerName);
            mapOfObjects.set(centerName, center);
            if (centerName=="COM") {
                root = center; 
            }
        }
        linkObjectToCenter(object, center);
    }

    // findTotalNumberOfOrbitsWithRoot(root);
    findNumberOfOrbitsWithObject(root, -1);

    var c = 0;
    mapOfObjects.forEach((value, key, map) => {
        c += parseInt(value.getTotalDirectIndirectOrbits());
    });
    console.log(c);
}

/*
function findTotalNumberOfOrbitsWithRoot(root){
    root.setNumberOfTotalOrbits(0);
    var listOfObjects = root.getListOfObjectOrbitingIt();
    var obj;
    for (var i in listOfObjects) {
        obj = listOfObjects[i];
        findNumberOfOrbitsWithObject(obj, 0);
    }
}
*/

function findNumberOfOrbitsWithObject(obj, prevNumOfOrbits){
    obj.setNumberOfTotalOrbits(++prevNumOfOrbits);
    var listOfObjects = obj.getListOfObjectOrbitingIt();
    var childObject;
    for (var i in listOfObjects) {
        childObject = listOfObjects[i];
        findNumberOfOrbitsWithObject(childObject, prevNumOfOrbits);
    }

}

function linkObjectToCenter(object, center){
    object.orbitsToCenter(center);
    center.addObject(object);
}

function getObjectFromMap(map, key){
    if (map.has(key))   return map.get(key);
    return null;
}

function splitLineToXOrbitsY(line){
    var arr = line.toString().split(")");
    return {
        objectName: arr[1],
        centerName: arr[0]
    };
}


