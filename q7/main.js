var Amplifier = require("./Amplifier");

// var set = new Set();
// set.add("5");
// set.add("6");
// set.add("7");
// set.add("8");
// set.add("9");

var set = new Set();
set.add("0");
set.add("1");
set.add("2");
set.add("3");
set.add("4");


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
    var arr = getPossibleCombinationsStartingWith("0", set);
    arr = arr.concat(getPossibleCombinationsStartingWith("1", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("2", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("3", set));
    arr = arr.concat(getPossibleCombinationsStartingWith("4", set));
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
    }
    return prevOutput;
}

const part1 = () => {
    var arr = getPossibleCombinations(set);
    var numStr;
    var output;
    var resArray = [];
    for (var i in arr) {
        numStr = arr[i];
        output = getOutputWithNumberString(numStr, amplifiers);
        resArray.push(output);
    }
    return Math.max(...resArray);
}

var amplifiers = [];
amplifiers.push(new Amplifier("A"));
amplifiers.push(new Amplifier("B"));
amplifiers.push(new Amplifier("C"));
amplifiers.push(new Amplifier("D"));
amplifiers.push(new Amplifier("E"));





var kk = part1();
console.log(kk);
