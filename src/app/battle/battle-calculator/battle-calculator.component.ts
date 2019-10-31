import { Vehicles } from '../models/vehicles.model';
import { Soldiers, Soldier } from '../models/soldiers.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})
export class BattleCalculatorComponent implements  OnInit {

  a: Soldiers = {
    experience: 0,
    health: 100,
    recharge: 1000,
    getAtack(): number {
      return 1;
    }
  };

  soldier = {
    health: 100,
    recharge: Math.floor(Math.random() * 2000) + 100,
    experience: 0,
  };
  vehicle = {
    health: 100,
    recharge: Math.floor(Math.random() * 2000) + 1000,
    operators: 3
  };


  @Input() armies: any;
  constructor() { }

  ngOnInit() {
    console.log('a', this.a);
    const person: Soldiers = new Soldier();
    console.log('person', person);


    console.log('armies in calculator', this.armies);
    console.log('solder', this.soldier ) ;
    console.log('vehicle', this.vehicle ) ;

  }

}
