import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-receitas',
  templateUrl: 'receitas.page.html',
  styleUrls: ['receitas.page.scss']
})
export class ReceitasPage {
  url = environment.api_url;

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private loadingCtrl: LoadingController
    ) {}

  get todasReceitas() {
    return ApiService.todasReceitasMes;
  }

  conta(contaId){
    return ApiService.contas.find(c=>c.id === contaId).descricao;
  }

  categoria(categoriaId){
    return ApiService.categoriasReceitas.find(c=>c.id === categoriaId).descricao;
  }

  editaReceita(receitaId){

  }

  async apagaReceita(receitaId){
    const alert = await this.alertController.create({
      header: 'Deseja apagar está receita?',
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
            .delete<any>(`${this.url}/api/Receitas/${receitaId}`)
            .subscribe(async (data) => {
              if(data){
                const indexReceita = ApiService.todasReceitasMes.findIndex((x) => x.id === receitaId);

                const receita = ApiService.todasReceitasMes[indexReceita];
                const indexConta = ApiService.contas.findIndex((x) => x.id === receita.contaId);

                ApiService.contas[indexConta].saldoAtual -= receita.valor;
                ApiService.totalReceitasMes -= receita.valor;
                await this.atualizarSaldo(ApiService.contas[indexConta]);
                ApiService.todasReceitasMes.splice(indexReceita, 1);
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
