import {Soldier, Soldiers} from '../models/soldiers.model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})

export class BattleCalculatorComponent implements OnInit {
  public resultMsg = '';

  private gameOver = false;
  private index = 0;

  @Input() squads: any = [];

  constructor() {
    // this.testGame();
  }

  ngOnInit() {
    this.generateSoldiersSquads();
  }

  // Form the soldiers groups. Add them to squads array.
  private generateSoldiersSquads(): void {
    this.squads = this.squads.sort(() => Math.random() - 0.5);
    const contestSquads = [];
    this.squads.forEach(element => {
      element = Object.assign(element, {squad: []});
      const soldier: Soldiers = new Soldier();
      element.squad = Array(element.units).fill(soldier);
      contestSquads.push(element.squad);
    });
    this.startBattleGame(contestSquads);
  }

  public startBattleGame(squads): void {
    if (!this.gameOver) {
      if (this.geometricMean(this.calculateEachSoldierSuccess(squads[this.index])) > this.geometricMean(this.calculateEachSoldierSuccess(squads[this.index + 1]))) {
        this.addDamage(squads[this.index + 1]);
        this.incrementExperience(squads[this.index]);
      } else {
        this.addDamage(squads[this.index]);
        this.incrementExperience(squads[this.index + 1]);
      }
      this.determineWinnerSquad(squads);
    }
  }

  private determineWinnerSquad(squads) {
    if (squads[this.index][0].health > 0 && squads[this.index + 1][0].health > 0) {
      this.startBattleGame(squads);
    } else {
      if (squads[this.index][0].health <= 0) {
        this.squads.splice(this.index, 1);
      }
      if (squads[this.index + 1][0].health <= 0) {
        this.squads.splice(this.index + 1, 1);
      }
      if (this.squads.length == 1) {
        this.gameOver = true;
        this.resultMsg = 'Winner: ' + this.squads[0].name;
        console.log('GAME OVER! the WINNER IS:', this.squads[0].name);
      } else {
        this.squads = this.squads.sort(() => Math.random() - 0.5);
        const contestSquads = [];
        this.squads.forEach(element => {
          contestSquads.push(element.squad);
        });
        this.startBattleGame(contestSquads);
      }
    }
  }

  private calculateEachSoldierSuccess(squad) {
    const totalSuccess = [];
    squad.forEach(element => {
      totalSuccess.push(0.5 * (1 + element.health / 100) * Math.floor(Math.random() * 100) + (50 + element.experience / 100));
    });
    return totalSuccess;
  }

  private incrementExperience(squad): void {
    squad.forEach(element => {
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
    const totalDamage = (0.05 + squad[0].experience / 100) * squad.length;
    squad.forEach(soldier => {
      soldier.health -= totalDamage / squad.length;
    });
  }

  private testGame() {
    const players = ['squad 1', 'squad 2', 'squad 3', 'squad 4', 'squad 5', 'squad 6', 'squad 7', 'squad 8', 'squad 9', 'squad 10', 'squad 11', 'squad 12', 'squad 13', 'squad 14', 'squad 15', 'squad 16', 'squad 17', 'squad 18'].map(player => {
      return {
        name: player,
        health: 100,
        experience: 0,
        damage: 0.05, // Math.random() * 0.1 + 1,
        defence: Math.random() * 2 + 8
      };
    });
    let winners = [];
    let round = 1;
    const match = (a, b) => {
      console.log('match between ', a.name, ' (', a.health, 'hp) and ', b.name, '(', b.health, 'hp)');
      let lastAttacker = null;
      while (a.health > 0 && b.health > 0) {
        // tslint:disable-next-line:one-variable-per-declaration
        let attacker: any, defender: any;
        [attacker, defender] = lastAttacker ? (lastAttacker === a && Math.random() > 0.3 ? [b, a] : [a, b]) : (Math.random() > 0.5 ? [a, b] : [b, a]);
        const accuracy = attacker.defence * 0.5;
        const evasion = defender.defence * 0.1;
        const chance = ((accuracy - evasion) / accuracy) * 100;
        if (chance > 0 && Math.random() * 100 < chance) {
          // hit
          const hitPower = Math.random() * (100 * attacker.damage) + attacker.damage;
          attacker.defence = Math.max(1, attacker.defence);
          const parryPower = Math.random() * (defender.damage + defender.defence) + defender.defence;
          defender.defence = Math.max(1, defender.defence);
          const damage = Math.floor(Math.max(0, hitPower - parryPower) * 10) / 10;
          console.log(attacker.name, ' hits ', defender.name, ' and does ', damage, ' damage');
          defender.health = Math.floor(Math.max(0, defender.health - damage) * 10) / 10;
          console.log(defender.name, ' has ', defender.health, ' health');
          lastAttacker = attacker;
        } else {
          lastAttacker = null;
          console.log(attacker.name, ' missed ', defender.name);
        }
      }
      const winner = a.health > b.health ? a : b;
      winner.damage += Math.random() * 0.3;
      return winner;
    };
    const getUserIndex = () => Math.floor(Math.random() * players.length);
    const getPlayers = () => {
      let a = getUserIndex();
      let b = a;
      while (b === a) {
        b = getUserIndex();
      }
      if (a > b) {
        [a, b] = [b, a];
      }
      const user2 = players.splice(b, 1)[0];
      const user1 = players.splice(a, 1)[0];
      return [user1, user2];
    };
    const matchup = () => {
      const [a, b] = getPlayers();
      const winner = match(a, b);
      console.log(winner.name, ' is the winner!');
      console.log(winner.name, ' has improved strength: ', winner.damage);
      winner.defence += 4;
      winner.health = Math.min(100, winner.health + (Math.random() * 25 + 25));
      winners.push(winner);
    };
    const app = () => {
      console.log('round ', round++);
      console.log('players: ', players.map(user => user.name).join(' '));
      if (players.length % 2) {
        const a = getUserIndex();
        const by = players.splice(a, 1)[0];
        winners.push(by);
        console.log(by.name, ' gets a free pass this round');
      }
      while (players.length) {
        matchup();
      }
      [].push.apply(players, winners);
      winners = [];
      if (players.length > 1) {
        app();
      } else {
        console.log(players[0].name, ' is the champion!');
        console.timeEnd('battle');
      }
    };
    app();
  }

}
