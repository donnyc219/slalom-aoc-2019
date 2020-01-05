function pushValueNTimes(array, value, times) {
    for (let i=0; i<times; i++) {
        array.push(value);
    }
    return array;
}

function incrementPointerWithinBound(ptr, notMoreThanLength) {
    ptr++;
    if (ptr=>notMoreThanLength) return (ptr%notMoreThanLength);
    return ptr;
}

function buildBasePatternMaskForDigit(calDigit, inputArray, basePatternArray) {
    let repeat = parseInt(calDigit)+1;
    let res = [];
    let ptr = 0;
    let value;
    
    while (res.length < (inputArray.length+1)) {
        value = basePatternArray[ptr];
        res = pushValueNTimes(res, value, repeat);

        ptr = incrementPointerWithinBound(ptr, basePatternArray.length);
    }
    res = res.slice(1, inputArray.length+1);
    return res;
}

function buildBasePatternMaskForAllInput(inputArray, basePatternArray) {
    let res = [];
    for (let i in inputArray) {
        res.push(buildBasePatternMaskForDigit(i, inputArray, basePatternArray));
    }
    return res;
}

let inputArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];
let basePatternArray = [0,1,0,-1];

let n = buildBasePatternMaskForAllInput(inputArray, basePatternArray);
console.log(n);
