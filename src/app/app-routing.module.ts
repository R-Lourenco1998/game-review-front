import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GamesFormComponent } from './components/games-form/games-form.component';

const routes: Routes = [
  { path: 'games', component: GamesListComponent },
  { path: '', component: HomeComponent },
  { path: 'games/details/:id', component: GameDetailsComponent },
  { path: 'create', component: GamesFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
