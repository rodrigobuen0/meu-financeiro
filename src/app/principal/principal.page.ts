import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../services/api.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss'],
})
export class PrincipalPage implements AfterViewInit, OnInit {
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

  chartData = [
    {
      data: [27, 45, 62, 12],
      label: 'Men',
      borderWidth: 0,
      hidden: false
    },
  ];
  salesData: ChartData<'doughnut'> = {
       labels: ['Jan', 'Feb', 'Mar'],
       datasets: [
         {
           label: 'Mobiles',
           data: [1000, 1200, 1050],
           borderWidth: 0,
           backgroundColor: [
             'rgb(255, 99, 132)',
             'rgb(54, 162, 235)',
             'rgb(255, 205, 86)',
           ],
         },
       ],
     };
  dataSet = [

  ];

  chartLabels = [
    'Jan', 'Feb', 'Mar', 'Apr'
  ];
  chartOptions = {
    responsive: true,
  };

  // secretData = null;
  // salesData: ChartData<'doughnut'> = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  //   datasets: [
  //     {
  //       label: 'Mobiles',
  //       data: [1000, 1200, 1050],
  //       borderWidth: 0,
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(54, 162, 235)',
  //         'rgb(255, 205, 86)',
  //       ],
  //     },
  //   ],
  // };
  // chartOptions: ChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { display: false },
  //     title: {
  //       display: false,
  //       text: 'Monthly Sales Data',
  //     },
  //   },
  // };

  constructor(private apiService: ApiService) {}

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

  logout() {
    this.apiService.logout();
  }

  ngAfterViewInit() {}
}
