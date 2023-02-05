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
    return this.http.get<Game[]>(`${this.baseUrl}/api/game`);
  }

  findAllPlatformsDropdown(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/game/platforms`);
  }

  findGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/game/${id}`);
  }

  findAllDropdown(): Observable<GameDropdown[]> {
    return this.http.get<GameDropdown[]>(`${this.baseUrl}/api/game/list`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/game`, game);
  }

  uploadImageList(imageList: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageList', imageList);
    return this.http.post(
      `${this.baseUrl}/api/game/image/list/${id}`,
      formData
    );
  }

  uploadImageCover(imageCover: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageCover', imageCover);
    return this.http.post(
      `${this.baseUrl}/api/game/image/cover/${id}`,
      formData
    );
  }
}
