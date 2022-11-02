import { IonicCurrencyMaskModule } from './../../masks/ionic-currency-mask.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceitaPageRoutingModule } from './receita-routing.module';

import { ReceitaPage } from './receita.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceitaPageRoutingModule,
    IonicCurrencyMaskModule
  ],
  declarations: [ReceitaPage]
})
export class ReceitaPageModule {}
