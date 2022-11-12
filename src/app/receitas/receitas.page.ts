import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-receitas',
  templateUrl: 'receitas.page.html',
  styleUrls: ['receitas.page.scss']
})
export class ReceitasPage {

  constructor() {}

  get todasReceitas() {
    return ApiService.todasReceitasMes;
  }

  conta(contaId){
    return ApiService.contas.find(c=>c.id === contaId).descricao;
  }

  categoria(categoriaId){
    return ApiService.categorias.find(c=>c.id === categoriaId).descricao;
  }
}
