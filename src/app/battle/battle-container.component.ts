import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-battle-container',
  templateUrl: './battle-container.component.html',
  styleUrls: ['./battle-container.component.scss']
})

export class BattleComponent implements OnInit {
  // Battle configurations properties
  // The number of armies: 2 <= n
  public numberOfArmies = 6;
  // The choice of attack strategy per army: random|weakest|strongest
  public strategies = ['random', 'weakest', 'strongest'];
  // The number of squads per army: 2 <= n
  public numberOfSquads = 6;
  // The number of units per squad: 5 <= n <= 10
  public numberOfUnits = [5, 6, 7, 8, 9, 10];
  // Forms
  public battleForm: FormGroup;
  public strategyForm: FormGroup;

  public squads:any = [];


  // property to determines that user has selected battle properties
  public generateArmies = false;
  public armies: any = [];
  public startCalculating = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.battleForm = this.formBuilder.group({
      armys: [''],
      squads_number: [''],
      units: ['']
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.battleForm.controls;
  }

  public onSubmit() {
    if (this.battleForm.invalid) {
      return;
    }
    this.generateArmies = true;
    if (this.f.squads_number.value && this.f.units.value) {
      this.buildArmyColumns(+this.f.armys.value, +this.f.squads_number.value, +this.f.units.value);
    } else {
      // set by default if not selected 2 armies, 2 squads and 5 units.
      this.buildArmyColumns(2, 2, 5);
    }
    this.startCalculating = true;
  }

  public onCheckChange(event, army) {
    army.strategy = event.target.value;
  }

  private buildArmyColumns(armies, squads_number, units): void {
    for (let i = 0; i < squads_number; i++) {
      this.squads.push({ name: 'squads' + i, strategy: 'random', squads_number, units });
     // this.armies.push({ name: 'army ' + i, strategy: 'random',squads_number, units });
    }
    this.strategyForm = this.formBuilder.group({
      strategy: [''],
    });
  }

}
