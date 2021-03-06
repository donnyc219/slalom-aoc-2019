var fs = require("fs");
var readline = require('readline');

class Helper {
    static readFile(filename){
        var promise = new Promise((resolve, reject) => {
            fs.readFile(filename, "utf8", function(err, data) {
                if (err) reject("unable to read file");
                resolve(data);
            });
        });
        return promise;
    };

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

    static writeToFileWithData(filename, data){
        fs.writeFile(filename, data,'utf8', (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('file created');
        });
    }

}

module.exports = Helper;

