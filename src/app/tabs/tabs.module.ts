import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

import { SharedComponentsModule } from '../components/shared-components.module';
import { ReceitaPageModule } from './../pages/receita/receita.module';
import { DespesaPageModule } from './../pages/despesa/despesa.module';
import { DespesaCartaoPageModule } from './../pages/despesa-cartao/despesa-cartao.module';
import { TransferenciaPageModule } from './../pages/transferencia/transferencia.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedComponentsModule,
    ReceitaPageModule,
    DespesaPageModule,
    DespesaCartaoPageModule,
    TransferenciaPageModule
  ],
  declarations: [TabsPage],
  providers: [DatePipe]
})
export class TabsPageModule {}
