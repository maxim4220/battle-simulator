import { Vehicles } from '../models/vehicles.model';
import { Soldiers } from '../models/soldiers.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battle-calculator',
  templateUrl: './battle-calculator.component.html',
  styleUrls: ['./battle-calculator.component.scss']
})
export class BattleCalculatorComponent implements  OnInit {
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
    console.log('armies in calculator', this.armies);
    console.log('solder', this.soldier ) ;
    console.log('vehicle', this.vehicle ) ;

  }

}
