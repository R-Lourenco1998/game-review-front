import { Platform } from './Platform.model';
import { Genre } from './Genre.model';

export class Game {
  id!: number;
  name!: string;
  description!: string;
  genres!: Genre[];
  genreNames!: any[];
  platforms!: Platform[];
  releaseDate!: string;
  developer!: string;
  publisher!: string;
  imageUrl!: string;
  imageCoverUrl!: string;
}
