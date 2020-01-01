
class Object {


    constructor(name) {
        this.name = name;   
        this.orbitsTo = null;
        this.listOfObjectsSurrounding = [];
        this.hasChecked = false;
        this.distanceToOrigin = -1;
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

    checked(){
        return this.hasChecked = true;
    }

    isChecked(){
        return this.hasChecked;
    }

    setDistanceToOrigin(n){
        this.distanceToOrigin = n;
    }

    getDistanceToOrigin(){
        return this.distanceToOrigin;
    }

    getCenterItOrbits(){
        return this.orbitsTo;
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
