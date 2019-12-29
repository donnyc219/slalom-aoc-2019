var Helper = require("./../helper/helper");
var Moon = require("./Moon");

// {
//     x: x,
//     y: y,
//     z: z
// }


part1();
// part2();
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

function part2(){
    var readline = Helper.getReadlineInterface("data");
    var arr = Helper.getArrayFromReadline(readline);
    
    arr.then(arr => {
        // return an array of objects that you can use to construct the Moons
        let objects1 = convertRawDataToObjects(arr);
        let objects2 = convertRawDataToObjects(arr);
        console.log("input data");
        console.log(arr);

        let moons = getListOfMoons(objects1);
        const initialMoons = getListOfMoons(objects2);

        console.log("initial state");
        console.log(initialMoons);
        console.log("===============")

        let i=0;
        while (true) {
            moons = runIteration(moons);
            if (areAllMoonsInSameState(moons, initialMoons))    break;
            i++;
        }

        // let steps = 10;
        // for (let i=0; i<steps; i++) {
        //     moons = runIteration(moons);
        // }

        console.log(moons);
        console.log(initialMoons);

        console.log(i+1);

    }).catch(err => {
        console.error("something wrong when calling getArrayFromReadline()");
    });

}

function areAllMoonsInSameState(moons, initialMoons){

    let a, b;
    for (let i in moons) {
        a = moons[i];
        b = initialMoons[i];
        
        if (!sameState(a, b))   return false;
    }
    return true;
}

function sameState(moon1, moon2) {

    for (let i in moon1.position) {
        if (moon1.position[i]!=moon2.position[i] || moon1.velocity[i]!=moon2.velocity[i])   return false;
    }
    return true;
}

function part1(){
    var readline = Helper.getReadlineInterface("data");
    var arr = Helper.getArrayFromReadline(readline);
    
    arr.then(arr => {
        // return an array of objects that you can use to construct the Moons
        arr = convertRawDataToObjects(arr);
        console.log("input data");
        console.log(arr);

        let moons = getListOfMoons(arr);

        let steps = 1000;
        for (let i=0; i<steps; i++) {
            moons = runIteration(moons);
        }
        
        console.log(getTotalEnergyOfAllMoons(moons));


    }).catch(err => {
        console.error("something wrong when calling getArrayFromReadline()");
    });
}

function getTotalEnergyOfAllMoons(moons) {
    let sum = 0;
    for (let i in moons) {
        sum += moons[i].getTotalEnergy();
    }
    return sum;
}

function runIteration(moons){

    for (let i in moons) {
        // let moon = moons[i];
        moons[i].updateVelocityWithListOfMoons(moons);
    }
    for (let i in moons) {
        // let moon = moons[i];
        moons[i].updatePositionAfterVelocityUpdated();
        // console.log(moons[i]);
    }
    return moons;
}

function getListOfMoons(massagedDataList){
    let res = [];
    for (let i in massagedDataList) {
        res.push(new Moon(massagedDataList[i], (i)));
    }
    return res;
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
        x: parseInt(arr[0]),
        y: parseInt(arr[1]),
        z: parseInt(arr[2].slice(0, -1))
    }
}

