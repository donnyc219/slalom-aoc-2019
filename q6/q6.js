var Helper = require("./../helper/helper");
var Object = require("./Object");

var readline = Helper.getReadlineInterface("data");
var promise = Helper.getArrayFromReadline(readline);
promise.then(arr => {
    something(arr);
}).catch(err => {
    console.log(err);
});


function something(arr) {
    var obj = new Object('this');
    obj.print();
}


