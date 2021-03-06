import {NgModule} from '@angular/core';
import {BattleComponent} from './battle-container.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BattleCalculatorComponent} from './battle-simulator/battle-simulator.component';

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
