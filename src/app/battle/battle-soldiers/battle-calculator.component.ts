
import { Component, Input, OnInit } from '@angular/core';
import {  RandomAttack, WeakestAttack, StrongestAttack } from '../models/strategy.model';
import { BattleService } from '../services/battle-service';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})

export class BattleCalculatorComponent implements OnInit {
  public resultMsg = '';

  private gameOver = false;
  private attacking = 1;
  private defending = 0;
  private survivers = []; // Array with survived squads

  @Input() squads: any = [];

  constructor(private bService: BattleService) {
  }

  ngOnInit() {
    console.log('squads', this.squads);
    this.setAttackStrategy(this.squads);
  }

  private setAttackStrategy(squads, survivers?: boolean): void {
    squads.forEach(element => {
      if (element.strategy == 'random') {
        const competing = new RandomAttack().attack(this.squads, element);
        this.startBattleGame(competing);
      } else if (element.strategy == 'weakest') {
        const competing = new WeakestAttack().attack(this.squads, element);
        if(competing) {
          this.startBattleGame(competing);
        }
        console.log('weak comp', competing);
      } else if (element.strategy == 'strongest') {
       // const competing = new StrongestAttack().attack(this.squads, element);
        //this.startBattleGame(competing);
      }
    });
  }

  // Applies for a random strategy battle.  
  public startBattleGame(squads): void {
    if (!this.gameOver) {
      if (this.bService.geometricMean(this.bService.calculateEachSoldierSuccess(squads[this.defending])) < 
      this.bService.geometricMean(this.bService.calculateEachSoldierSuccess(squads[this.attacking]))) {
        this.bService.addDamage(squads[this.defending]);
        this.bService.incrementExperience(squads[this.attacking]);
      } 
      this.determineWinnerSquad(squads);
    }
  }

  private determineWinnerSquad(squads) {
     if(squads[this.defending].squad[0].health <= 0) {
       this.squads.splice(this.defending, 1);
       this.survivers.push(squads[this.attacking]);
       if(this.survivers.length > 1) {
        this.survivers.splice(this.defending, 1);
       }
      if(this.survivers.length > 1) {
        this.setAttackStrategy(this.survivers, true);
      } else {
        console.log('Game OVER!!!!');
        console.log('this.survivers', this.survivers);
      }
     }
     else {
      this.startBattleGame(squads.reverse());
    }
  }



}
