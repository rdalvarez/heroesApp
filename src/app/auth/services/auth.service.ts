import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/enviroment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // http.post('login', { email, password });
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {this.user = user;}),
      tap((user) => {localStorage.setItem('token', 'asasdwqasd.asdsasdqwasd.asdsqasdwas');})
    );
  }

  checkAuthentication():Observable<boolean> {

    if ( !localStorage.getItem('token')) {
      return of(false);
    }

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ), // Cuando queremos saber si un objeto tiene un valor le ponemos !! el primer (!) niega el objeto entonces pone false
        catchError( err => of(false))
      );

  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }
}
