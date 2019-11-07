// interface all strategy algorithms must implement.
import {Attacktrategy} from '../interfaces/attack-strategy.interface';


export class RandomAttack implements Attacktrategy {
 public attack(SquadsArray, attackingSquad) {
 let defending = SquadsArray[Math.round((Math.random()*SquadsArray.length))];
  if (defending == attackingSquad || defending == undefined){
    return this.attack(SquadsArray, attackingSquad);
  } 
  let res = [defending, attackingSquad];
  return res;
  }
}

export class WeakestAttack implements Attacktrategy {
  // implementation here. Must find the weakest squad and attack. Weakest by health of by experience???
  public attack(SquadsArray, attackingSquad) {
    const result = SquadsArray.reduce((res, obj) => {
      return obj.totalHealth < res.totalHealth ? obj : res;
    });
    if (result !== attackingSquad) {
      return [result, attackingSquad];
    } else {
      return new RandomAttack().attack(SquadsArray, attackingSquad);
    }
  }
}

export class StrongestAttack implements Attacktrategy {
  public attack(SquadsArray, attackingSquad) {
    // implementation here. Must find the strongest squad and attack. Weakest by health of by experience???
    const result = SquadsArray.reduce((res, obj) => {
      return obj.totalHealth > res.totalHealth ? obj : res;
    });
    if (result !== attackingSquad) {
      return [result, attackingSquad];
    } else {
      return new RandomAttack().attack(SquadsArray, attackingSquad);
    }
  }
}

