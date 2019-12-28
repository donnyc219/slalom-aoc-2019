class Moon {

    constructor(position, name) {
        this._position = position;
        this._name = name;
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

    updateVelocityWithListOfMoons(listOfMoons){
        let moon, newValue;
        let finalRes = {
            x: 0,
            y: 0,
            z: 0
        }

        for (let i in listOfMoons) {
            moon = listOfMoons[i];
            newValue = this._getGravityOfMoon(moon);
            // console.log(newValue);
            finalRes = this._updateFinalResult(finalRes, newValue);
        }
        console.log(finalRes);
        return finalRes;
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
        // console.log(otherMoon.position);

        for (let i in this._position) {
            // console.log(`i: ${i}, ${otherMoon.position}`);
            if (this._position[i] < otherMoon.position[i])   newValue[i]++;
            else if (this._position[i] > otherMoon.position[i])  newValue[i]--;
        }
        return newValue;
    }
}

module.exports = Moon;