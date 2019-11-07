import {Units} from '../interfaces/units.interface';

export class Soldier implements Units {
  health = 100;
  recharge = 100;
  experience = 0;
  // temporary.
  attackSuccess() {
    return 1;
  }
}
