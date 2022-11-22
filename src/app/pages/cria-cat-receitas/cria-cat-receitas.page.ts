import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cria-cat-receitas',
  templateUrl: './cria-cat-receitas.page.html',
  styleUrls: ['./cria-cat-receitas.page.scss'],
})
export class CriaCatReceitasPage implements OnInit {
  url = environment.api_url;
  descricaoCategoria;
  loading: any;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {}
  async close() {
    this.modalController.dismiss();
  }
  async inserirCategoriaReceita() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });

    loading.present();
    const categoria = {
      descricao: this.descricaoCategoria,
    };
    this.http
      .post<any>(`${this.url}/api/CategoriasReceitas`, categoria)
      .subscribe(async (data) => {
        ApiService.categoriasReceitas.push(data);

        loading.dismiss();
        this.modalController.dismiss();
      });
  }
}
