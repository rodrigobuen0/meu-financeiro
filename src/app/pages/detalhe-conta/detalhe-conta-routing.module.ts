import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheContaPage } from './detalhe-conta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheContaPageRoutingModule {}
