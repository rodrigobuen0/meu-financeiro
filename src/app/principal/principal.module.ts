import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrincipalPage } from './principal.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PrincipalPageRoutingModule } from './principal-routing.module';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PrincipalPageRoutingModule,
    NgChartsModule
  ],
  declarations: [PrincipalPage],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true }}
  ]
})
export class PrincipalPageModule {}
