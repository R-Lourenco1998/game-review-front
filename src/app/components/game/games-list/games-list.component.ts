import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameDropdown } from 'src/app/model/game-dropdown';
import { Game } from 'src/app/model/Game.model';
import { Platform } from 'src/app/model/Platform.model';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { GamesFormComponent } from '../games-form/games-form.component';
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
  constructor(
    private gameService: GameService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(GamesFormComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.modalClosed.subscribe(() => {
      setTimeout(() => {
        this.getAllGames();
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.getAllGames();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
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
