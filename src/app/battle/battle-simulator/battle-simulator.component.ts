import {Component, Input, OnInit} from '@angular/core';
import {CheckGameOver, DetermineWinner, SetStrategy, StartBattleGame, BattleFacade} from '../helper-classes/battle-facade';

@Component({
  selector: 'app-battle-simulator',
  templateUrl: './battle-simulator.component.html',
  styleUrls: ['./battle-simulator.component.scss']
})

export class BattleCalculatorComponent implements OnInit {

  @Input() squads: any = [];

  ngOnInit() {
  let setStrategy = new SetStrategy();
  let startBattle = new StartBattleGame();
  let determineWinner = new DetermineWinner();
  let checkGameOver = new CheckGameOver();
 
  let battleFacade = new BattleFacade(setStrategy, startBattle, determineWinner, checkGameOver, );
  battleFacade.beginCompetition(this.squads);
    while(!battleFacade.gameOver) {
      battleFacade.beginCompetition(this.squads);
    }
  }

}
