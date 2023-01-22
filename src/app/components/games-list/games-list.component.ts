import { Component, OnInit } from '@angular/core';
import { GameDropdown } from 'src/app/model/game-dropdown';
import { GameService } from 'src/app/services/game.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  listGames: GameDropdown[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.fillDropdown();
  }

  fillDropdown(){
    this.gameService.findAllDropdown().subscribe((data) => {
      this.listGames = data;
    })
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
