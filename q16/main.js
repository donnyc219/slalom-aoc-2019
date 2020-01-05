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
    let repeat = calDigit;
    let res = [];
    let ptr = 0;
    let value;
    while (res.length < inputArray.length) {
        value = basePatternArray[ptr];
        res = pushValueNTimes(res, value, repeat);

        if (ptr==0) repeat++;
        ptr = incrementPointerWithinBound(ptr, basePatternArray.length);
    }
    res = res.slice(0, inputArray.length);
    return res;
}

function buildBasePatternMaskForAllInput(inputArray, basePatternArray) {
    let res = [];
    for (let i in inputArray) {
        res.push(buildBasePatternMaskForDigit(i, inputArray, basePatternArray));
    }
    return res;
}

let inputArray = [1,2,3,4,5,6,7,8];
let basePatternArray = [0,1,0,-1];

let n = buildBasePatternMaskForAllInput(inputArray, basePatternArray);
console.log(n);
