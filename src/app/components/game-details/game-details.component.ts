import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/model/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: Game = {
    id: 1,
    name: "",
    description: "",
    genre: "",
    platform: "",
    releaseDate: "",
    developer: "",
    publisher: "",
    imageUrl: "",
    imageCoverUrl: ""
  };
  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getGameByid(id);
  }

  getGameByid(id: number) {
    this.gameService.findGameById(id).subscribe((data) => {
      this.game = data;
      console.log(data);
    });
  }
}
