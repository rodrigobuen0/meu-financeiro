import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriaCatReceitasPageRoutingModule } from './cria-cat-receitas-routing.module';

import { CriaCatReceitasPage } from './cria-cat-receitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriaCatReceitasPageRoutingModule
  ],
  declarations: [CriaCatReceitasPage]
})
export class CriaCatReceitasPageModule {}
