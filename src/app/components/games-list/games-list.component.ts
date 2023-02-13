import { Component, OnInit } from '@angular/core';
import { GameDropdown } from 'src/app/model/game-dropdown';
import { Game } from 'src/app/model/Game.model';
import { Platform } from 'src/app/model/Platform.model';
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  gamesDropdown: GameDropdown[] = [];
  listGames: Game[] = [];
  selected = '';
  public AllGames: any;
  currentGame = new Game();

  platform = new Platform();
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames(): void {
    this.gameService.findAllGames().subscribe((data) => {
      this.listGames = data;
      this.AllGames = data;
    });
  }

  onGameChange(event: any) {
    if (event.value != null) {
      this.currentGame = event.value;
      this.getCurrentGame();
    }
  }

  getCurrentGame() {
    this.listGames.map((game) => {
      if (game.id == this.currentGame.id) {
        this.currentGame = game;
      }
    });
  }

  fillDropdown() {
    this.gameService.findAllDropdown().subscribe((data) => {
      this.gamesDropdown = data;
    });
  }
}
