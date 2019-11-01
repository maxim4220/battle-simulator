import {NgModule} from '@angular/core';
import {BattleComponent} from './battle-container.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BattleCalculatorComponent } from './battle-soldiers/battle-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: BattleComponent,
    children: [
      {
        path: '',
        redirectTo: 'battle-simulator',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
    BattleComponent,
    BattleCalculatorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
})

export class BattleModule {
}
