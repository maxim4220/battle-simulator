import {Units} from './units.model';

export interface Soldiers extends Units {
  experience: number;
  getAtack(): number;
}

export class Soldier implements Soldiers {
  health = 100;
  recharge = Math.floor(Math.random() * 2000) + 100;
  experience = 0;
  getAtack() {
    return 0.5 * (1 + this.health / 100) * Math.floor(Math.random() * 100) + 50 + this.experience / 100;
  }

}
