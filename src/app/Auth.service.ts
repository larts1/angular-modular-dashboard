// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

var   lock = new Auth0Lock('DmLilnkuHKUpG24aLEaYjsZDXlW1Tt5j', 'lartsi.eu.auth0.com', {});

@Injectable()
export class Auth {
  // Configure Auth0
  onLogOut = [];


  constructor() {
    // Add callback for lock `authenticated` event
    // Listening for the authenticated event
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        // console.log(localStorage.gettItem('profile'));
      });
    });
  }

  public onUser(id, doThis) {
    //rekisteröidään logout eventiksi
    this.onLogOut.push = doThis;

    if (this.authenticated()) {
      if(JSON.parse(localStorage.getItem("profile")).user_id == id)
      doThis(true); else doThis(false)
      return;
    }

    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (profile.user_id == id) doThis(true); else doThis(false);
      });
    });

  }

  public login() {
    // Call the show method to display the widget.
    lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');

    for (let key in this.onLogOut) {
      console.log("logged out and ran logout function");
      this.onLogOut[key](false);
    }
  }
}
