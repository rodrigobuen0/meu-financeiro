import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriaCatDespesasPageRoutingModule } from './cria-cat-despesas-routing.module';

import { CriaCatDespesasPage } from './cria-cat-despesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriaCatDespesasPageRoutingModule
  ],
  declarations: [CriaCatDespesasPage]
})
export class CriaCatDespesasPageModule {}
