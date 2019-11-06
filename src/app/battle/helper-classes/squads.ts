import {Soldier} from './soldiers';

export class Squads {

  createSquad(numberOfUnits) {
    const res = [];
    for (let i = 0; i < numberOfUnits; i++) {
      res.push(new Soldier());
      console.log('res', new Soldier());
    }
    return res;

  }
}
