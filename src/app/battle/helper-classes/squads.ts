import {Soldier} from './soldiers';
import { Vehicle } from './vehicles';

export class Squads {

  createSoldierSquad(numberOfUnits) {
    const result = [];
    for (let i = 0; i < numberOfUnits; i++) {
      result.push(new Soldier());
    }
    return result;
  }

  createVehiclesSquad(numberOfUnits) {
    const result = [];
    for (let i = 0; i < numberOfUnits; i++) {
      result.push(new Vehicle());
    }
    return result;
  }
}

