// interface all strategy algorithms must implement.
import {Attacktrategy} from '../interfaces/attack-strategy.interface';


export class RandomAttack implements Attacktrategy {
  attack(SquadsArray, attackingSquad) {
    function randNum(arr, exclude) {
      const randNumber = Math.floor(Math.random() * SquadsArray.length);
      if (SquadsArray[randNumber] === attackingSquad) {
        return randNum(SquadsArray, attackingSquad);
      } else {
        return [SquadsArray[randNumber], attackingSquad];
      }
    }

    return randNum(SquadsArray, attackingSquad);
  }
}

export class WeakestAttack implements Attacktrategy {
  // implementation here. Must find the weakest squad and attack. Weakest by health of by experience???
  attack(SquadsArray, attackingSquad) {

    const result = SquadsArray.reduce(function(res, obj) {
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
  attack(SquadsArray, attackingSquad) {
    // implementation here. Must find the strongest squad and attack. Weakest by health of by experience???
    const result = SquadsArray.reduce(function(res, obj) {
      return obj.totalHealth > res.totalHealth ? obj : res;
    });
    if (result !== attackingSquad) {
      return [result, attackingSquad];
    } else {
      return new RandomAttack().attack(SquadsArray, attackingSquad);
    }
  }
}

