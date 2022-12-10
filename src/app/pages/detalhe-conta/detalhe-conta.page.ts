import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalhe-conta',
  templateUrl: './detalhe-conta.page.html',
  styleUrls: ['./detalhe-conta.page.scss'],
})
export class DetalheContaPage implements OnInit {
  url = environment.api_url;
  contaId;
  dadosConta;
  totalContaNovo;
  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    public datepipe: DatePipe,
    private router: Router,
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.contaId = params.contaId;
      this.dadosConta = ApiService.contas.find((c) => c.id === params.contaId);
      this.totalContaNovo = formatter.format(this.dadosConta.saldoAtual);
    });
  }

  async close() {
    this.modalController.dismiss();
  }

  async reajustar() {
    const loading = await this.loadingCtrl.create({
      message: 'Incluindo...',
      spinner: 'circles',
    });
    loading.present();
    const vlrConta = parseFloat(this.totalContaNovo.replace('.','').replace(',','.'));
    if(vlrConta < this.dadosConta.saldoAtual){
      this.reajusteSaldo((this.dadosConta.saldoAtual - vlrConta) * -1, loading);
    }else if (vlrConta > this.dadosConta.saldoAtual){
      this.reajusteSaldo((vlrConta - this.dadosConta.saldoAtual), loading);
    }else{
      loading.dismiss();
      this.router.navigateByUrl('/tabs', {
        replaceUrl: true,
      });
    }

  }
  async reajusteSaldo(vlrReceita, loading){
    const body = {
      valor: vlrReceita,
      dataTransacao: this.datepipe.transform(new Date().toISOString(), 'dd/MM/yyyy'),
    };
    this.http
      .post<any>(`${this.url}/api/ReajustesSaldo`, body)
      .subscribe(async (data) => {
        const indexConta = ApiService.contas.findIndex((x) => x.id === this.contaId);

        ApiService.contas[indexConta].saldoAtual += parseFloat(body.valor);
        // ApiService.totalReceitasMes += parseFloat(body.valor);
        // ApiService.todasReceitasMes.push(data);
        await this.atualizarSaldo(ApiService.contas[indexConta]);
        loading.dismiss();
        this.router.navigateByUrl('/tabs', {
          replaceUrl: true,
        });
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
// Create our number formatter.
const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
