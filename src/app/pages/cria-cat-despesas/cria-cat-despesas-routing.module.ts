import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriaCatDespesasPage } from './cria-cat-despesas.page';

const routes: Routes = [
  {
    path: '',
    component: CriaCatDespesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriaCatDespesasPageRoutingModule {}
