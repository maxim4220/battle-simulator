import {RandomAttack, StrongestAttack, WeakestAttack} from './strategies';
import {BattleCalculator} from './battle-calculator';


export class SetStrategy {
  public setAttackStrategy(squads, attacking) {
    let result = [];
    if (attacking.strategy === 'random') {
      result = new RandomAttack().attack(squads, attacking);
    } else if (attacking.strategy === 'weakest') {
      result = new WeakestAttack().attack(squads, attacking);
    } else if (attacking.strategy === 'strongest') {
      result = new StrongestAttack().attack(squads, attacking);
    }
    return result;
  }
}

export class StartBattleGame {
  private calculator = new BattleCalculator();

  public startBattleGame(squads, defending, attacking) {
    if (this.calculator.checkIfAttackingSquadWon(squads)) {
      this.calculator.addDamage(squads[defending]);
      this.calculator.incrementUnitsExperience(squads[attacking]);
    }
    return squads;
  }
}

export class DetermineWinner {
  private defending = 0;

  public determineWinnerSquad(competingSquads, totalSquads) {
    if (competingSquads[this.defending].totalHealth <= 0) {
      return totalSquads.filter(x => x !== competingSquads[this.defending]);
    } else {
     return false;
    }
  }
}

export class CheckGameOver {
  public checkIfTheSimulatorIsFinished(squadsLength) {
    return squadsLength === 1;
  }
}

export class BattleFacade {
  private setStrategy: SetStrategy;
  private startBattle: StartBattleGame;
  private determineWinner: DetermineWinner;
  private checkGameOver: CheckGameOver;
  // inner properties
  public gameOver = false;
  private defending = 0;
  private attacking = 1;

  constructor(setStrategy: SetStrategy, startBattle: StartBattleGame, determineWinner: DetermineWinner, checkGameOver: CheckGameOver) {
  this.setStrategy = setStrategy;
  this.startBattle = startBattle;
  this.determineWinner = determineWinner;
  this.checkGameOver = checkGameOver;
  }

  public beginCompetition(squads): void {
    squads.forEach(attacking => {
      let competing = this.setStrategy.setAttackStrategy(squads, attacking);
      competing = this.startBattle.startBattleGame(competing, this.defending, this.attacking);
      const isDead = this.determineWinner.determineWinnerSquad(competing, squads);
      if (isDead) {
        squads = isDead;
        console.log('survived', squads);
      }
      this.gameOver = this.checkGameOver.checkIfTheSimulatorIsFinished(squads.length);
    });
    this.gameOver ? console.log('Game over, winner is:',squads) : console.log();
  }
}

