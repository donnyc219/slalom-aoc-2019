var Helper = require("./../helper/helper");
var Object = require("./Object");

var readline = Helper.getReadlineInterface("data");
var promise = Helper.getArrayFromReadline(readline);
promise.then(arr => {
    something(arr);
}).catch(err => {
    console.log(err);
});

var fifo = [];

function something(arr) {
    var mapOfObjects = new Map();
    var line;
    var object, center;
    var root;
    var centerOfYOU, centerOfSAN;

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

        if (objectName=="YOU") {
            centerOfYOU = center;
        }  
        else if (objectName=="SAN") centerOfSAN = center;
        linkObjectToCenter(object, center);
    }

    var n = findDistanceFromYouToSan(centerOfYOU, centerOfSAN);
    console.log(n);


    // findNumberOfOrbitsWithObject(root, -1);

    // var c = 0;
    // mapOfObjects.forEach((value, key, map) => {
    //     c += parseInt(value.getTotalDirectIndirectOrbits());
    // });
    // console.log(c);
}

function findDistanceFromYouToSan(centerOfYOU, centerOfSAN){

    var c = 0;
    var currentYou = centerOfYOU, currentSan = centerOfSAN;
    currentSan.setDistanceToOrigin(c);
    currentYou.setDistanceToOrigin(c);
    var nextYou, nextSan;
    var youDone, sanDone;
    youDone = sanDone = false;

    while (true){
        c++;
        nextYou = nextObject(currentYou);
        nextSan = nextObject(currentSan);

        var {meet, distance} = didTheyMeet(nextYou, nextSan, c);

        if (meet) {
            return distance
        } else {
            if (nextSan.getName()!="COM"){
                nextSan.setDistanceToOrigin(c);
                currentSan = nextSan;
            }  
            if (nextYou.getName()!="COM"){
                nextYou.setDistanceToOrigin(c);
                currentYou = nextYou;
            }  
        }

    }

}

function didTheyMeet(next1, next2, c){
    if (next1.getDistanceToOrigin()>-1) {
        return {
            meet: true,
            distance: (parseInt(c) + next1.getDistanceToOrigin())
        }
    } else if (next2.getDistanceToOrigin()>-1) {
        return {
            meet: true,
            distance: (parseInt(c) + next2.getDistanceToOrigin())
        }
    }

    return {
        meet: false,
        distance: -1
    }
}

function nextObject(origin){
    return origin.getCenterItOrbits();
}

function pushObjectsToFIFO(listOfObjects){
    var obj;

    for (var i in listOfObjects) {
        obj = listOfObjects[i];
        if (obj!=null) {
            if (obj.isChecked()==false){
                fifo.push(obj);
                obj.checked();
            }
        }
    }
}

function objectPushed(map, obj){

}

function isObjectPushed(map, obj){
    map.get(obj.getName)
}

function isCenterOfSAN(centerOfSAN, targetCenter){
    return (centerOfSAN==targetCenter);
}

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


