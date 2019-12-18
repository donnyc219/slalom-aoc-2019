var Asteroid = require("./Asteroid");
var Helper = require("./../helper/helper");

const INFINITY = "Infinity";
const NEGATIVE_INIFINITY = "-Infinity";

const go = async () => {

    try {
        var asteroids = await getAListOfAsteroids();

        var myAsteroid = part1(asteroids);

        part2(asteroids, myAsteroid);


    } catch (error) {
        console.log(error);
    }
}

const getAngleInDegree = (center, point) => {
    var {x, y} = point;
    x -= center.x;
    y = center.y - point.y;

    // console.log(`${point.x}, ${point.y} changed to ${x}, ${y}`);

    var rad = Math.atan(x/y);
    var degree = toDegree(rad);
    if (y<0)    return (180 + degree);
    else if (x<0 && y>=0)    return (360 + degree);

    return degree;
}

const toDegree = (radian) => {
    return radian * (180/Math.PI);
}

const part2 = (asteroids, myAsteroid) => {

    console.log(asteroids.length);
    var map = getMapOfAsteroidsGroupedWithAngle(asteroids, myAsteroid);
    
    var sortedAngles = getSortedArrayOfAngle(map);
    map = sortAsteroidsByDistance(map);
    var sortedAngles = getArrayOfSortedDistance(map, sortedAngles);
    pop(sortedAngles, 200);
    // console.log(sortedAngles);

    
    // console.log("---------------------");
    // console.log(sortedAngles);

    
}

const pop = (arr, num) => {
    var length = 0;
    for (var i in arr) {
        length += arr[i].length;
        console.log(`${i}: ${arr[i].length}`);

    }
    if (num>length) throw "Number too big. Not able to pop this element";

    var subarray;
    for (var i=0; i<num; i++) {
        subarray = getNextAvailableAsteroidOnOrAfterIndex(i, arr);
        // console.log(subarray);
        console.log(`${i}: ${subarray.asteroid.getID()}`);
    }
}

const getNextAvailableAsteroidOnOrAfterIndex = (i, array) => {
    var arr;
    var length = array.length;

    i = i%length;

    while (true) {
        arr = array[i];
        if (arr==null || arr.length==0) {
            i = (++i)%length;
        } else {
            // console.log(i);
            var asteroid = arr.shift();
            return asteroid;
        }

    }
}

const getArrayOfSortedDistance = (map, arr) => {

    for (var key in arr) {
        arr[key] = map.get(arr[key]);
    }
    return arr;
}

const getSortedArrayOfAngle = (map) => {
    var arr = Array.from(map.keys());
    arr.sort((a, b) => {
        return a - b;
    });
    return arr;
}

const sortAsteroidsByDistance = (map) => {
    var arr;
    map.forEach((value, key, map) => {
        arr = sortSingleArrayOfAsteroids(value);
        map.set(key, arr);
    }); 
    return map;
}

const sortSingleArrayOfAsteroids = (arr) => {
    arr.sort((a, b) => {
        return a.distance - b.distance;
    });
    // console.log(arr);
    return arr;
}

const getMapOfAsteroidsGroupedWithAngle = (asteroids, myAsteroid) => {
    var angle, distance;
    var map = new Map();

    for (var i in asteroids) {
        asteroid = asteroids[i];
        if (asteroid.same(myAsteroid))  continue;

        myAsteroid.distanceTo(asteroid);
        angle = getAngleInDegree(myAsteroid.getPoints(), asteroid.getPoints());
        angle = roundToFiveDecimal(angle);

        distance = myAsteroid.distanceTo(asteroid);
        distance = roundToFiveDecimal(distance);

        addInfoToMap(map, distance, angle, asteroid);
    }
    return map;
}

const addInfoToMap = (map, distance, angle, asteroid) => {
    var arr;
    if (map.has(angle)) {
        arr = map.get(angle);
    } else {
        arr = [];
    }

    var newObject = {
        asteroid: asteroid,
        distance: distance
    }
    arr.push(newObject);
    map.set(angle, arr);
}

const part1 = (asteroids) => {
    var asteroid, checkAsteroid;
    for (var i in asteroids) {
        asteroid = asteroids[i];

        for (var k in asteroids) {
            checkAsteroid = asteroids[k];
            if (asteroid.same(checkAsteroid)) {
                continue;
            } else {
                var slope = asteroid.slopeWith(checkAsteroid);
                addSlope(slope, asteroid, checkAsteroid);
            }
        }
    }
    return getPart1Answer(asteroids);

}

const addSlope = (slope, asteroid, checkAsteroid) => {
    var roundedStr = roundToFiveDecimal(parseFloat(slope));
    var prefix;
    if (slope==INFINITY || slope==NEGATIVE_INIFINITY) {
        asteroid.addSlope(slope);
    } else {
        prefix = (asteroid.onMyLeft(checkAsteroid))?"left-": "right-";
        asteroid.addSlope(prefix + roundedStr);
    }
}

const getPart1Answer = (asteroids) => {
    var max = 0;
    var asteroid;
    var targetIndex;

    for (var i in asteroids) {
        asteroid = asteroids[i];
        if (asteroid.getSizeOfSet() > max) {
            max = asteroid.getSizeOfSet();
            targetIndex = i;
        }
    }
    console.log(`${asteroids[targetIndex].getID()}: ${asteroids[targetIndex].getSizeOfSet()}`);
    return asteroids[targetIndex];
}

const roundToFiveDecimal = (num) => {
    return num.toFixed(5);
}
const getAListOfAsteroids = async () => {

    try {
        var row = 0, col = 0;;
        var data = await Helper.readFile('data');
        var asteroid;
        var listOfAsteroids = [];

        for (const ch of data){
            if (ch===".") {
                col++;
                continue;
            } else if (ch==="\n") {
                row++;
                col = 0;
            } else {
                asteroid = new Asteroid(col, row);
                listOfAsteroids.push(asteroid);
                col++;
            }
  
        }
        return listOfAsteroids;
    } catch (err) {
        console.log(err);
    }
    

}

go();


