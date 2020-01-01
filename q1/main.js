var helper = require("../helper/helper");

function q1(){
    filename = "./q1/data";
    var readline = helper.getReadlineInterface(filename);

    var promise = helper.getArrayFromReadline(readline);
    promise.then(arr => {
    
        var total = 0;
        for (var i in arr){
            total += this.calculateTotalMassOf(arr[i]);
        }
        console.log(`total mass = ${total}`);
    
    }).catch(err => {
        console.error("something wrong when calling getArrayFromReadline()");
    });
}


function calculateTotalMassOf(mass){
    var m = this.calculateMassOf(mass);
    if (m>0)   return (m + this.calculateTotalMassOf(m));
    else return 0;
}


function calculateMassOf(mass){
    return Math.floor(mass/3)-2;
}

module.exports = {
    q1: q1, 
    calculateTotalMassOf: calculateTotalMassOf, 
    calculateMassOf: calculateMassOf
};