import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/game/games-list/games-list.component';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsComponent } from './components/game/game-details/game-details.component';
import { GamesFormComponent } from './components/game/games-form/games-form.component';
import { AuthGuard } from './guard/auth.guard';
import { SignComponent } from './components/auth/pages/sign/sign.component';

const routes: Routes = [
  { path: 'games', component: GamesListComponent },
  { path: '', component: SignComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games/details/:id', component: GameDetailsComponent },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: GamesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
