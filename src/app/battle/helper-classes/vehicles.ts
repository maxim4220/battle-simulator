import {Units} from '../interfaces/units.interface';

export interface Vehicles extends Units {
  operators: number;
}


export class Vehicle implements Vehicles {
  // Vehicle recharge must not be less then 1 second.
  recharge = Math.floor(Math.random() * 2000) + 1000;
  experience = 0;
  operators = 3;
  health = 100 + (this.operators * 100);


  calculateGeomMean(vehicle, operators) {
    return 0.5 * (1 + vehicle.health / 100) * Math.pow(operators.reduce((a, b) => a * b), 1 / operators.length);
  }

}
