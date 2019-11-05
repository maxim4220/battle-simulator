
// TypeScript
// interface all strategy algorithms must implement.
 interface Attacktrategy {
  attack(SquadsArray, attackingSquad);
}

export class RandomAttack implements Attacktrategy {
  attack(SquadsArray, attackingSquad){
    function randNum(arr, exclude){
      let randNumber = Math.floor(Math.random() * SquadsArray.length);
      if(SquadsArray[randNumber] == attackingSquad){
          return randNum(SquadsArray, attackingSquad);
      } else {
          const competing = [SquadsArray[randNumber], attackingSquad];
          return competing;
      }
    }
return randNum(SquadsArray, attackingSquad);
  }
}

export class WeakestAttack implements Attacktrategy {
  // implementation here. Must find the weakest squad and attack. Weakest by health of by experience???
  attack(SquadsArray, attackingSquad) {
      console.log("WeakestAttack algorithm")
      console.log('SquadsArray', SquadsArray);
      console.log('attackingSquad', attackingSquad);
     let result = SquadsArray.reduce(function(res, obj) {
        return (obj.totalHealth < res.totalHealth) ? obj : res;
    });
      
    if(result != attackingSquad) {
      return [result,attackingSquad];
    }

     
  }
}

export class StrongestAttack implements Attacktrategy {
  attack(SquadsArray, attackingSquad){
      console.log("StrongestAttack algorithm")
      // implementation here. Must find the strongest squad and attack. Weakest by health of by experience???
      let result = SquadsArray.reduce(function(res, obj) {
        return (obj.totalHealth > res.totalHealth) ? obj : res;
    });
      
    if(result != attackingSquad) {
      return [result,attackingSquad];
    }

  }
}

export class AttackProgramm {
  private sortingStrategy: Attacktrategy
  constructor(public squadsArray: Array<any>, public attackingSquad: any) {
    console.log('atack programm!');
    console.log('squadsArray', this.squadsArray);
  }

  public runAttack(attackStrategy: Attacktrategy) {
    if(attackStrategy) {
      return this.sortingStrategy.attack(this.squadsArray, this.attackingSquad);
    } else {
      console.log('no attack strategy!');
    }
  }
}

// instantiate the `AttackProgramm` with an array of squads
// const attackProgram = new AttackProgramm(this.squadsArray); //!!! Array of squads must be provided.
// // random attack
// attackProgram.runAttack(new RandomAttack());
// // weakest attack
// attackProgram.runAttack(new WeakestAttack());
// // strongest attack
// attackProgram.runAttack(new StrongestAttack());