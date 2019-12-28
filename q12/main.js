var Helper = require("./../helper/helper");
var Moon = require("./Moon");

// {
//     x: x,
//     y: y,
//     z: z
// }


start();
// test();

function test(){
    var obj1 = {
        x:-1,
        y:0,
        z:2
    };
    var obj2 = {
        x:2,
        y:-10,
        z:-7
    }

    let moon1 = new Moon(obj1, "A");
    let moon2 = new Moon(obj2, "B");
    moon1.updateVelocityWithListOfMoons([moon2]);
}

function start(){
    var readline = Helper.getReadlineInterface("data");
    var arr = Helper.getArrayFromReadline(readline);
    
    arr.then(arr => {
        // return an array of objects that you can use to construct the Moons
        arr = convertRawDataToObjects(arr);
        console.log("input data");
        console.log(arr);

        let moons = getListOfMoons(arr);
        console.log(moons);

        let moon1 = moons[0];
        let n = moon1.updateVelocityWithListOfMoons([moons[1], moons[2], moons[3]]);
        console.log(n);

    

    }).catch(err => {
        console.error("something wrong when calling getArrayFromReadline()");
    });
}

function getListOfMoons(massagedDataList){
    let arr = [];
    for (let i in massagedDataList) {
        arr.push(new Moon(massagedDataList[i], ("Moon-"+i)));
    }
    return arr;
}

function convertRawDataToObjects(rawDataArray){

    var lineOfRawMoonData;
    var arr = [];
    for (var i in rawDataArray) {
        lineOfRawMoonData = rawDataArray[i];
        arr.push(convertALineOfPositionToObjectOfPosition(lineOfRawMoonData));
    }
    return arr;
}

function convertALineOfPositionToObjectOfPosition(rawLine){

    var rawPositions = rawLine.split(", ");
    var arr = [];
    for (var i in rawPositions) {
        arr.push(rawPositions[i].split("=")[1]);
    }
    return {
        x: arr[0],
        y: arr[1],
        z: arr[2].slice(0, -1)
    }
}

