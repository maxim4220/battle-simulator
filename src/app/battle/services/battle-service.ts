import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  
  constructor() {
  }

  
  public calculateEachSoldierSuccess(squads) {
    const totalSuccess = [];
    squads.squad.forEach(element => {
      totalSuccess.push(0.5 * (1 + element.health / 100) * Math.floor(Math.random() * 100) + (50 + element.experience / 100));
    });
    return totalSuccess;
  }

   // calculate attack probability success
   public geometricMean(numbers: Array<any>) {
    return Math.pow(numbers.reduce((a, b) => a * b), 1 / numbers.length);
  }

  public incrementExperience(squad): void {
    squad.squad.forEach(element => {
      if (element.experience < 50) {
        element.experience++;
      }
    });
  }

  public addDamage(squad): void {
    const totalDamage = (0.05 + squad.squad[0].experience / 100) * squad.squad.length;
    squad.squad.forEach(soldier => {
      soldier.health -= totalDamage / squad.squad.length;
      squad.totalHealth -= totalDamage;
    });
  }

  public addSquadTotalDamage(squad) {
     
  }

}