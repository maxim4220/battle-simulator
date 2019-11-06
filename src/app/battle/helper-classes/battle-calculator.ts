import { BattleCalculatorInterface } from '../interfaces/battle-calculator.interface';

// The class plays the role of the facade to hide and separate the code complexity.
export class BattleCalculator implements BattleCalculatorInterface {

    public checkIfAttackingSquadWon(squads) {
        const defending = 0;
        const attacking = 1;
        if (this.geometricMean(this.calculateEachSoldierSuccess(squads[defending])) < this.geometricMean(
            this.calculateEachSoldierSuccess(squads[attacking]))) {
            return true;
        } else {
            return false;
        }
    }

    public addDamage(squads): void {
        const totalDamage = (0.05 + squads.squad[0].experience / 100) * squads.squad.length;
        squads.squad.forEach(soldier => {
            soldier.health -= totalDamage / squads.squad.length;
        });
        squads.totalHealth -= totalDamage;
    }

    public incrementUnitsExperience(squads): void {
        squads.squad.forEach(element => {
            if (element.experience < 50) {
                element.experience++;
            }
        });
    }

    public checkIfTheSimulatorIsFinished(squadsLength) {
       return squadsLength === 1 ? true : false;
    }

    private geometricMean(numbers: Array<any>) {
        return Math.pow(numbers.reduce((a, b) => a * b), 1 / numbers.length);
    }

    private calculateEachSoldierSuccess(squads) {
        const totalSuccess = [];
        squads.squad.forEach(element => {
            totalSuccess.push(0.5 * (1 + element.health / 100) * Math.floor(Math.random() * 100) + (50 + element.experience / 100));
        });
        return totalSuccess;
    }




}