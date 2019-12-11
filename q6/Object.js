
class Object {

    constructor(name) {
        this.name = name;   
        this.orbitsTo = null;
        this.listOfObjectsSurrounding = [];
    }

    getName(){
        return this.name;
    }

    addObject(object){
        this.listOfObjectsSurrounding.push(object);
    }

    getListOfObjectOrbitingIt(){
        return this.listOfObjectsSurrounding;
    }

    getTotalDirectIndirectOrbits(){
        return this.totalOrbits;
    }

    setNumberOfTotalOrbits(num){
        this.totalOrbits = num; // direct + indirect
    }

    orbitsToCenter(object){
        this.orbitsTo = object;
    }

    print(){
        var orbitName = this.orbitsTo==null? "Nothing to orbit": this.orbitsTo.getName();
        console.log(`name: ${this.name}`);
        console.log(`orbits to: ${orbitName}`);
        console.log(`number of total orbits: ${this.totalOrbits}`);
        console.log(`objects orbiting it:`);
        for (var i in this.listOfObjectsSurrounding){
            console.log(this.listOfObjectsSurrounding[i].getName());
        }
        if (this.listOfObjectsSurrounding.length==0)    console.log("null");
        console.log("----------");
        
        
    }
}

module.exports = Object;
