import {Component, OnInit, Input} from '@angular/core';
import {Soldiers} from '../../../../core/battle/models/soldiers.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})

export class BattleComponent implements Soldiers, OnInit  {
  battleForm: FormGroup;

 // Soldiers interface
  health = 0;
  recharge = 1000;
  experience = 0;

  numberOfArmies = 2;
  numberOfSquads = 2;
  numberOfUnits = 5;

  // property to determines that user has selected battle properties
  generateArmies = false;

  armies: any = [];

  constructor(  private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    console.log('Battle component', );
    this.battleForm = this.formBuilder.group({
      armys: ['', Validators.required],
      squads: ['', Validators.required],
      units: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.battleForm.controls;
  }

  onSubmit() {
    console.log('onSubm');

    if (this.battleForm.invalid) {
      return;
    }
    this.generateArmies = true;
    console.log('f', this.f);

    this.buildArmyColumns(this.f.armys.value);
  }

  private buildArmyColumns(armies):void {
    console.log('armies', armies);
    for (let i = 1; i <= armies; i++) {
      this.armies.push({name: 'army' + i});

    }
    console.log('armys', this.armies);


  }

}
