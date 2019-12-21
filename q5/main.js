

var data = "3,225,1,225,6,6,1100,1,238,225,104,0,1101,65,73,225,1101,37,7,225,1101,42,58,225,1102,62,44,224,101,-2728,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1,69,126,224,101,-92,224,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1102,41,84,225,1001,22,92,224,101,-150,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,80,65,225,1101,32,13,224,101,-45,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,1101,21,18,225,1102,5,51,225,2,17,14,224,1001,224,-2701,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,101,68,95,224,101,-148,224,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,12,22,225,102,58,173,224,1001,224,-696,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,1002,121,62,224,1001,224,-1302,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,359,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,374,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,389,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,404,101,1,223,223,7,226,677,224,1002,223,2,223,1005,224,419,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,434,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,449,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,464,101,1,223,223,1107,226,226,224,102,2,223,223,1006,224,479,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,494,101,1,223,223,108,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,524,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,539,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,569,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,584,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,599,1001,223,1,223,1008,677,677,224,1002,223,2,223,1005,224,614,101,1,223,223,1107,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,1108,677,226,224,1002,223,2,223,1005,224,644,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,659,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,674,101,1,223,223,4,223,99,226";

const upgradeArray = (arr) => {
    arr.getValueOfAddressOfIndex = function(index) {
        var n = this[index];
        return this[n];
    }
}
const part1 = () => {

    var arr = data.split(",");
    upgradeArray(arr);

    console.log(`arr length: ${arr.length}`);
    var input = 1;
    var output;

    var ptr = 0;
    var digit;
    while (ptr<arr.length) {
        digit = arr[ptr];
        switch (digit) {
            case "1":
                arr = handleNormalCase(arr, ptr, add);
                ptr += 4;
            break;
            case "2":
                arr = handleNormalCase(arr, ptr, multiply);
                ptr += 4;
            break;
            case "3":
                handleInput(arr, input, ptr);
                ptr += 2;
            break;
            case "4":
                output = arr.getValueOfAddressOfIndex(ptr+1);
                console.log(`output: ${output}`);
                ptr += 2;
            break;
            case "99":
                console.log("halt!");
                console.log(`pointer = ${ptr}`);
                return ;
            default:
                var res = handleInstruction(arr, ptr);
                ptr = res.newPtr;
                arr = res.arr;
            break;
        }
    }

}

const getValueWithMode = (arr, mode, ptr) => {
    if (mode==1) {  // immediate mode
        return arr[ptr];
    }

    // position mode
    var pos = arr[ptr];
    return arr[pos];
}

const add = (val1, val2) => {
    return parseInt(val1) + parseInt(val2);
}

const multiply = (val1, val2) => {
    return parseInt(val1) * parseInt(val2);
}

// return the how many the pointer should increment
const handleInstruction = (arr, ptr) => {
    var instruction = arr[ptr];
    if (instruction.length>4)   throw "Instruction too long";

    var {opCode, mode1, mode2} = splitInstruction(instruction);

    var val1, val2, newValue;
    switch (opCode) {
        case 1:
        case 2:
            val1 = getValueWithMode(arr, mode1, ptr+1);
            val2 = getValueWithMode(arr, mode2, ptr+2);
            newValue = (opCode==1)? add(val1, val2): multiply(val1, val2);
            var saveToAddress = arr[ptr+3];
            arr[saveToAddress] = newValue;
            return {
                arr: arr,
                newPtr: (ptr+4)
            }
        case 3:
            throw "Requesting an input?";
        case 4:
            val1 = arr[ptr+1];
            console.log(val1);
            return {
                arr: arr,
                newPtr: (ptr+2)
            }
    }

    throw "Something wrong here";
}

const splitInstruction = (instruction) => {
    var opCode = getLastTwoDigit(instruction);
    var parameter1 = 0;
    var parameter2 = 0;
    var instructionLength = instruction.length;
    if (instructionLength==3)   parameter1 = 1;
    else {
        parameter1 = (instruction[1]==="0")?0:1;
        parameter2 = 1;
    }

    var res = {
        opCode: opCode,
        mode1: parameter1,
        mode2: parameter2
    }
    // console.log(instruction);
    // console.log(`splitInstruction: ${JSON.stringify(res)}`);

    return res;
}

const getLastTwoDigit = (instruction) => {
    instruction = instruction.toString();
    if (instruction.length<2)   throw "Instruction too short. Cannot get the last 2 digits";
    return parseInt(instruction.substring(instruction.length-2));
}

const handleNormalCase = (arr, ptr, handler) => {
    var val1 = arr.getValueOfAddressOfIndex(ptr+1);
    var val2 = arr.getValueOfAddressOfIndex(ptr+2);
    var newValue = handler(val1, val2);
    var saveToAddress = arr[ptr+3];
    arr[saveToAddress] = newValue;
    return arr;
}

const handleInput = (arr, input, ptr) => {
    var saveToAddress = arr[ptr+1];
    arr[saveToAddress] = input;
    return arr;
}

const takeInputAndSaveToPosition = (arr, input, saveToPosition) => {
    arr[saveToPosition] = input;
    return arr;
}


part1();