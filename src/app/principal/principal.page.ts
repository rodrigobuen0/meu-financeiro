import { AfterViewInit, Component, OnInit  } from '@angular/core';
import { ApiService } from './../services/api.service';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class PrincipalPage implements AfterViewInit, OnInit{
  secretData = null;

  constructor(private apiService: ApiService,) {
  }

  get totalContas(){
    return ApiService.totalContas;
   }

   get contas(){
    return ApiService.contas;
   }

  ngOnInit() {

  }

  logout() {
    this.apiService.logout();
  }

  ngAfterViewInit() {
   // eslint-disable-next-line prefer-const
   let chart = c3.generate({
    bindto: '#chart',
    padding: {
      top: 5,
      right: 50,
      bottom: 5,
      left: 5,
  },
        data: {
            columns: [
                ['data1', 30],
                ['data2', 50]
            ],
            type : 'donut',
        },interaction: {
          enabled: false
        },
        legend: {
          show: false,
            position: 'right',
            padding: 15,
            item: {
              tile: {
                width: 10,
                height: 10,
              }
            }
        },
        size: {
          height: 120
        },
        tooltip: {
          show: false
      },donut: {
        label: {
          show: false,
        },
        width: 20
      }
    });
    d3.select('.legendaChart').insert('div', '.legend').attr('class', 'legend')  .insert('ul').attr('class', 'list-group')
    .selectAll('span')
    .data(['data1', 'data2'])
    .enter().append('li').attr('class', '')
    .insert('span').attr('class', 'dot')
    .each(function(id) {
      d3.select(this).style('background-color', chart.color(id));
    })
    .insert('div').attr('class', 'legend-label')
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    .attr('data-id', function(id) { return id; })
    .insert('span').attr('class', 'legend-label')
  // .each(function(id) {
  //   d3.select(this).style('background-color', chart.color(id));
  // })
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    .html(function(id) {return id; });

  }
}
