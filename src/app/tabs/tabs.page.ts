import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

import { ModalBaseComponent } from '../components/modal-base/modal-base.component';
import { ReceitaPage } from '../pages/receita/receita.page';
import { DespesaPage } from '../pages/despesa/despesa.page';
import { DespesaCartaoPage } from '../pages/despesa-cartao/despesa-cartao.page';
import { TransferenciaPage } from '../pages/transferencia/transferencia.page';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  async addReceita() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ModalBaseComponent,
      componentProps: {
        rootPage: ReceitaPage,
      },
    });

    await modal.present();
  }

  async addDespesa() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ModalBaseComponent,
      componentProps: {
        rootPage: DespesaPage,
      },
    });

    await modal.present();
  }

  async addTransferencia() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ModalBaseComponent,
      componentProps: {
        rootPage: TransferenciaPage,
      },
    });

    await modal.present();
  }

  async addDespesaCartao() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: ModalBaseComponent,
      componentProps: {
        rootPage: DespesaCartaoPage,
      },
    });

    await modal.present();
  }
}
