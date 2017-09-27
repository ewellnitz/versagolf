import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msalx';

@Injectable()
export class AuthService {

  constructor() {
    const authority = `https://login.microsoftonline.com/tfp/${this.tenantConfig.tenant}/${this.tenantConfig.signUpSignInPolicy}`;
    this.userAgentApplication = new UserAgentApplication(this.tenantConfig.clientID, authority,
      function (errorDesc: any, token: any, error: any, tokenType: any) {
        // Called after loginRedirect or acquireTokenPopup
      });
  }

  private userAgentApplication: UserAgentApplication;
  private accessToken = '';

  tenantConfig = {
    tenant: 'platinumsoft.onmicrosoft.com',
    clientID: 'feb52db1-9bf2-4f83-a461-e64dfc63c314',
    signUpSignInPolicy: 'B2C_1_sign_up_sign_in',
    b2cScopes: ['https://platinumsoft.onmicrosoft.com/versagolfapi/versagolf.read']
  };

  signIn() {
    const _this = this;
    this.userAgentApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken) {
      // Login Success
      _this.userAgentApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(function (accessToken) {
        // AcquireToken Success
        // updateUI();
      }, function (error) {
        // AcquireToken Failure, send an interactive request.
        _this.userAgentApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(function (accessToken) {
          // updateUI();
        }, function (error2) {
          console.log(error2);
        });
      });
    }, function (error) {
      console.log(error);
    });
    // return this.userAgentApplication.loginPopup(this.tenantConfig.b2cScopes)
    //   .then(idToken => {
    //     const user = this.userAgentApplication.getUser();
    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   }, () => {
    //     return null;
    //   });
  }

  signOut(): void {
    this.userAgentApplication.logout();
  }

  isSignedIn(): boolean {
    return this.userAgentApplication.getUser() != null;
  }

  getToken() {
    return this.userAgentApplication.acquireTokenSilent(this.tenantConfig.b2cScopes)
      .then(accessToken => {
        return accessToken;
      }, error => {
        return this.userAgentApplication.acquireTokenPopup(this.tenantConfig.b2cScopes)
          .then(accessToken => {
            return accessToken;
          }, err => {
            console.error(err);
          });
      });


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
