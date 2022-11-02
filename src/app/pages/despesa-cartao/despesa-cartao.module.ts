import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespesaCartaoPageRoutingModule } from './despesa-cartao-routing.module';

import { DespesaCartaoPage } from './despesa-cartao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespesaCartaoPageRoutingModule
  ],
  declarations: [DespesaCartaoPage]
})
export class DespesaCartaoPageModule {}
