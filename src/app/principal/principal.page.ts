import { AfterViewInit, Component } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class PrincipalPage implements AfterViewInit{

  constructor() {

}


  ngAfterViewInit() {
    c3.generate({
    bindto: '#chart',
        data: {
            columns: [
                ['data1', 30],
                ['data2', 50]
            ],
            type : 'donut',
        },
        legend: {
            position: 'right'
        },tooltip: {
          show: false
      }
    });
}
}
