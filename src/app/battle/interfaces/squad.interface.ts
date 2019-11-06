
export interface AbstractSquadFactory {
    createSoldierSquad(n: number): any[];
    createVehiclesSquad(n: number): any[];
}