import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/Game.model';
import { GameDropdown } from '../model/game-dropdown';
import { Platform } from '../model/Platform.model';
import { Genre } from '../model/Genre.model';
import { KeyStorageUtil } from '../Util/KeyStorage.util';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  baseUrl: String = environment.baseUrl;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(KeyStorageUtil.ACCESS_TOKEN);
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  findAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/game`, {
      headers: this.headers,
    });
  }

  findAllPlatformsDropdown(): Observable<Platform[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/game/platforms`, {
      headers: this.headers,
    });
  }

  findAllGenreDropdown(): Observable<Genre[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/game/genres`, {
      headers: this.headers,
    });
  }

  findGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/game/${id}`, {
      headers: this.headers,
    });
  }

  findAllDropdown(): Observable<GameDropdown[]> {
    return this.http.get<GameDropdown[]>(`${this.baseUrl}/api/game/list`, {
      headers: this.headers,
    });
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/game`, game, {
      headers: this.headers,
    });
  }

  uploadImageList(imageList: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageList', imageList);
    return this.http.post(
      `${this.baseUrl}/api/game/image/list/${id}`,
      formData,
      {
        headers: this.headers,
      }
    );
  }

  uploadImageCover(imageCover: File, id: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageCover', imageCover);
    return this.http.post(
      `${this.baseUrl}/api/game/image/cover/${id}`,
      formData, {
        headers: this.headers,
      }
    );
  }
}
