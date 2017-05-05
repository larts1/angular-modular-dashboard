import { Injectable, EventEmitter } from '@angular/core';
declare var firebase: any ;



@Injectable()
export class FirebaseService {
  firebaseConfig = {
                      apiKey: "AIzaSyCAJZpfZCyrcnZwOPcP2zcrSCOG-rENpk4",
                      authDomain: "lartsicontrol.firebaseapp.com",
                      databaseURL: "https://lartsicontrol.firebaseio.com",
                      storageBucket: "lartsicontrol.appspot.com",
                      messagingSenderId: "515613322085"
                  };

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
  }

  bind(ref, element, url){
    firebase.database().ref(url).once('value').then(function(snapshot) {
      ref[element] = snapshot.val();
    });

    firebase.database().ref(url).on('value', function(snapshot) {
    	ref[element] = snapshot.val();
    });
  }

  getEpisode(series) {
    return firebase.database().ref("/epTrack/"+series+"/episode");
  }

  update(to, element) {
    firebase.database().ref(element).set(parseInt(to));
  }

  play(){
    firebase.database().ref('/pause').set(true);
  }

  pause() {
    firebase.database().ref('/pause').set(false);
  }

  getAnimes(ref, element) {
    firebase.database().ref("/epTrack").on('value', function(snapshot) {
      element.length = 0;
      for (let key in snapshot.val()) {
        element.push(key);
      }
      ref.getDates();
    });
  }

  getUrl(ref, element, name) {
    firebase.database().ref("/epTrack/"+name+"/url").on('value', function(snapshot) {
      console.log(snapshot.val())
      ref[element] = snapshot.val();
    });
  }
}
