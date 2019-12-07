var rangeLow = 265275;
var rangeHigh = 781584;
/////
// var i = rangeLow;
// var c = 0;
// while (i<=rangeHigh){
//     if (doesNumberMeetFacts(i)) {
//         c++;
//         console.log("%d: %d", i, true);
//     } else {
//         console.log("%d: %d", i, false);
//     }

//     i++;
// }

// console.log(c);
/////

var m = new Map();
m.set(0, 1);
m.set(1, 4);
m.set(2, 1);
m.set(3, 2);
m.set(4, 1);
// m.set(5, 1);
discardNonRepeatDigit(m);
console.log(m);

var n = doesNumberMeetFacts(556666);
console.log(n);

function getDigitFromValue(digit, num){
    var noOfZero = 5 - digit;
    var digitMoveLeftTo = Math.pow(10, noOfZero);

    return Math.floor(num / digitMoveLeftTo) % 10;
}

function addDigitToSet(aSet, aDigit){
    return aSet.add(aDigit);
}

function doesNumberMeetFacts(num){
    var map = new Map();
    var curDigit;
    var prevDigit = 0;

    for (var d=0; d<6; d++){
        curDigit = getDigitFromValue(d, num);
        // map.set(curDigit, true);
        incrementValueInMapWithKey(map, curDigit);
        

        if (d==0)   continue;
        else {
            prevDigit = getDigitFromValue(d-1, num);

            if (!isPrevDigitSmallerThanOrEqualToCurrentDigit(prevDigit, curDigit)) {
                // console.log("condition not met before checking the map");
                return false;
            }
        }
    }
    discardNonRepeatDigit(map);
    // console.log(map);

    // all digits keep increasing
    // now check the set to see if there are 5 or less elements
    // if (map.size==6)    return false;   // all numbers are distinct. Condition not met.
    return doesAdjMatchingConditionMeet(map);
}

function discardNonRepeatDigit(map){
    var keysToBeDelete = [];  
    var key;
    map.forEach((value, key, map) => {
        if (value<2)    keysToBeDelete.push(key);
    });

    for (var i in keysToBeDelete){
        key = keysToBeDelete[i];
        map.delete(key);
    }
}

// this map only stores digits which repeat
function doesAdjMatchingConditionMeet(map){
    if (map.size==1)    return false;    // there is only 1 matching digits (eg 123444)
    if (map.size==3)    return true;    // all numbers repeat once (eg 112233)

    if (map.size>3) throw "Something wrong in the map. It shouldn't have so many key-value pairs!";

    var maxValue = 0;
    var minValueKey = 10;
    var maxValueKey = -1;

    // remaining is size=2
    var prevValue = 0;
    map.forEach((value, key, map) => {
        if (prevValue==value)   return true;    // 
        if (maxValue<value) {
            maxValue = value;
            minValueKey = maxValueKey;
            maxValueKey = key;
        } else {
            minValueKey = key;
        }
    });

    if (maxValueKey <= minValueKey) return true;
    return false;
}

function incrementValueInMapWithKey(map, key){
    if (map.has(key)) {
        var v = parseInt(map.get(key));
        map.set(key, ++v);
    }   
    else map.set(key, 1);
}

function isPrevDigitSmallerThanOrEqualToCurrentDigit(prev, current){
    if (prev>current)   return false;
    return true;
}