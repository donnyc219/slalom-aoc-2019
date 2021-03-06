



class Amplifier {

    _upgradeArray(arr) {
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
    
    
    _handleJumpIfTrue(arr, ptr, mode1, mode2){
        var param1 = arr.getValueWithMode(mode1, ptr+1);
        var param2 = arr.getValueWithMode(mode2, ptr+2);
        var newPtr;
        if (param1!=0) {
            newPtr = param2;
            return newPtr;
        }   
        return ptr+3;
    }
    
    _handleJumpIfFalse(arr, ptr, mode1, mode2) {
        var param1 = arr.getValueWithMode(mode1, ptr+1);
        var param2 = arr.getValueWithMode(mode2, ptr+2);
        var newPtr;
        if (param1==0) {
            newPtr = param2;
            return newPtr;
        }   
        return ptr+3;
    
    }
    
    _handleLessThan(arr, ptr, mode1, mode2)  {
    
        var {param1, param2, param3} = this._getNext3ParamsWithModesForLessThanAndEqual(arr, ptr, mode1, mode2);
    
        arr[param3] = (param1<param2)? 1: 0;
        return ptr+4;
    }
    
    _handleEquals(arr, ptr, mode1, mode2) {
    
        var {param1, param2, param3} = this._getNext3ParamsWithModesForLessThanAndEqual(arr, ptr, mode1, mode2);
    
        arr[param3] = (param1==param2)? 1: 0;
        return ptr+4;
    }
    
    _getNext3ParamsWithModesForLessThanAndEqual(arr, ptr, mode1, mode2) {
        var param1 = arr.getValueWithMode(mode1, ptr+1);
        var param2 = arr.getValueWithMode(mode2, ptr+2);
        var param3 = arr[ptr+3];
        return {
            param1: param1,
            param2: param2,
            param3: param3
        }
    }
    

    _add(val1, val2) {
        return parseInt(val1) + parseInt(val2);
    }
    
    _multiply(val1, val2) {
        return parseInt(val1) * parseInt(val2);
    }
    
    _handleInstruction(arr, ptr, inputs) {
        // console.log(`instruction: ${arr[ptr]}, ${ptr}`);
        var instruction = arr[ptr];
        if (instruction.length>4)   throw "Instruction too long";
    
        var {opCode, mode1, mode2} = this._splitInstruction(instruction);
    
        var val1, val2, newValue, newPtr;
        var finalResult = null;
    
        switch (opCode) {
            case 1:
            case 2:
                val1 = arr.getValueWithMode(mode1, ptr+1);
                val2 = arr.getValueWithMode(mode2, ptr+2);
                newValue = (opCode==1)? this._add(val1, val2): this._multiply(val1, val2);
                var saveToAddress = arr[ptr+3];
                arr[saveToAddress] = newValue;
                newPtr = (ptr+4);
                break;
            case 3:
                // console.log(`input: ${arr[ptr]}, ${inputs[0]}`);
                arr = this._handleInput(arr, inputs.shift(), ptr);
                newPtr = (ptr+2);
                break;
            case 4:
                val1 = arr.getValueWithMode(mode1, ptr+1);
                finalResult = val1;
                newPtr = (ptr+2);
                break;
            case 5:
                newPtr = this._handleJumpIfTrue(arr, ptr, mode1, mode2);
                break;
            case 6:
                newPtr = this._handleJumpIfFalse(arr, ptr, mode1, mode2);
                break;
            case 7:
                newPtr = this._handleLessThan(arr, ptr, mode1, mode2);
                break;
            case 8:
                newPtr = this._handleEquals(arr, ptr, mode1, mode2);
                break;
            case 99:
                // console.log(`instruction: ${instruction}, inputs: ${inputs.length}`);
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
    
    _splitInstruction(instruction) {
        var opCode = this._getLastTwoDigit(instruction);
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
    
    _getLastTwoDigit(instruction) {
        instruction = instruction.toString();
        if (instruction.length<2) {
            return parseInt(instruction);
        }
        return parseInt(instruction.substring(instruction.length-2));
    }
    
    _handleInput(arr, input, ptr) {
        var saveToAddress = parseInt(arr[ptr+1]);
        arr[saveToAddress] = input;
        return arr;
    }


    constructor(name) {
        this.name = name;
        this.pointer = 0;
        this.isHalted = false;
        this._prepare();

        console.log(`init ${this.name}`);
    }
    
    _prepare() {
        var data = "3,8,1001,8,10,8,105,1,0,0,21,46,67,76,101,118,199,280,361,442,99999,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,1002,9,5,9,101,5,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";
        // var data = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
        // var data = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10";

        this.dataArray = data.split(",");
        this._upgradeArray(this.dataArray);
        
    }

    get getName(){
        return this.name;
    }

    runWithInput(inputs) {

        // if (this.name==="A") console.log(dataArray);

        var arr = this.dataArray;
        var ptr = this.pointer;
        // console.log(`${this.name}: setting pointer to ${this.pointer}, ${arr[ptr]}, ${inputs.length}`);
        var res;
        var tempResult;
    
        while (ptr<arr.length && (arr[ptr]!="3" || inputs.length!=0)) {
            res = this._handleInstruction(arr, ptr, inputs);
            arr = res.arr;
            ptr = res.newPtr;
            tempResult = (res.finalResult!=null)? res.finalResult: tempResult;
        }
        // console.log(ptr)
        this.pointer = ptr;
        if (ptr==99999) this.isHalted = true;

        // console.log(`name: ${this.name}, new ptr: ${ptr}`);
        return tempResult;
    }

    isAmplifierHalted() {
        return this.isHalted;
    }

    getPointer(){
        return this.pointer;
    }

    resetPointer(){
        this.pointer = 0;
    }


    getOutput() {
        return this.output;
    }

}

module.exports = Amplifier;