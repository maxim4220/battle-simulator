
import { Soldier, Soldiers } from '../models/soldiers.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})
export class BattleCalculatorComponent implements OnInit {
  private gameOver = false;
  public resultMsg = '';
  @Input() armies: any;

  constructor() {
  }

  ngOnInit() {
    this.generateSoldiers();
  }

  // Form the soldiers groups. Add them to squads array.
  private generateSoldiers() {
    this.armies.forEach(element => {
      const soldier: Soldiers = new Soldier();
      element = Object.assign(element, { squads: { squad: new Array(element.units).fill({ soldier }) } });
    });
    this.calculateSquadSuccessChance(this.armies[0].squads.squad, this.armies[1].squads.squad);
  }

  // Calculate success probability of each squad.
  private calculateSquadSuccessChance(squad1, squad2) {
    const firstSquadSuccess = [];
    squad1.forEach(element => {
      const res = 0.5 * (1 + element.soldier.health / 100) * Math.floor(Math.random() * 100) + (50 + element.soldier.experience / 100);
      firstSquadSuccess.push(res);
    });

    const secondSquadSuccess = [];
    squad2.forEach(element => {
      const res = 0.5 * (1 + element.soldier.health / 100) * Math.floor(Math.random() * 100) + (50 + element.soldier.experience / 100);
      secondSquadSuccess.push(res);
    });

    // If average geometrical value of atacking squad is higher - apply damage!
    if (this.geometricMean(firstSquadSuccess) > this.geometricMean(secondSquadSuccess)) {
      // First squad wins. Calculate damage and apply to the second squad.
      const totalDamage = (0.05 + squad1[0].soldier.experience / 100) * squad1.length;
      squad2.forEach(soldier => {
        soldier.soldier.health -= totalDamage / squad1.length;
      });
      this.incrementExperience(squad1);

    } else {
      //  second squad wins. Calculate damage and apply to the first squad.
      const totalDamage = (0.05 + squad2[0].soldier.experience / 100) * squad2.length;
      squad1.forEach(soldier => {
        soldier.soldier.health -= totalDamage / squad2.length;
      });
      this.incrementExperience(squad2);
    }

    // If Squad is is still alive - go to recharge.
    if (squad1[0].soldier.health > 0 && squad2[0].soldier.health > 0) {
      this.calculateSquadSuccessChance(squad1, squad2);
    } else {
      this.gameOver = true;
      if (squad1[0].soldier.health <= 0) {
        this.resultMsg = 'SECOND SQUAD HAS WON';
      }
      if (squad2[1].soldier.health <= 0) {
        this.resultMsg = 'FIRST SQUAD HAS WON';
      }

    }
  }

  private incrementExperience(squad) {
    squad.forEach(element => {
      if (element.soldier.experience < 50) {
        element.soldier.experience++;
      }
    });
  }

  // calculate attack probability success
  private geometricMean(numbers: Array<any>) {
    return Math.pow(numbers.reduce((a, b) => a * b), 1 / numbers.length);
  }

}
