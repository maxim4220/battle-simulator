import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Squads} from './helper-classes/squads';

@Component({
  selector: 'app-battle-container',
  templateUrl: './battle-container.component.html',
  styleUrls: ['./battle-container.component.scss']
})

export class BattleComponent implements OnInit {
  // Battle configurations properties
  // The choice of attack strategy per army: random|weakest|strongest
  public strategies = ['random', 'weakest', 'strongest'];
  // The number of squads per army: 2 <= n
  public numberOfSquads = 10;
  // The number of units per squad: 5 <= n <= 10
  public numberOfUnits = [5, 6, 7, 8, 9, 10];
  // Forms
  public battleForm: FormGroup;
  public strategyForm: FormGroup;

  public squads: any = [];

  // property to determines that user has selected battle properties
  public generateArmies = false;
  public startCalculating = false;

  constructor(private formBuilder: FormBuilder) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.battleForm.controls;
  }

  ngOnInit() {
    this.battleForm = this.formBuilder.group({
      squads_number: [''],
      units: ['']
    });
  }

  public onSubmit() {
    if (this.battleForm.invalid) {
      return;
    }
    this.generateArmies = true;
    if (this.f.squads_number.value && this.f.units.value) {
      this.buildArmyColumns(+this.f.squads_number.value, +this.f.units.value);
    } else {
      // set by default if not selected 2 armies, 2 squads and 5 units.
      this.buildArmyColumns(2, 5);
    }

  }

  public onCheckChange(event, army): void {
    army.strategy = event.target.value;
  }

  // Form the soldiers groups. Add them to squads array.
  public generateSoldiersSquads(): void {
    this.squads.forEach(element => {
      element = Object.assign(element, {squad: []});
      element.squad = new Squads().createSoldierSquad(element.units);
      element.totalHealth = 100 * element.units;
      element.recharge = Math.floor(Math.random() * 100);
    });
    this.startCalculating = true;
  }

  private buildArmyColumns(squads_number, units): void {
    for (let i = 0; i < squads_number; i++) {
      const totalHealth = 0, recharge = 0;
      this.squads.push({name: 'squads' + i, strategy: 'random', squads_number, units, totalHealth, recharge});
    }
    this.strategyForm = this.formBuilder.group({
      strategy: [''],
    });
  }

}
