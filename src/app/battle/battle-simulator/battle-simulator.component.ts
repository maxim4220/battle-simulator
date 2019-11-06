import {Component, Input, OnInit} from '@angular/core';
import {RandomAttack, WeakestAttack, StrongestAttack} from '../helper-classes/strategies';
import {BattleService} from '../services/battle-service';

@Component({
  selector: 'app-battle-simulator',
  templateUrl: './battle-simulator.component.html',
  styleUrls: ['./battle-simulator.component.scss']
})
export class BattleCalculatorComponent implements OnInit {
  public resultMsg = '';
  @Input() squads: any = [];
  private gameOver = false;
  private attacking = 1;
  private defending = 0;
  private survivers = [];

  constructor(private bService: BattleService) {
  }

  ngOnInit() {
    this.setAttackStrategy(this.squads);
  }

  // Check if the game is not over. Check if geometrical average of defending team is 
  public startBattleGame(squads): void {
    if (!this.gameOver) {
      if (
        this.bService.geometricMean(
          this.bService.calculateEachSoldierSuccess(squads[this.defending])
        ) <
        this.bService.geometricMean(
          this.bService.calculateEachSoldierSuccess(squads[this.attacking])
        )
      ) {
        this.bService.addDamage(squads[this.defending]);
        this.bService.incrementExperience(squads[this.attacking]);
      }
      this.determineWinnerSquad(squads);
    }
  }

  private setAttackStrategy(squads): void {
    squads.forEach(element => {
      if (element.strategy === 'random') {
        const competing = new RandomAttack().attack(this.squads, element);
        this.startBattleGame(competing);
      } else if (element.strategy === 'weakest') {
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
    if (squads[this.defending].squad[0].health <= 0) {
      this.squads.splice(this.defending, 1);
      this.survivers.push(squads[this.attacking]);
      // TO do: fix logic for survivers.
      if (this.survivers.length > 1) {
        this.survivers.splice(this.defending, 1);
        this.setAttackStrategy(this.survivers);
      } else {
        this.gameOver = true;
        console.log('Game OVER! Winner:', this.survivers);
      }
    } else {
      // Recharge must be implemented.
      this.startBattleGame(squads.reverse());
    }
  }
}

/**
 * СТУКТУРА-
 * 1. Класс сквад - у него должны быть методы - атака, прощет вероятности успеха, речардж, прощет общего урона на этот сквад.
 * 2. Класс солдат - должен иметь свойства , здоровье, опыт, речардж и методы урон.метод создать солдата
 * 3. Класс танки - свойства - операторы, здоровье, речардж, урон - метод солдатп
 *
 */
