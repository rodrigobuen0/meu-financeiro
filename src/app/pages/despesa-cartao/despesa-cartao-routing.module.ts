import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespesaCartaoPage } from './despesa-cartao.page';

const routes: Routes = [
  {
    path: '',
    component: DespesaCartaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesaCartaoPageRoutingModule {}
