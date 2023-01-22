import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/Game';
import { GameDropdown } from '../model/game-dropdown';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient) {}

  findAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/game`);
  }

  findAllDropdown(): Observable<GameDropdown[]> {
    return this.http.get<GameDropdown[]>(`${this.baseUrl}/api/game/list`);
  }
}
