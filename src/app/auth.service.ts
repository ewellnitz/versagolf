import { Injectable } from '@angular/core';
import '../../node_modules/msal/out/msal';
/// <reference path="../../node_modules/msal/out/msal.d.ts" />

@Injectable()
export class AuthService {

  constructor() {
    console.log('auth service ctor');
    // this.userAgentApplication = new UserAgentApplication(this.tenantConfig.clientID, authority,
    //   function (errorDesc: any, token: any, error: any, tokenType: any) {
    //     // Called after loginRedirect or acquireTokenPopup
    //   });
  }
  private accessToken = '';

  tenantConfig = {
    tenant: 'platinumsoft.onmicrosoft.com',
    clientID: 'feb52db1-9bf2-4f83-a461-e64dfc63c314',
    signUpSignInPolicy: 'B2C_1_sign_up_sign_in',
    b2cScopes: ['https://platinumsoft.onmicrosoft.com/versagolfapi/versagolf.read']
  };
  private authority = `https://login.microsoftonline.com/tfp/${this.tenantConfig.tenant}/${this.tenantConfig.signUpSignInPolicy}`;
  private userAgentApplication = new Msal.UserAgentApplication(this.tenantConfig.clientID, this.authority,
    function (errorDesc: any, token: any, error: any, tokenType: any) {
      // Called after loginRedirect or acquireTokenPopup
    });

  signIn() {
    this.userAgentApplication.loginPopup(this.tenantConfig.b2cScopes).then(idToken => {
      this.userAgentApplication.acquireTokenSilent(this.tenantConfig.b2cScopes).then(token1 => {
        localStorage.setItem('access_token', token1);
      }, error => {
        console.error(error);
        this.userAgentApplication.acquireTokenPopup(this.tenantConfig.b2cScopes).then(token2 => {
        }, function (error2) {
          console.error(error2);
        });
      });
    }, error => {
      console.error(error);
    });
  }

  signOut(): void {
    this.userAgentApplication.logout();
  }

  isSignedIn(): boolean {
    return this.userAgentApplication.getUser() != null;
  }

  getToken() {
    return localStorage.getItem('access_token');
    // return this.accessToken;
    // return this.userAgentApplication.acquireTokenSilent(this.tenantConfig.b2cScopes).then(accessToken => {
    //   console.log(accessToken);
    //   return accessToken;
    // }, error => {
    //   this.userAgentApplication.acquireTokenPopup(this.tenantConfig.b2cScopes).then(accessToken => {
    //     console.log(accessToken);
    //     return accessToken;
    //   }, error2 => {
    //     console.error(error2);
    //   });
    // });


    // return this.userAgentApplication.acquireTokenSilent(this.tenantConfig.b2cScopes)
    //   .then(accessToken => {
    //     return accessToken;
    //   }, error => {
    //     return this.userAgentApplication.acquireTokenPopup(this.tenantConfig.b2cScopes)
    //       .then(accessToken => {
    //         return accessToken;
    //       }, err => {
    //         console.error(err);
    //       });
    //   });


    // return this.accessToken;
  }

  getUserName(): any {
    const user = this.userAgentApplication.getUser();
    if (user == null) {
      return '';
    }
    return user.name;
  }
}
