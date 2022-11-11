import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../services/api.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss'],
})
export class PrincipalPage implements AfterViewInit, OnInit {
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

  salesData: ChartData<'doughnut'> = {
       labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai'],
       datasets: [
         {
           data: [1000, 1200, 1050, 1202, 503],
           borderWidth: 0,
           backgroundColor: [
             'rgb(239, 71, 111)',
             'rgb(255, 209, 102)',
             'rgb(6, 214, 160)',
             'rgb(17, 138, 178)',
             'rgb(8, 100, 103)',
           ],
         },
       ],
     };

  // chartLabels = [
  //   'Jan', 'Feb', 'Mar', 'Apr', 'Mai'
  // ];
  chartOptions = {
    responsive: true,
  };

  constructor(private apiService: ApiService,  private router: Router,
    ) {}

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

  ngOnInit() {
  }

  clickReceitas(){
    this.router.navigateByUrl('/tabs/receitas', { replaceUrl: true });
  }
  clickDespesas(){
    this.router.navigateByUrl('/tabs/despesas', { replaceUrl: true });
  }

  logout() {
    this.apiService.logout();
  }

  ngAfterViewInit() {}


}
