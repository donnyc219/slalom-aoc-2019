
class Object {

    constructor(name) {
        this.name = name;   
    }

    orbitTo(object){
        this.orbitTo = object;
    }

    setNumberOfTotalOrbits(num){
        this.totalOrbits = num;
    }

    print(){
        console.log(this.name);
    }
}

module.exports = Object;
