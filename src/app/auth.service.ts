import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }
  login(): void {
    console.log('login');
  }

  logout(): void {

  }
}
