import { TabsPage } from './../../tabs/tabs.page';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage implements OnInit {
  url = environment.api_url;
  valorReceita;
  dataReceita = new Date().toISOString();
  descricaoReceita;
  categoriaSelecionada;
  contaSelecionada;

  loading: any;

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    // private alertController: AlertController,
    private http: HttpClient,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController
  ) {}

  get categorias() {
    return ApiService.categoriasReceitas;
  }

  get contas() {
    return ApiService.contas;
  }
  async ngOnInit() {}
  async close() {
    // const alert = await this.alertController.create({
    //   header: 'Tem certeza que deseja voltar?',
    //   cssClass: 'custom-alert',
    //   buttons: [
    //     {
    //       text: 'Não',
    //       cssClass: 'alert-button-cancel',
    //     },
    //     {
    //       text: 'Sim',
    //       cssClass: 'alert-button-confirm',
    //       handler: () => {
    //         this.modalController.dismiss();
    //       }
    //     },
    //   ],
    // });

    // await alert.present();
    this.modalController.dismiss();
  }

  async inserirReceita() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });

    loading.present();
    const body = {
      descricao: this.descricaoReceita,
      valor: this.valorReceita.replace('.', '').replace(',', '.'),
      categoriaId: this.categoriaSelecionada,
      contaId: this.contaSelecionada,
      dataTransacao: this.datepipe.transform(this.dataReceita, 'dd/MM/yyyy'),
    };
    this.http
      .post<any>(`${this.url}/api/Receitas`, body)
      .subscribe(async (data) => {
        const indexConta = ApiService.contas.findIndex((x) => x.id === body.contaId);

        ApiService.contas[indexConta].saldoAtual += parseFloat(body.valor);
        ApiService.totalReceitasMes += parseFloat(body.valor);

        await this.atualizarSaldo(ApiService.contas[indexConta]);
        loading.dismiss();
        this.modalController.dismiss();
      });
  }
  async atualizarSaldo(conta) {
    this.http
      .put<any>(`${this.url}/api/Contas/`+conta.id, conta)
      .subscribe((data) => {
        ApiService.defineTotalContas();
      });
  }
}
