import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-despesas',
  templateUrl: 'despesas.page.html',
  styleUrls: ['despesas.page.scss']
})
export class DespesasPage {

  constructor() {}
  get todasDespesas() {
    return ApiService.todasDespesasMes;
  }

  conta(contaId){
    return ApiService.contas.find(c=>c.id === contaId).descricao;
  }

  categoria(categoriaId){
    return ApiService.categoriasDespesas.find(c=>c.id === categoriaId).descricao;
  }
}
