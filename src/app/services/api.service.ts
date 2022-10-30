import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap} from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  url = environment.api_url;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
   }

   async loadToken() {
    const token = await Preferences.get({ key: ACCESS_TOKEN_KEY });
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
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
        this.currentAccessToken = tokens.jwtToken;
        const storeAccess = Preferences.set({key: ACCESS_TOKEN_KEY, value: tokens.jwtToken});
        const storeRefresh = Preferences.set({key: REFRESH_TOKEN_KEY, value: tokens.refreshToken});
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
  const deleteAccess = Preferences.remove({ key: ACCESS_TOKEN_KEY });
      const deleteRefresh = Preferences.remove({ key: REFRESH_TOKEN_KEY });
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
  const refreshToken = from(Preferences.get({ key: REFRESH_TOKEN_KEY }));
  return refreshToken.pipe(
    switchMap(token => {
      if (token) {
        const httpOptions = {
          headers: new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${token}`
          })
        };
        return this.http.get(`${this.url}/auth/refresh`, httpOptions);
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
  return from(Preferences.set({ key: ACCESS_TOKEN_KEY, value: accessToken }));
}
}
