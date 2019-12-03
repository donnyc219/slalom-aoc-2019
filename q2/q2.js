var data = "1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,5,19,23,1,23,5,27,1,27,13,31,1,31,5,35,1,9,35,39,2,13,39,43,1,43,10,47,1,47,13,51,2,10,51,55,1,55,5,59,1,59,5,63,1,63,13,67,1,13,67,71,1,71,10,75,1,6,75,79,1,6,79,83,2,10,83,87,1,87,5,91,1,5,91,95,2,95,10,99,1,9,99,103,1,103,13,107,2,10,107,111,2,13,111,115,1,6,115,119,1,119,10,123,2,9,123,127,2,127,9,131,1,131,10,135,1,135,2,139,1,10,139,0,99,2,0,14,0";

// 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
// 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
// 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
// 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

// var data = "2,3,0,3,99";

// 1: addition
// 2: multiplication
// 99: end
// then +4 position

// split data to array
// pointer for current opcode

// var dataArray = data.split(",");
// // var currentOpCodePosition = 0;
// var opCode, val1, val2, updatePosition, newValue;

// for (var i=0; i<dataArray.length; i+=4) {

//     opCode = getOpCode(dataArray, i);

//     if (opCode==="99") {
//         console.log(dataArray[0]);
//         return ;
//     }   
//     val1 = getValue1(dataArray, i);
//     val2 = getValue2(dataArray, i);
//     updatePosition = getUpdatePosition(dataArray, i);

//     try {
//         newValue = getValueAfterOperation(opCode, val1, val2);
//         dataArray = updateDataArray(dataArray, newValue, updatePosition);
//     } catch (e) {
//         console.error(e);
//     }

// }

// getValueInPosition0(12,21);

var v = 0;
var mid = "5000";

// verbNoun = incrementVerbnoun(verbNoun);
// verb = getVerb(verbNoun);
// noun = getNoun(verbNoun);
// v = getValueInPosition0(noun, verb);

// console.log(`${verbNoun}, ${verb}, ${noun}, ${v}`);

// var verbNoun = "0000";
// while (v!=19690720){
//     verbNoun = incrementVerbnoun(verbNoun);
//     verb = getVerb(verbNoun);
//     noun = getNoun(verbNoun);
//     v = getValueInPosition0(noun, verb);
//     console.log(`${noun}, ${verb}: ${v}`);
// }
// console.log(`${noun}, ${verb}`);
// console.log(`final: ${v}`);

// var vv = start(small, large);
// var vv = getValueInPosition0(33, 33);
// console.log(`final: ${vv}`);
var small = "0000";
var large = "9999";

var vv = start(small, large);
console.log(`final: ${vv}`);

function start(small, large){
    var mid = Math.round((parseInt(large) + parseInt(small))/2);
    mid = convertNumberToNounVerb(mid);
    
    var verb = getVerb(mid);
    var noun = getNoun(mid);
    var v = getValueInPosition0(noun, verb);

    if (parseInt(v)==19690720)    return mid;
    else if (parseInt(v)>19690720) {
        return start(small, mid);
    } else {
        return start(mid, large);
    }
}

function convertNumberToNounVerb(val){
    if (val<10) {
        return new String("000" + val.toString());
    } else if (val < 100) {
        return new String("00" + val.toString());
    } else if (val < 1000) {
        return new String("0" + val.toString());
    }
    return val.toString();
}

// console.log(`n = ${noun}, v = ${verb}`);

function getVerb(verbNoun) {
    return parseInt(verbNoun.toString().substring(2));
}

function getNoun(verbNoun) {
    return parseInt(verbNoun.toString().substring(0,2));
}

function incrementVerbnoun(verbNoun){
    var val = parseInt(verbNoun);
    val++;
    if (val<10) {
        return new String("000" + val.toString());
    } else if (val < 100) {
        return new String("00" + val.toString());
    } else if (val < 1000) {
        return new String("0" + val.toString());
    }
    return val.toString();
}

function getValueInPosition0(noun, verb) {

    var dataArray = data.split(",");
    dataArray[1] = noun;
    dataArray[2] = verb;
    // var currentOpCodePosition = 0;
    var opCode, val1, val2, updatePosition, newValue;
    // console.log(dataArray.toString());
    for (var i=0; i<dataArray.length; i+=4) {

        opCode = getOpCode(dataArray, i);

        if (opCode==="99") {
            // console.log(dataArray[0]);
            return dataArray[0];
        }   
        val1 = getValue1(dataArray, i);
        val2 = getValue2(dataArray, i);
        updatePosition = getUpdatePosition(dataArray, i);

        try {
            newValue = getValueAfterOperation(opCode, val1, val2);
            dataArray = updateDataArray(dataArray, newValue, updatePosition);
        } catch (e) {
            console.error(e);
        }

    }
}

function getOpCode(dataArray, pos){
    return dataArray[pos];
}

function getValue1(dataArray, opCodePosition){
    var pos = dataArray[opCodePosition + 1];
    return dataArray[pos];
}

function getValue2(dataArray, opCodePosition){
    var pos = dataArray[opCodePosition + 2];
    return dataArray[pos];
}

function getUpdatePosition(dataArray, opCodePosition){
    var pos = dataArray[opCodePosition + 3];
    return dataArray[opCodePosition + 3];
}

function getValueAfterOperation(opCode, value1, value2){
    switch (opCode) {
        case "1":
            return (parseInt(value1) + parseInt(value2));
        case "2":
            return (parseInt(value1) * parseInt(value2));
        default:
            throw(`Invalid opCode ${opCode}`);
    }
}

function updateDataArray(data, newValue, newPosition){
    data[newPosition] = newValue;
    return data;
}