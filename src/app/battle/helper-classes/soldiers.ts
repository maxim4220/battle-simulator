import {Units} from '../interfaces/units.model';

export class Soldier implements Units {
  health = 100;
  recharge = 100;
  experience = 0;

  getAtack() {
    return 0.5 * (1 + this.health / 100) * Math.floor(Math.random() * 100) + 50 + this.experience / 100;
  }

}
