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
  private accessToken: string;

  tenantConfig = {
    tenant: 'platinumsoft.onmicrosoft.com',
    clientID: 'feb52db1-9bf2-4f83-a461-e64dfc63c314',
    signUpSignInPolicy: 'B2C_1_sign_up_sign_in',
    b2cScopes: ['https://platinumsoft.onmicrosoft.com/versagolfapi/versagolf.read']
  };

  signIn(): void {
    console.log('signIn');
    const _this = this;
    this.userAgentApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
      _this.userAgentApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
        function (accessToken: any) {
          _this.accessToken = accessToken;
        },
        function (error: any) {
          _this.userAgentApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
            function (accessToken: any) {
              _this.accessToken = accessToken;
            },
            function (error1: any) {
              console.error('Error acquiring the popup:\n${error1}');
              // bootbox.alert(`Error acquiring the popup:\n${error}`);
            });
        });
    },
      function (error: any) {
        console.error('Error during login:\n${error}');
      });
  }

  signOut(): void {
    this.userAgentApplication.logout();
  }

  isSignedIn(): boolean {
    return this.userAgentApplication.getUser() != null;
  }

  getUserName(): any {
    const user = this.userAgentApplication.getUser();
    if (user == null) {
      return '';
    }
    return user.name;
  }
}
