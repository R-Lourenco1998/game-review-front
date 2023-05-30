import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/user/username/${username}`);
  }
}
