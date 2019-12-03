var helper = require("../helper/helper");

var readline = helper.getReadlineInterface("data");

var promise = helper.getArrayFromReadline(readline);
promise.then(arr => {

    var total = 0;
    for (var i in arr){
        total += calculateTotalMassOf(arr[i]);
    }
    console.log(`total mass = ${total}`);

}).catch(err => {
    console.error("something wrong when calling getArrayFromReadline()");
});

function calculateTotalMassOf(mass){
    var m = calculateMassOf(mass);
    if (m>0)   return (m + calculateTotalMassOf(m));
    else return 0;
}

function calculateMassOf(mass){
    return Math.floor(mass/3)-2;
}