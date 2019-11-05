import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


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

