
// In an OOP Language -
// TypeScript
// interface all sorting algorithms must implement
interface Attacktrategy {
  attack(SquadsArray);
}

class RandomAttack implements Attacktrategy {
  attack(SquadsArray):void {
      console.log("RandomAttack algorithm")
      // implementation here. Must find the weakest oposing squad and attack.
  }
}

class WeakestAttack implements Attacktrategy {
  attack(SquadsArray):void {
      console.log("WeakestAttack algorithm")
      // implementation here. Must find the weakest squad and attack. Weakest by health of by experience???
      
  }
}

class StrongestAttack implements Attacktrategy {
  attack(SquadsArray): void{
      console.log("StrongestAttack algorithm")
      // implementation here. Must find the strongest squad and attack. Weakest by health of by experience???

  }
}

export class AttackProgramm {
  private sortingStrategy: Attacktrategy
  constructor(public squadsArray: Array<Number>) {
  }

  public runAttack(attackStrategy: Attacktrategy) {
      return this.sortingStrategy.attack(this.squadsArray);
  }
}
// instantiate the `AttackProgramm` with an array of squads

const attackProgram = new AttackProgramm([9,2,5,3,8,4,1,8,0,3]) //!!! Array of squads must be provided.
// random attack
attackProgram.runAttack(new RandomAttack());
// weakest attack
attackProgram.runAttack(new WeakestAttack());
// strongest attack
attackProgram.runAttack(new StrongestAttack());