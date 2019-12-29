class Moon {

    constructor(position, name) {
        this._position = position;
        this._name = "Moon-" + name;
        this._velocity = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    get name(){
        return this._name;
    }

    get position() {
        return this._position;
    }

    get velocity() {
        return this._velocity;
    }

    updatePositionAfterVelocityUpdated(){
        for (var key in this._position) {
            // console.log(`${this._name}: old position ${key}: ${this._position[key]}. New velocity ${key}: ${this._velocity[key]}`);
            this._position[key] += this._velocity[key];
        }
        return this._position;
    }

    updateVelocityWithListOfMoons(listOfMoons){
        let moon, newValue;
        let finalRes = {
            x: 0,
            y: 0,
            z: 0
        }

        for (let i in listOfMoons) {
            moon = listOfMoons[i];
            if (moon.name == this._name)    continue;
            newValue = this._getGravityOfMoon(moon);
            finalRes = this._updateFinalResult(finalRes, newValue);
        }
        // this._velocity = finalRes;
        this._updateVelocityWithNewResult(finalRes);
        return this._velocity;
    }

    _updateVelocityWithNewResult(newResult){
        for (let key in this._velocity) {
            this._velocity[key] += newResult[key];
        }
    }

    _updateFinalResult(finalRes, newValue) {
        return {
            x: finalRes.x + newValue.x,
            y: finalRes.y + newValue.y,
            z: finalRes.z + newValue.z
        };
    }

    _getGravityOfMoon(otherMoon) {
        let newValue = {
            x: 0,
            y: 0,
            z: 0
        };

        for (let i in this._position) {
            // console.log(`i: ${i}, ${otherMoon.position}`);
            if (this._position[i] < otherMoon.position[i])   newValue[i]++;
            else if (this._position[i] > otherMoon.position[i])  newValue[i]--;
        }
        
        return newValue;
    }

    _getTotalPotentialEnergy(){
        let sum = 0;
        for (let key in this._position) {
            sum += Math.abs(this._position[key]);
        }
        return sum;
    }

    _getTotalKineticEnergy(){
        let sum = 0;
        for (let key in this.velocity) {
            sum += Math.abs(this.velocity[key]);
        }
        return sum;
    }

    getTotalEnergy(){
        return this._getTotalKineticEnergy() * this._getTotalPotentialEnergy();
    }
}

module.exports = Moon;