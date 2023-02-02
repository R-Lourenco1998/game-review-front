import { Component, OnInit } from '@angular/core';
import { GameDropdown } from 'src/app/model/game-dropdown';
import { Game } from 'src/app/model/Game';
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  gamesDropdown: GameDropdown[] = [];
  listGames: Game[] = [];
  selected = "";
  public AllGames: any;
  currentGame: Game = {
    id: 2,
    description: "Kratos e Atreus devem viajar pelos Nove Reinos em busca de respostas enquanto as forças asgardianas se preparam para uma batalha profetizada que causará o fim do mundo. Nessa jornada, eles explorarão paisagens míticas impressionantes e enfrentarão inimigos aterradores: deuses nórdicos e monstros.",
    genre: "Action",
    developer: "Sony Santa Monica",
    name: "God of War Ragnarök",
    platform: "Playstation 5",
    publisher: "Sony Interactive Entertainment",
    releaseDate: "2021-11-12T00:00:00.000+00:00",
    imageUrl: "",
    imageCoverUrl: ""
  };
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.fillDropdown();
    this.getAllGames();
    // this.getCurrentGame();
  }

  getAllGames(): void {
    this.gameService.findAllGames().subscribe((data) => {
      this.listGames = data;
      this.AllGames = data;
      console.log(this.AllGames)
    });
  }

  onGameChange(event: any) {
    if(event.value != null){
      this.currentGame = event.value
      this.getCurrentGame();
    }
  }

  getCurrentGame(){
    this.listGames.map((game) => {
      if (game.id == this.currentGame.id) {
        this.currentGame = game;
      }
    });
  }

  fillDropdown() {
    this.gameService.findAllDropdown().subscribe((data) => {
      this.gamesDropdown = data;
      console.log(this.gamesDropdown);
    });
  }
}
