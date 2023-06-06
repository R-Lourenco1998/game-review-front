import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { KeyStorageUtil } from 'src/app/Util/KeyStorage.util';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  private userSubscription?: Subscription;
  public username?: string;

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getUserSubject()
      .subscribe((user) => {
        this.username = user.username;
      });

    const userJson = localStorage.getItem(KeyStorageUtil.USER);

    if (userJson) {
      const user = JSON.parse(userJson);
      this.username = user.username;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  logout(): void {
    this.username = '';
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
