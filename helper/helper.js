var fs = require("fs");
var readline = require('readline');

class Helper {
    // static openFile(filename){
    //     fs.readFile(filename, function(err, data) {
    //         console.log("I got you: " + data);
    //     })
    // };

    static getReadlineInterface(filename){
        const readInterface = readline.createInterface({
            input: fs.createReadStream(filename),
            output: process.stdout,
            terminal: false
        });

        return readInterface;
    }

    static getArrayFromReadline(readline){

        var promise = new Promise((resolve, reject) => {
            var arr = new Array();
            readline.on('line', line => {
                arr.push(line);
            });

            readline.on('close', function(){
                resolve(arr);
                readline.close();
            });
        });

        return promise;

    }

}

module.exports = Helper;

