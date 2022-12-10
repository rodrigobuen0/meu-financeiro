import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheContaPageRoutingModule } from './detalhe-conta-routing.module';

import { DetalheContaPage } from './detalhe-conta.page';
import { IonicCurrencyMaskModule } from 'src/app/masks/ionic-currency-mask.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheContaPageRoutingModule,
    IonicCurrencyMaskModule,
  ],providers: [
    DatePipe,
   ],
  declarations: [DetalheContaPage]
})
export class DetalheContaPageModule {}
