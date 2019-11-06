export interface BattleCalculatorInterface {
    checkIfAttackingSquadWon(squads: any): boolean;
    addDamage(squads: any): void;
    incrementUnitsExperience(squads: any): void;
    checkIfTheSimulatorIsFinished(l: number): boolean;
}