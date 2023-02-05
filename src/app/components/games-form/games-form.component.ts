import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/model/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.css'],
})
export class GamesFormComponent implements OnInit {
  public gameForm!: FormGroup;

  savedGame: any;

  imageList: File = new File([], '');
  imageCover: File = new File([], '');

  platforms: any[] = [];
  createGameId: number = 0;

  game: Game = {
    id: 0,
    name: '',
    description: '',
    genre: '',
    platform: '',
    releaseDate: '',
    developer: '',
    publisher: '',
    imageUrl: '',
    imageCoverUrl: '',
  };

  date: Date = new Date();

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      platform: ['', Validators.required],
      releaseDate: ['', Validators.required],
      developer: ['', Validators.required],
      publisher: ['', Validators.required],
    });

    this.gameService.findAllPlatformsDropdown().subscribe((data) => {
      this.platforms = data;
    });
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gameService: GameService
  ) {}

  cancel(): void {
    this.router.navigate(['games']);
    this.gameForm.reset();
  }

  onImageListChange(event: any) {
    this.imageList = event.target.files[0];
  }
  onImageCoverChange(event: any) {
    this.imageCover = event.target.files[0];
  }

  async onSubmit(){
    this.game.name = this.gameForm.get('name')?.value;
    this.game.description = this.gameForm.get('description')?.value;
    this.game.genre = this.gameForm.get('genre')?.value;
    this.game.platform = this.gameForm.get('platform')?.value;
    this.game.releaseDate = this.gameForm.get('releaseDate')?.value;
    this.game.developer = this.gameForm.get('developer')?.value;
    this.game.publisher = this.gameForm.get('publisher')?.value;

    this.gameService.createGame(this.game).subscribe(async (data) => {
      this.createGameId = data.id;
      await this.sendImageList(this.createGameId, this.imageList);
    });
  }

  sendImageList(id: number, imageList: File) {
      this.gameService.uploadImageList(imageList, id).subscribe().add(() => {
        this.sendImageCover(id, this.imageCover);
      });
  }

  sendImageCover(id: number, imageCover: File) {
    this.gameService.uploadImageCover(imageCover, id).subscribe();
    this.gameForm.reset();
    this.router.navigate(['games']);
  }
}
