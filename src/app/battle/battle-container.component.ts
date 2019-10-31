import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-battle',
  templateUrl: './battle-container.component.html',
  styleUrls: ['./battle-container.component.scss']
})

export class BattleComponent implements OnInit  {
  // Battle configurations properties
  // The number of armies: 2 <= n
  numberOfArmies = 6;
  // The choice of attack strategy per army: random|weakest|strongest
  strategies = ['random', 'weakest', 'strongest'];
  // The number of squads per army: 2 <= n
  numberOfSquads = 6;
  // The number of units per squad: 5 <= n <= 10
  numberOfUnits = [5, 6, 7, 8, 9, 10];
  // Forms.
  battleForm: FormGroup;
  strategyForm: FormGroup;


  // property to determines that user has selected battle properties
  generateArmies = false;
  armies: any = [];
  startCalculating = false;

  constructor(  private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.battleForm = this.formBuilder.group({
      armys: [''],
      squads: [''],
      units: ['']
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.battleForm.controls;
  }

  onSubmit() {
    console.log('onSubm', this.f);
    if (this.battleForm.invalid) {
      return;
    }
    this.generateArmies = true;
    this.buildArmyColumns(this.f.armys.value, this.f.squads.value, this.f.units.value);
  }

  onCheckChange(event, army) {
   army.strategy = event.target.value;
  }

  private buildArmyColumns(armies, squads, units): void {
    for (let i = 1; i <= armies; i++) {
      this.armies.push({name: 'army ' + i, strategy: 'random', squads, units});
    }
    this.strategyForm = this.formBuilder.group({
      strategy: [''],
    });
  }

}
