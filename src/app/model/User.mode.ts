import { Game } from "./Game.model";

export class User{
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  permission?: string;
  games?: Game[];
}
