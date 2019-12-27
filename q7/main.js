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
    var k = 0;

    while (!areAllAmplifiersHalted()) {
        for (var i=0; i<numStr.length; i++) {
            amplifier = amplifiers[i];
            // console.log(`name: ${amplifier.getName()}, pointer: ${amplifier.getPointer()}`);
            // console.log(`numStr: ${numStr}, i: ${i}, ${amplifier}`);
            if (k==0)
                prevOutput = amplifier.runWithInput([numStr[i], prevOutput]);
            else
                prevOutput = amplifier.runWithInput([prevOutput]);
            // console.log(`prevOutput: ${prevOutput}`);
            amplifiers[i] = amplifier;
        }
        k++;
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

const part1 = (amplifiers) => {
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


// var ampA = amplifiers[0];
// var ampB = amplifiers[1];
// var ampC = amplifiers[2];
// var ampD = amplifiers[3];
// var ampE = amplifiers[4];

// var n = ampA.runWithInput([9, 0]);
// n = ampB.runWithInput([7, n]);
// n = ampC.runWithInput([8, n]);
// n = ampD.runWithInput([5, n]);
// n = ampE.runWithInput([6, n]);

// console.log(`output after 5 amps: ${n}`);
// n = ampA.runWithInput([n]);
// n = ampB.runWithInput([n]);
// n = ampC.runWithInput([n]);
// n = ampD.runWithInput([n]);
// n = ampE.runWithInput([n]);

var kk = part1(amplifiers);
console.log(kk);
