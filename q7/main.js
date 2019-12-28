var Amplifier = require("./Amplifier");






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

    var arr = [];
    set.forEach((v1, v2, set) => {
        arr = arr.concat(getPossibleCombinationsStartingWith(v1, set));
    });
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
            
            // console.log(`name: ${amplifier.getName}, pointer: ${amplifier.getPointer()}`);
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
        resetAmplifier();
    }
    return Math.max(...resArray);
}

const resetAmplifier = () => {
    for (var i in amplifiers) {
        amplifiers[i].resetPointer();
    }
}

// var set = new Set("0", "1", "2", "3", "4");
var set = new Set(["5", "6", "7", "8", "9"]);


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
