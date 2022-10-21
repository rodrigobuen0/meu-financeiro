import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrincipalPage } from './principal.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PrincipalPageRoutingModule } from './principal-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
