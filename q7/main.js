var Amplifier = require("./Amplifier");

var set = new Set();
set.add("5");
set.add("6");
set.add("7");
set.add("8");
set.add("9");

// var set = new Set();
// set.add("0");
// set.add("1");
// set.add("2");
// set.add("3");
// set.add("4");


const getPossibleCombinationsStartingWith = (numStr, set) => {
    var res = [];
    var remainingDigits = getSetOfRemainingDigits(numStr, set);
    var a;
    if (remainingDigits.size==0)    return [numStr];
    
    remainingDigits.forEach((v1, v2, set) => {
        a = getPossibleCombinationsStartingWith(numStr.concat(v1), set);
        res = res.concat(a);
    });
    return res;
}
const getPossibleCombinations = (set) => {
    var arr = getPossibleCombinationsStartingWith("5", set);
    arr = arr.concat(getPossibleCombinationsStartingWith("6", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("7", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("8", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("9", set));
    return arr;
}

const getSetOfRemainingDigits = (numStr, possibleDigitsSet) => {

    var newSet = new Set();
    possibleDigitsSet.forEach((v1, v2, set) => {
        if (numStr.indexOf(v1)==-1) {
            newSet.add(v1);
        }
    });

    return newSet;
}

const getOutputWithNumberString = (numStr, amplifiers) => {
    var prevOutput = 0;
    var amplifier;
    for (var i in numStr) {
        amplifier = amplifiers[i];
        prevOutput = amplifier.runWithInput([numStr[i], prevOutput]);
        // console.log(`prevOutput: ${prevOutput}`);
    }
    return prevOutput;
}

const getOutputWithNumberStringV2 = (numStr, amplifiers) => {
    var prevOutput = 0;
    var amplifier;

    while (!areAllAmplifiersHalted()) {
        for (var i=0; i<numStr.length; i++) {
            amplifier = amplifiers[i];
            // console.log(`numStr: ${numStr}, i: ${i}, ${amplifier}`);
            prevOutput = amplifier.runWithInput([numStr[i], prevOutput]);
            // console.log(`prevOutput: ${prevOutput}`);
        }
        
        // for (var i in numStr) {
        //     console.log(`i: ${i}`);
        //     amplifier = amplifiers[i];
        //     prevOutput = amplifier.runWithInput([numStr[i], prevOutput]);
        //     // console.log(`prevOutput: ${prevOutput}`);
        // }
    }

    return prevOutput;
}

const areAllAmplifiersHalted = () => {
    var amp;
    for (var i in amplifiers){
        amp = amplifiers[i];
        if (!amp.isAmplifierHalted())   return false;
    }
    return true;
}

const part1 = () => {
    var arr = getPossibleCombinations(set);
    var numStr;
    var output;
    var resArray = [];
    for (var i in arr) {
        numStr = arr[i];
        output = getOutputWithNumberStringV2(numStr, amplifiers);
        resArray.push(output);
        // resetAmplifier();
    }


    return Math.max(...resArray);
}

const resetAmplifier = () => {
    for (var i in amplifiers) {
        amplifiers[i].resetPointer();
    }
}

var amplifiers = [];
amplifiers.push(new Amplifier("A"));
amplifiers.push(new Amplifier("B"));
amplifiers.push(new Amplifier("C"));
amplifiers.push(new Amplifier("D"));
amplifiers.push(new Amplifier("E"));


var ampA = amplifiers[0];
var ampB = amplifiers[1];
var ampC = amplifiers[2];
var ampD = amplifiers[3];
var ampE = amplifiers[4];

var n = ampA.runWithInput([0, 9]);
n = ampB.runWithInput([n, 8]);
n = ampC.runWithInput([n, 7]);
n = ampD.runWithInput([n, 6]);
n = ampE.runWithInput([n, 5]);

n = ampA.runWithInput([n]);
// n = ampB.runWithInput([n]);
// n = ampC.runWithInput([n]);
// n = ampD.runWithInput([n]);
// n = ampE.runWithInput([n]);

console.log(n);
// var kk = part1();
// console.log(kk);
