import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage implements OnInit {
  valorReceita;
  dataReceita = new Date().toISOString();
  descricaoReceita;
  constructor(private modalController: ModalController) {
  }
  ngOnInit() {
  }
  close() {
    this.modalController.dismiss();
  }

}
