var Asteroid = require("./Asteroid");
var Helper = require("./../helper/helper");

const INFINITY = "Infinity";
const NEGATIVE_INIFINITY = "-Infinity";

const go = async () => {

    try {
        var asteroids = await getAListOfAsteroids();

        part1(asteroids);

    } catch (error) {
        console.log(error);
    }
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
    getPart1Answer(asteroids);
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


