var helper = require("./helper/helper");

// helper.callme("something");
// console.log("testing node");
const resetValues = () => {
    return {
        n: 10,
        b: 20,
        c: 30,
        counter: 0
    }
}

var counter = 12;
var obj = {counter};
// console.log(obj);

// var {n, b, c} = resetValues();

// console.log(n);
// console.log(b);
// console.log(c);
// {n, b, c, counter} = resetValues();


var arr = [1,1,2,3,7,6];

// const hi = 
arr.hi = function(index) {
    return this[index+3];
}

var n = arr.hi(1);
console.log(n)


