import { Soldier, Soldiers } from '../models/soldiers.model';
import { Component, Input, OnInit } from '@angular/core';
import { AttackProgramm, RandomAttack, WeakestAttack, StrongestAttack } from '../models/strategy.model';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})

export class BattleCalculatorComponent implements OnInit {
  public resultMsg = '';

  private gameOver = false;

  private atacking = 1;
  private defending = 0;
  private survivers = []; // Array with survived squads



  @Input() squads: any = [];

  constructor() {
  }

  ngOnInit() {
    this.generateSoldiersSquads();
    this.setStrategy(this.squads);
  }

  // Form the soldiers groups. Add them to squads array.
  private generateSoldiersSquads(): void {
    this.squads = this.squads.sort(() => Math.random() - 0.5);
    const contestSquads = [];
    this.squads.forEach(element => {
      element = Object.assign(element, { squad: [] });
      const soldier: Soldiers = new Soldier();
      element.squad = Array(element.units).fill(soldier);
      contestSquads.push(element.squad);
    });
  }

  private setStrategy(squads, survivers?: boolean): void {
    squads.forEach(element => {
      if (element.strategy == 'random') {
        const competing = new RandomAttack().attack(this.squads, element);
        if (competing) {
          this.startBattleGame(competing);
        }
      } else if (element.strategy == 'weakest') {
        const competing = new WeakestAttack().attack(this.squads, element);
        // console.log('weak',squad);

      } else if (element.strategy == 'strongest') {
        //console.log('strongest',squad);
        const competing = new StrongestAttack().attack(this.squads, element);

      }
    });

  }

  // Applies for a random strategy battle.  
  public startBattleGame(squads): void {
    if (!this.gameOver) {
      if (this.geometricMean(this.calculateEachSoldierSuccess(squads[this.defending])) < this.geometricMean(this.calculateEachSoldierSuccess(squads[this.atacking]))) {
        this.addDamage(squads[this.defending]);
        this.incrementExperience(squads[this.atacking]);
      } 
      this.determineWinnerSquad(squads);
    }
  }

  private determineWinnerSquad(squads) {
     if(squads[this.defending].squad[0].health <= 0) {
       this.squads.splice(this.defending, 1);
       this.survivers.push(squads[this.atacking]);
       if(this.survivers.length > 1) {
        this.survivers.splice(this.defending, 1);
       }
      
      if(this.survivers.length > 1) {
        this.setStrategy(this.survivers, true);
      } else {
        console.log('Game OVER!!!!');
        console.log('this.survivers', this.survivers);
      }
     }
     else {
      this.startBattleGame(squads.reverse());
    }
  }

  private calculateEachSoldierSuccess(squads) {
    const totalSuccess = [];
    squads.squad.forEach(element => {
      totalSuccess.push(0.5 * (1 + element.health / 100) * Math.floor(Math.random() * 100) + (50 + element.experience / 100));
    });
    return totalSuccess;
  }

  private incrementExperience(squad): void {
    squad.squad.forEach(element => {
      if (element.experience < 50) {
        element.experience++;
      }
    });
  }

  // calculate attack probability success
  private geometricMean(numbers: Array<any>) {
    return Math.pow(numbers.reduce((a, b) => a * b), 1 / numbers.length);
  }

  private addDamage(squad): void {
    console.log('squadzzzz', squad);
    
    const totalDamage = (0.05 + squad.squad[0].experience / 100) * squad.squad.length;
    console.log('totalDamage', totalDamage);
    
    squad.squad.forEach(soldier => {
      soldier.health -= totalDamage / squad.squad.length;
    });
  }

}
