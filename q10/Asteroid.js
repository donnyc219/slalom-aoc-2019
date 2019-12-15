class Asteroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.distinctSlopes = new Set();
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    addSlope(slope){
        return this.distinctSlopes.add(slope);
    }
    
    getSizeOfSet(){
        return this.distinctSlopes.size;
    }

    same(asteroid){
        if (this.x===asteroid.getX() && this.y===asteroid.getY())   return true;
        false;
    }

    slopeWith(asteroid){
        return (asteroid.getY() - this.y) / (asteroid.getX() - this.x);
    }

    getID(){
        return `[${this.x.toString()}-${this.y.toString()}]`;
    }

    onMyLeft(asteroid){
        if (this.x > asteroid.getX())   return true;
        return false;
    }
}


function slopeWith(){
    
}

module.exports = Asteroid;