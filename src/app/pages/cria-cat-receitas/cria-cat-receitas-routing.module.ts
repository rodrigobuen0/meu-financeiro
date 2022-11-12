import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriaCatReceitasPage } from './cria-cat-receitas.page';

const routes: Routes = [
  {
    path: '',
    component: CriaCatReceitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriaCatReceitasPageRoutingModule {}
