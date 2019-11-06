import { Component, Input, OnInit } from '@angular/core';
import { RandomAttack, WeakestAttack, StrongestAttack } from '../helper-classes/strategies';
import { BattleCalculator } from '../helper-classes/battle-calculator';

@Component({
  selector: 'app-battle-simulator',
  templateUrl: './battle-simulator.component.html',
  styleUrls: ['./battle-simulator.component.scss']
})

export class BattleCalculatorComponent implements OnInit {
  @Input() squads: any = [];

  private gameOver = false;
  private defending = 0;
  private attacking = 1;

  private calculator = new BattleCalculator();


  ngOnInit() {
    while (!this.gameOver) {
      this.setAttackStrategy(this.squads);
      this.gameOver = this.calculator.checkIfTheSimulatorIsFinished(this.squads.length);
      // OUTPUT THE WINNER SQUAD to console!
      this.gameOver ? console.log('Game over, winner is:', this.squads) : null;
    }
  }
 
  private startBattleGame(squads): void {
    if (this.calculator.checkIfAttackingSquadWon(squads)) {
      this.calculator.addDamage(squads[this.defending]);
      this.calculator.incrementUnitsExperience(squads[this.attacking]);
    }
    this.determineWinnerSquad(squads);
  }

  private setAttackStrategy(squads): void {
    squads.forEach(element => {
      if (element.strategy === 'random') {
        const competing = new RandomAttack().attack(this.squads, element);
        this.startBattleGame(competing);
      }
      else if (element.strategy === 'weakest') {
        const competing = new WeakestAttack().attack(this.squads, element);
        if (competing) {
          this.startBattleGame(competing);
        }
      } else if (element.strategy === 'strongest') {
         const competing = new StrongestAttack().attack(this.squads, element);
         if(competing) {
           this.startBattleGame(competing);
         }
      }
    });
  }

  private determineWinnerSquad(squads) {
    if (squads[this.defending].totalHealth <= 0) {
      this.squads = this.squads.filter(x => x !== squads[this.defending]);
    }
  }
}

