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
   // 0.5 * (1 + this.health / 100) * Math.random(50 + this.experience, 100) / 100;
   // where random(min, max) returns a random number between min and max (inclusive)
   // Math.floor(Math.random() * 2000) + 100,
    return 0.5 * (1 + this.health / 100) * Math.floor(Math.random() * 100) + 50 + this.experience / 100;
  }

  // constructor(firstName: string, lastName: string, age: number) {
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.age = age;
  // }

}
