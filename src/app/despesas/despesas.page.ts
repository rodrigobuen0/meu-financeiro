import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-despesas',
  templateUrl: 'despesas.page.html',
  styleUrls: ['despesas.page.scss']
})
export class DespesasPage {
  url = environment.api_url;

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {}
  get todasDespesas() {
    console.log(ApiService.todasDespesasMes);
    return ApiService.todasDespesasMes;
  }

  conta(contaId){
    return ApiService.contas.find(c=>c.id === contaId).descricao;
  }

  categoria(categoriaId){
    return ApiService.categoriasDespesas.find(c=>c.id === categoriaId).descricao;
  }
  editaDespesa(despesaId){
alert('edita despesa');
  }

  async apagaDespesa(despesaId){
    const alert = await this.alertController.create({
      header: 'Deseja apagar está despesa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Apagar!',
          role: 'confirm',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Incluindo...',
              spinner: 'circles',
            });
            loading.present();
            this.http
            .delete<any>(`${this.url}/api/Despesas/${despesaId}`)
            .subscribe(async (data) => {
              if(data){
                const indexDespesa = ApiService.todasDespesasMes.findIndex((x) => x.id === despesaId);

                const despesa = ApiService.todasDespesasMes[indexDespesa];
                const indexConta = ApiService.contas.findIndex((x) => x.id === despesa.contaId);

                ApiService.contas[indexConta].saldoAtual += despesa.valor;
                ApiService.totalDespesasMes += despesa.valor;
                await this.atualizarSaldo(ApiService.contas[indexConta]);
                ApiService.todasDespesasMes.splice(indexDespesa, 1);
                loading.dismiss();
              }else{
                loading.dismiss();
              }
          });
          },
        },
      ],
    });
    await alert.present();
  }

  async atualizarSaldo(conta) {
    this.http
      .put<any>(`${this.url}/api/Contas/`+conta.id, conta)
      .subscribe((data) => {
        ApiService.defineTotalContas();
      });
  }
}
