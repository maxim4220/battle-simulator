import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'battle-simulator',
    loadChildren: () => import('./views/pages/battle/battle.module').then(m => m.BattleModule),
  },

  {path: '**', redirectTo: 'error/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
