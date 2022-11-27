import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap, switchMap} from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage-angular';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public static categoriasReceitas: [Categorias];
  public static categoriasDespesas: [Categorias];
  public static contas: [Contas];
  public static totalContas: number;
  public static totalReceitasMes: number;
  public static todasReceitasMes: [Receitas];
  public static totalDespesasMes: number;
  public static todasDespesasMes: [Despesas];
  public static despesasAgrupadas: object;
  public static categoriasNomes: string[];
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.api_url;

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    this.loadToken();
   }

   public static defineTotalContas(){
      ApiService.totalContas = ApiService.contas.reduce((accumulator, object) => accumulator + object.saldoAtual, 0);
  }

   async loadToken() {
      await this.storage.create();
    const token = await this.storage.get('my-access-token');
    if (token) {
      console.log(token);
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
      await this.getCategoriasReceitas();
      await this.getCategoriasDespesas();
      await this.getContas();
      await this.getValorTotalReceitasMes();
      await this.getValorTotalDespesasMes();
    } else {
      this.isAuthenticated.next(false);
      this.router.navigateByUrl('/login', { replaceUrl: true });

    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${this.url}/users/secret`);
  }

  // Create new user
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  signUp(credentials): Observable<any> {
    let date; let month; let year;
const data = new Date(credentials.dataNascimento);
// eslint-disable-next-line prefer-const
date = data.getDate();
// eslint-disable-next-line prefer-const
month = data.getMonth() + 1; // take care of the month's number here ⚠️
// eslint-disable-next-line prefer-const
year = data.getFullYear();
if (date < 10) {
  date = '0' + date;
}

if (month < 10) {
  month = '0' + month;
}
date = date
  .toString()
  .padStart(2, '0');

month = month
  .toString()
  .padStart(2, '0');
    const user = {
      primeiroNome: credentials.primeiroNome,
      ultimoNome: credentials.ultimoNome,
      telefone: credentials.telefone.replace(/[^0-9\s]/g, '').replace(/ /g,''),
      dataNascimento: `${date}/${month}/${year}`,
      cpf: credentials.cpf.replace(/[^0-9\s]/g, ''),
      // eslint-disable-next-line radix
      sexo: parseInt(credentials.sexo),
      email: credentials.email,
      hashSenha: credentials.senha,
    };
    console.log(JSON.stringify(user));
    return this.http.post(`${this.url}/users`, user);
  }

  // Sign in a user and store access and refres token
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  login(credentials: {usuario, senha}): Observable<any> {
    return this.http.post(`${this.url}/auth`, credentials).pipe(
      switchMap((tokens: {jwtToken; refreshToken }) => {
        this.currentAccessToken = tokens.jwtToken;
        const storeAccess = this.storage.set('my-access-token', tokens.jwtToken);
        const storeRefresh = this.storage.set('my-refresh-token',tokens.refreshToken);
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }
  // Potentially perform a logout operation inside your API
// or simply remove all local tokens and navigate to login
logout() {
  const deleteAccess = this.storage.remove('my-access-token');
      const deleteRefresh = this.storage.remove('my-refresh-token');
      Promise.all([deleteAccess, deleteRefresh]);
      this.isAuthenticated.next(false);
      this.router.navigateByUrl('/login', { replaceUrl: true });

  // return this.http.post(`${this.url}/auth/logout`, {}).pipe(
  //   switchMap(_ => {
  //     this.currentAccessToken = null;
  //     // Remove all stored tokens
  //     const deleteAccess = Preferences.remove({ key: ACCESS_TOKEN_KEY });
  //     const deleteRefresh = Preferences.remove({ key: REFRESH_TOKEN_KEY });
  //     return from(Promise.all([deleteAccess, deleteRefresh]));
  //   }),
  //   tap(_ => {
  //     this.isAuthenticated.next(false);
  //     this.router.navigateByUrl('/', { replaceUrl: true });
  //   })
  // ).subscribe();
}

// Load the refresh token from Preferences
// then attach it as the header for one specific API call
getNewAccessToken() {
  const refreshToken = from(this.storage.get('my-refresh-token'));
  return refreshToken.pipe(
    switchMap(token => {
      if (token) {
        return this.http.post(`${this.url}/refresh-token`, { token });
      } else {
        // No stored refresh token
        return of(null);
      }
    })
  );
}

// Store a new access token
storeAccessToken(accessToken) {
  this.currentAccessToken = accessToken;
  return from(this.storage.set('my-access-token', accessToken));
}
// Store a new refresh token
storeRefreshToken(refreshToken) {
  return from(this.storage.set('my-refresh-token', refreshToken));
}

async getCategoriasReceitas(){
  this.http.get<any>(`${this.url}/api/CategoriasReceitas`).subscribe(data => {
    ApiService.categoriasReceitas = data;
    this.storage.set('categoriasReceitas', data);
  });
}

async getCategoriasDespesas(){
  this.http.get<any>(`${this.url}/api/CategoriasDespesas`).subscribe(data => {
    ApiService.categoriasDespesas = data;
    this.storage.set('categoriasDespesas', data);
  });
}

async getContas(){
  this.http.get<any>(`${this.url}/api/Contas`).subscribe(data => {
    ApiService.contas = data;
    ApiService.totalContas = ApiService.contas.reduce((accumulator, object) => accumulator + object.saldoAtual, 0);
    this.storage.set('contas', data);
  });
}

async getValorTotalReceitasMes(){
  this.http.get<any>(`${this.url}/api/Receitas/ReceitasMes`)
  .subscribe((data) => {
    ApiService.totalReceitasMes = data.reduce((accumulator, object) => accumulator + object.valor, 0);
    ApiService.todasReceitasMes = data;
  });
}

async getValorTotalDespesasMes(){
  this.http.get<any>(`${this.url}/api/Despesas/DespesasMes`)
  .subscribe(async (data) => {
    ApiService.totalDespesasMes = data.reduce((accumulator, object) => accumulator + object.valor, 0);
    ApiService.todasDespesasMes = data;
    ApiService.despesasAgrupadas = await this.valoresCategorias();
    this.router.navigateByUrl('/tabs', { replaceUrl: true });

  });
}

async valoresCategorias(){
  const group = ApiService.todasDespesasMes.reduce((r, a) => {
    r[a.categoriaId] = [...r[a.categoriaId] || [], a];
    return r;
   }, {});
   return group;
}

}

interface Contas {
  id: string;
  descricao: string;
  saldoAtual: number;
  tipoConta: number;
  userId: string;
}

interface Categorias {
  id: string;
  descricao: string;
  userId: string;
}

interface Receitas {
  id: string;
  descricao: string;
  valor: number;
  dataTransacao: Date;
  categoriaId: string;
  contaId: string;
  userId: string;
}

interface Despesas {
  id: string;
  descricao: string;
  valor: number;
  dataTransacao: Date;
  categoriaId: string;
  contaId: string;
  userId: string;
}

