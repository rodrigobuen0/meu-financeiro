import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespesaPageRoutingModule } from './despesa-routing.module';

import { DespesaPage } from './despesa.page';

import { IonicCurrencyMaskModule } from './../../masks/ionic-currency-mask.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespesaPageRoutingModule,
    IonicCurrencyMaskModule
  ],
  declarations: [DespesaPage]
})
export class DespesaPageModule {}
