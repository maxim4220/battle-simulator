import {Soldier} from './soldiers';
import {Vehicle} from './vehicles';
import {AbstractSquadFactory} from '../interfaces/squad.interface';

export class Squads implements AbstractSquadFactory {
  recharge = Math.floor(Math.random() * 1000);

  createSoldierSquad(numberOfUnits: number) {
    const result = [];
    for (let i = 0; i < numberOfUnits; i++) {
      result.push(new Soldier());
    }
    return result;
  }

  createVehiclesSquad(numberOfUnits: number) {
    const result = [];
    for (let i = 0; i < numberOfUnits; i++) {
      result.push(new Vehicle());
    }
    return result;
  }
}

