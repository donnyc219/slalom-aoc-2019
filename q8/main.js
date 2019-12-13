var Helper = require("./../helper/helper");

var pixelsInLayer = 25*6;

var current = {
    numOfOne: 0,
    numOfTwo: 0,
    numOfZero: 0,
    currentLayer: 0
}

var least = {
    numOfZero: Number.MAX_VALUE,
    numOfOne: Number.MAX_VALUE,
    numOfTwo: Number.MAX_VALUE,
    currentLayer: 0
}

const getPixel = (row, col, input) => {
    var i = row * pixelsInLayer + col;
    return input.charAt(i);
}

const start = async () => {
    try {
        var input = await Helper.readFile("data");
        // getNumOf1MultiplyNumOf2(input);
        getImageWithInput(input);
    } catch (e){
        console.log(e);
    }
}

const getImageWithInput = (input) => {
    var numOfLayer = input.length / pixelsInLayer;
    var pixel;
    var res = "";
    
    for (var col=0; col<pixelsInLayer; col++){
        for (var row=0; row<numOfLayer; row++) {
            pixel = getPixel(row, col, input);
            if (pixel==="2")  continue;
            else {
                res = updateResult(pixel, res);
                break;
            }    
        }
        if ((col+1)%25==0)  res = res.concat("\n");
    }
    console.log(res);
}
    
const updateResult = (pixel, res) => {
    if (pixel==="1") {
        res = res.concat("1");
    } else if (pixel==="0") {
        res = res.concat(" ");
    } else {
        throw "Invalid input";
    }
    return res;
}

const getNumOf1MultiplyNumOf2 = input => {
    var inputLength = input.length;
    var char;

    for (var i=0; i<inputLength; i++) {
        char = input[i];
        if (isZero(char))   current.numOfZero++;
        else if (isOne(char))   current.numOfOne++;
        else if (isTwo(char))   current.numOfTwo++;
        else throw "Invalid char";
    
        if (isNextLayerNewLayer(i)) {
            if (doesCurrentLayerHaveFewerZero()) {
                least.currentLayer = current.currentLayer;
                least.numOfOne = current.numOfOne;
                least.numOfTwo = current.numOfTwo;
                least.numOfZero = current.numOfZero;
            }
    
            resetCurrentObjectValues();
            current.currentLayer = i+1;
        }
    }

    console.log(least.numOfTwo * least.numOfOne);
}

const isZero = (char) => {
    return (char==="0");
}
const isOne = (char) => {
    return (char==="1");
}
const isTwo = (char) => {
    return (char==="2");
}

const isNextLayerNewLayer = (i) => {
    return (((i+1) % pixelsInLayer) == 0);
}

const resetCurrentObjectValues = () => {
    current.numOfOne = 0;
    current.numOfTwo = 0;
    current.numOfZero = 0;
}

const doesCurrentLayerHaveFewerZero = () => {
    return (current.numOfZero < least.numOfZero);
}

start();





