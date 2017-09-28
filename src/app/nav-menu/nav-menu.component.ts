import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public userName = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signIn(): void {
    this.authService.signIn();
    this.userName = this.authService.getUserName();
  }

  signOut(): void {
    this.authService.signOut();
    this.userName = '';
  }

  isOnline(): boolean {
    this.userName = this.authService.getUserName();
    return this.authService.isSignedIn();
  }

}
