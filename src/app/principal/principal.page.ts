import { filter } from 'rxjs/operators';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss'],
})
export class PrincipalPage implements AfterViewInit, OnInit {
  chart: any = [];
  constructor(private apiService: ApiService, private router: Router) {
    Chart.register(...registerables);
  }

  get totalContas() {
    return ApiService.totalContas;
  }

  get contas() {
    return ApiService.contas;
  }

  get totalReceitasMes() {
    return ApiService.totalReceitasMes;
  }

  get totalDespesasMes() {
    return ApiService.totalDespesasMes;
  }

  get legendaChart() {
    return this.categoriasChartNome();
  }

  get valorChart() {
    return this.categoriasChartValores();
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.categoriasChartNome(),
        datasets: [
          {
            data: this.categoriasChartValores(),
            label: 'Gastos por Categoria',
            backgroundColor: [
              'rgb(239, 71, 111)',
              'rgb(255, 209, 102)',
              'rgb(6, 214, 160)',
              'rgb(17, 138, 178)',
              'rgb(8, 100, 103)',
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }

  categoriasChartNome() {
    const nomesCat = [];
    // eslint-disable-next-line guard-for-in
    for (const despesaId in ApiService.despesasAgrupadas) {
      const categoriaNome = ApiService.categoriasDespesas.find(
        (c) => c.id === despesaId
      ).descricao;
      nomesCat.push(categoriaNome);
    }
    return nomesCat;
  }

  categoriasChartValores() {
    const valoresCat = [];
     for (const despesaId in ApiService.despesasAgrupadas) {
      if (ApiService.despesasAgrupadas.hasOwnProperty(despesaId)){
        const depesas = ApiService.todasDespesasMes.filter(c => c.id === despesaId);
         valoresCat.push(ApiService.despesasAgrupadas[despesaId].reduce((accumulator, object) => accumulator + object.valor, 0));
       }
      }
    return valoresCat;
  }

  corLegendaChart(i){
    const cores = [
      'rgb(239, 71, 111)',
      'rgb(255, 209, 102)',
      'rgb(6, 214, 160)',
      'rgb(17, 138, 178)',
      'rgb(8, 100, 103)',
    ];
    return cores[i];
  }
  clickReceitas() {
    this.router.navigateByUrl('/tabs/receitas', { replaceUrl: true });
  }
  clickDespesas() {
    this.router.navigateByUrl('/tabs/despesas', { replaceUrl: true });
  }

  logout() {
    this.apiService.logout();
  }

  ngAfterViewInit() {}
}

