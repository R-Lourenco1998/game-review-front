import { Component, OnInit } from '@angular/core';
import { KeyStorageUtil } from 'src/app/Util/KeyStorage.util';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  username: string = '';

  ngOnInit(): void {
    const userJson = localStorage.getItem(KeyStorageUtil.USER);

    if (userJson) {
      const user = JSON.parse(userJson);
      this.username = user.username;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout();
  }
}
