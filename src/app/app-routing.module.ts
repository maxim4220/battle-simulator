import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BattleComponent } from './battle/battle-container.component';


const routes: Routes = [
  {
    path: 'battle-simulator',
    //component: BattleComponent
    loadChildren: () => import('./battle/battle-container.module').then(m => m.BattleModule),
  },

  {path: '**', redirectTo: 'error/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

