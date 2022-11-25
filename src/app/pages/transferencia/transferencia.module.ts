import { IonicCurrencyMaskModule } from './../../masks/ionic-currency-mask.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciaPageRoutingModule } from './transferencia-routing.module';

import { TransferenciaPage } from './transferencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciaPageRoutingModule,
    IonicCurrencyMaskModule
  ],
  declarations: [TransferenciaPage]
})
export class TransferenciaPageModule {}
