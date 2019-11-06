export interface AbstractSquadFactory {
  recharge: number;

  createSoldierSquad(n: number): any[];

  createVehiclesSquad(n: number): any[];
}
