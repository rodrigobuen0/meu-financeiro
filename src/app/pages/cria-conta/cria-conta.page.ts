import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cria-conta',
  templateUrl: './cria-conta.page.html',
  styleUrls: ['./cria-conta.page.scss'],
})
export class CriaContaPage implements OnInit {
  url = environment.api_url;
  descricaoConta;
  tipoDaConta: number;
  loading: any;
  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
  }
  async close() {
    this.modalController.dismiss();
  }
  async inserirConta() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });

    loading.present();
    const conta = {
      descricao: this.descricaoConta,
      tipoConta: Number(this.tipoDaConta),
    };
    this.http
      .post<any>(`${this.url}/api/Contas`, conta)
      .subscribe(async (data) => {

        ApiService.contas.push(data);

        loading.dismiss();
        this.modalController.dismiss();
      });
  }
}
