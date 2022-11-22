import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cria-cat-despesas',
  templateUrl: './cria-cat-despesas.page.html',
  styleUrls: ['./cria-cat-despesas.page.scss'],
})
export class CriaCatDespesasPage implements OnInit {
  url = environment.api_url;
  descricaoCategoria;
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
  async inserirCategoriaDespesa() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });

    loading.present();
    const categoria = {
      descricao: this.descricaoCategoria,
    };
    this.http
      .post<any>(`${this.url}/api/CategoriasDespesas`, categoria)
      .subscribe(async (data) => {

        ApiService.categoriasDespesas.push(data);

        loading.dismiss();
        this.modalController.dismiss();
      });
  }

}
