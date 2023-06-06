import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/model/Game.model';
import { Platform } from 'src/app/model/Platform.model';
import { Genre } from 'src/app/model/Genre.model';
import { GameService } from 'src/app/services/game.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-games-form',
  templateUrl: './games-form.component.html',
  styleUrls: ['./games-form.component.css'],
})
export class GamesFormComponent implements OnInit {
  public gameForm!: FormGroup;

  @ViewChild('fileInputList') fileInputList: any;
  @ViewChild('fileInputCover') fileInputCover: any;
  @Output() modalClosed = new EventEmitter();
  platforms: Platform[] = [];
  genres: Genre[] = [];
  game = new Game();
  savedGame = new Game();
  date: Date = new Date();
  imageList: File = new File([], '');
  imageCover: File = new File([], '');

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

    this.gameService.findAllGenreDropdown().subscribe((data) => {
      this.genres = data;
    });
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gameService: GameService,
    private dialogRef: MatDialogRef<GamesFormComponent>
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

  async onSubmit() {
    this.game.name = this.gameForm.get('name')?.value;
    this.game.description = this.gameForm.get('description')?.value;
    this.game.genres = this.gameForm.get('genre')?.value;
    this.game.platforms = this.gameForm.get('platform')?.value;
    this.game.releaseDate = this.gameForm.get('releaseDate')?.value;
    this.game.developer = this.gameForm.get('developer')?.value;
    this.game.publisher = this.gameForm.get('publisher')?.value;

    this.gameService.createGame(this.game).subscribe(async (data) => {
      await this.sendImageList(data.id, this.imageList);
    });
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
    this.modalClosed.emit();
  }

  sendImageList(id: number, imageList: File) {
    this.gameService
      .uploadImageList(imageList, id)
      .subscribe()
      .add(() => {
        this.sendImageCover(id, this.imageCover);
      });
  }

  sendImageCover(id: number, imageCover: File) {
    this.gameService.uploadImageCover(imageCover, id).subscribe();
    this.gameForm.reset();
    this.router.navigate(['games']);
  }

  errorValidDescription() {
    if (this.gameForm.get('description')?.invalid) {
      return 'O campo descrição deve conter no mínimo 50 caracteres';
    }
    return false;
  }
}
