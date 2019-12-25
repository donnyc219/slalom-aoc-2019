var data = "3,8,1001,8,10,8,105,1,0,0,21,46,67,76,101,118,199,280,361,442,99999,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,1002,9,5,9,101,5,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";
// var data = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";



var currentPtr = 0;

const upgradeArray = (arr) => {
    arr.getValueOfAddressOfIndex = function(index) {
        var n = this[index];
        return parseInt(this[n]);
    }

    arr.getValueWithMode = function(mode, ptr) {
        ptr = parseInt(ptr);
        if (mode==1) {  // immediate mode
            return parseInt(this[ptr]);
        }
    
        // position mode
        var pos = arr[ptr];
        return parseInt(this[pos]);
    }
}


const handleJumpIfTrue = (arr, ptr, mode1, mode2) => {
    var param1 = arr.getValueWithMode(mode1, ptr+1);
    var param2 = arr.getValueWithMode(mode2, ptr+2);
    var newPtr;
    if (param1!=0) {
        newPtr = param2;
        return newPtr;
    }   
    return ptr+3;
}

const handleJumpIfFalse = (arr, ptr, mode1, mode2) => {
    var param1 = arr.getValueWithMode(mode1, ptr+1);
    var param2 = arr.getValueWithMode(mode2, ptr+2);
    var newPtr;
    if (param1==0) {
        newPtr = param2;
        return newPtr;
    }   
    return ptr+3;

}

const handleLessThan = (arr, ptr, mode1, mode2) => {

    var {param1, param2, param3} = getNext3ParamsWithModesForLessThanAndEqual(arr, ptr, mode1, mode2);

    arr[param3] = (param1<param2)? 1: 0;
    return ptr+4;
}

const handleEquals = (arr, ptr, mode1, mode2) => {

    var {param1, param2, param3} = getNext3ParamsWithModesForLessThanAndEqual(arr, ptr, mode1, mode2);

    arr[param3] = (param1==param2)? 1: 0;
    return ptr+4;
}

const getNext3ParamsWithModesForLessThanAndEqual = (arr, ptr, mode1, mode2) => {
    var param1 = arr.getValueWithMode(mode1, ptr+1);
    var param2 = arr.getValueWithMode(mode2, ptr+2);
    var param3 = arr[ptr+3];
    return {
        param1: param1,
        param2: param2,
        param3: param3
    }
}

const add = (val1, val2) => {
    return parseInt(val1) + parseInt(val2);
}

const multiply = (val1, val2) => {
    return parseInt(val1) * parseInt(val2);
}

const handleInstruction = (arr, ptr, inputs) => {
    // console.log(`instruction: ${arr[ptr]}`);
    var instruction = arr[ptr];
    if (instruction.length>4)   throw "Instruction too long";

    var {opCode, mode1, mode2} = splitInstruction(instruction);

    var val1, val2, newValue, newPtr;
    var finalResult = null;

    switch (opCode) {
        case 1:
        case 2:
            val1 = arr.getValueWithMode(mode1, ptr+1);
            val2 = arr.getValueWithMode(mode2, ptr+2);
            newValue = (opCode==1)? add(val1, val2): multiply(val1, val2);
            var saveToAddress = arr[ptr+3];
            arr[saveToAddress] = newValue;
            newPtr = (ptr+4);
            break;
        case 3:
            handleInput(arr, inputs.shift(), ptr);
            newPtr = (ptr+2);
            break;
        case 4:
            val1 = arr.getValueWithMode(mode1, ptr+1);
            finalResult = val1;
            newPtr = (ptr+2);
            break;
        case 5:
            newPtr = handleJumpIfTrue(arr, ptr, mode1, mode2);
            break;
        case 6:
            newPtr = handleJumpIfFalse(arr, ptr, mode1, mode2);
            break;
        case 7:
            newPtr = handleLessThan(arr, ptr, mode1, mode2);
            break;
        case 8:
            newPtr = handleEquals(arr, ptr, mode1, mode2);
            break;
        case 99:
            newPtr = 99999;
            // console.log(arr);
            break;
        default:
            throw "Something wrong here";
            
    }

    // console.log(`newPtr: ${newPtr}`);
    return {
        arr: arr,
        newPtr: newPtr,
        finalResult: finalResult
    };

    
}

const splitInstruction = (instruction) => {
    var opCode = getLastTwoDigit(instruction);
    var parameter1 = 0;
    var parameter2 = 0;
    var instructionLength = instruction.length;
    if (instruction.length==1 || instruction.length==2) {
        parameter1 = parameter2 = 0;
    } else if (instructionLength==3) {
        parameter1 = 1;
    } else {
        parameter1 = (instruction[1]==="0")?0:1;
        parameter2 = 1;
    }

    // console.log(`instruction: ${instruction}, opCode: ${opCode}, mode1: ${parameter1}, mode2: ${parameter2}`);
    var res = {
        opCode: opCode,
        mode1: parameter1,
        mode2: parameter2
    }

    return res;
}

const getLastTwoDigit = (instruction) => {
    instruction = instruction.toString();
    if (instruction.length<2) {
        return parseInt(instruction);
    }
    return parseInt(instruction.substring(instruction.length-2));
}

const handleInput = (arr, input, ptr) => {
    var saveToAddress = arr[ptr+1];
    arr[saveToAddress] = input;
    return arr;
}


class Amplifier {

    constructor(name) {
        this.name = name;
        this.prepare();
    }

    getName(){
        return this.name;
    }

    prepare() {
        this.arr = data.split(",");
        upgradeArray(this.arr);
    }

    runWithInput(inputs) {

        var arr = this.arr;
        var ptr = 0;
        var res;
        var tempResult;
    
        while (ptr<arr.length) {
            res = handleInstruction(arr, ptr, inputs);
            arr = res.arr;
            ptr = res.newPtr;
            tempResult = (res.finalResult!=null)? res.finalResult: tempResult;
        }
        return tempResult;
    }

}

module.exports = Amplifier;