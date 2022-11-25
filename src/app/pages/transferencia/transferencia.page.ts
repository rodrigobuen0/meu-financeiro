import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.page.html',
  styleUrls: ['./transferencia.page.scss'],
})
export class TransferenciaPage implements OnInit {
  url = environment.api_url;
  valorTransferencia;
  observacaoTransferencia;
  dataTransferencia = new Date().toISOString();
  contaEntrada;
  contaSaida;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController
  ) { }

  get contas() {
    return ApiService.contas;
  }

  ngOnInit() {
  }

  async close() {
    this.modalController.dismiss();
  }

  async inserirTransferencia() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });

    loading.present();
    const body = {
      observacao: this.observacaoTransferencia,
      valor: this.valorTransferencia.replace('.', '').replace(',', '.'),
      contaEntradaId: this.contaEntrada,
      contaSaidaId: this.contaSaida,
      data: this.datepipe.transform(this.dataTransferencia, 'dd/MM/yyyy'),
    };
    this.http
      .post<any>(`${this.url}/api/Transferencias`, body)
      .subscribe(async (data) => {
        const indexContaEntrada = ApiService.contas.findIndex((x) => x.id === body.contaEntradaId);
        const indexContaSaida = ApiService.contas.findIndex((x) => x.id === body.contaSaidaId);

        ApiService.contas[indexContaEntrada].saldoAtual += parseFloat(body.valor);
        ApiService.contas[indexContaSaida].saldoAtual -= parseFloat(body.valor);

        await this.atualizarSaldo(ApiService.contas[indexContaEntrada]);
        await this.atualizarSaldo(ApiService.contas[indexContaSaida]);
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
