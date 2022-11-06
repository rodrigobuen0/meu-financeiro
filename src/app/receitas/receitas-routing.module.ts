import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasPage } from './receitas.page';

const routes: Routes = [
  {
    path: '',
    component: ReceitasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
