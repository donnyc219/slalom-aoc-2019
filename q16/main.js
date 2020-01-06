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

function getLastDigitOf(n) {
    return Math.abs(parseInt(n)%10);
}

function getDigitNWithMask(mask, inputArray, n) {
    let submask = mask[n];
    if (submask.length!=inputArray.length)  throw "length of submask and inputArray do not match!";

    let sum = 0;
    let digit, maskDigit;
    for (let i in inputArray) {
        digit = parseInt(inputArray[i]);
        maskDigit = submask[i];
        sum += maskDigit * digit;
    }
    return getLastDigitOf(sum);
}

function operatePhase(inputArray, mask) {
    let res = "";
    for (let i=0; i<inputArray.length; i++) {
        res += getDigitNWithMask(mask, inputArray, i).toString();
    }
    return res;
}

function getFirstNDigitOf(num, n) {
    let numStr = num.toString();
    return numStr.substring(0, n);
}

function part1() {
    // let inputArray = "59762574510031092870627555978901048140761858379740610694074091049186715780458779281173757827279664853239780029412670100985236587608814782710381775353184676765362101185238452198186925468994552552398595814359309282056989047272499461615390684945613327635342384979527937787179298170470398889777345335944061895986118963644324482739546009761011573063020753536341827987918039441655270976866933694280743472164322345885084587955296513566305016045735446107160972309130456411097870723829697443958231034895802811058095753929607703384342912790841710546106752652278155618050157828313372657706962936077252259769356590996872429312866133190813912508915591107648889331";
    let inputArray = "12345678";
    let basePatternArray = [0,1,0,-1];
    let mask = buildBasePatternMaskForAllInput(inputArray, basePatternArray);
    
    let res = inputArray;
    let max = 4;
    for (let i=0; i<max; i++) {
        res = operatePhase(res, mask);
        // console.log(`${i}: ${res}`);
    }
    return getFirstNDigitOf(res, 8);
}

let n = part1();
console.log(n);



