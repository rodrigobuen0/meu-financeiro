import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.api_url;

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    this.loadToken();
   }

   async loadToken() {
      await this.storage.create();
    const token = await this.storage.get('my-access-token');
    if (token) {
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${this.url}/users/secret`);
  }

  // Create new user
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  signUp(credentials: {usuario, senha}): Observable<any> {
    return this.http.post(`${this.url}/users`, credentials);
  }

  // Sign in a user and store access and refres token
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  login(credentials: {usuario, senha}): Observable<any> {
    return this.http.post(`${this.url}/auth`, credentials).pipe(
      switchMap((tokens: {jwtToken; refreshToken }) => {
        console.log(this.currentAccessToken);
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
      this.router.navigateByUrl('/', { replaceUrl: true });

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
        const httpOptions = {
          headers: new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
          }),
          body: {token}
        };
        return this.http.get(`${this.url}/refresh-token`, httpOptions);
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
}
