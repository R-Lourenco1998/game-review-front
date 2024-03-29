import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeyStorageUtil } from '../Util/KeyStorage.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: String = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}
  public sign(payload: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<{ username: string; token: string }>(
        `${this.baseUrl}/api/user/auth`,
        payload
      )
      .pipe(
        switchMap((data) => {
          localStorage.removeItem(KeyStorageUtil.ACCESS_TOKEN);
          localStorage.setItem(KeyStorageUtil.ACCESS_TOKEN, data.token);
          return this.userService.findUserByUsername(data.username);
        }),
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['home']);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  public logout() {
    localStorage.removeItem(KeyStorageUtil.ACCESS_TOKEN);
    localStorage.removeItem(KeyStorageUtil.USER);
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(KeyStorageUtil.ACCESS_TOKEN);

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
