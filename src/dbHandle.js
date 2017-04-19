
  var config = {
                      apiKey: "AIzaSyCAJZpfZCyrcnZwOPcP2zcrSCOG-rENpk4",
                      authDomain: "lartsicontrol.firebaseapp.com",
                      databaseURL: "https://lartsicontrol.firebaseio.com",
                      storageBucket: "lartsicontrol.appspot.com",
                      messagingSenderId: "515613322085"
                  };
  firebase.initializeApp(config);

  var d = new Date();
  var daysInRow = "0";
  var str = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
  var yesterday = d.getDate()-1 + '-' + d.getMonth() + '-' + d.getFullYear();

  firebase.database().ref('/to').once('value').then(function(snapshot) {
  	$( "#to" ).val(snapshot.val());
  });

  firebase.database().ref('/dir').once('value').then(function(snapshot) {
  	daysInRow = snapshot.val();
    $("#dir").text(daysInRow);
  });

  firebase.database().ref('/episode').once('value').then(function(snapshot) {
  	$( "#episode" ).text(snapshot.val());
  });

  var toVal = firebase.database().ref('/to');
  toVal.on('value', function(snapshot) {
  	$( "#to" ).val(snapshot.val());
  });

  $( document ).ready(function() {
  	$( "#to" ).change( function() {
  		firebase.database().ref('/to').set(parseInt($(this).val()));
  		console.log($(this).val());
  	});

    $(".animeShow" ).hide();
    $(".exerciseShow" ).hide();
    $(".cardsShow").hide();

    for (key in shown) {
      console.log(key);
      if (shown[key] == "hidden") {
        $("." + key ).hide();
        $("." + key + "Show" ).show();
      } else {
        $("." + key ).show();
        $("." + key + "Show" ).hide();
      }
    }

    firebase.database().ref('log/'+str).once('value').then(function(snapshot) {
    if (snapshot.val() == 'done') $("#addDaily").hide();
    });
  });

  function openNew() {
  	window.open('http://ww1.gogoanime.io/one-piece-episode-'+ (
      parseInt($( "#episode").text())+1) );
  }

  function addToday() {
  	firebase.database().ref('log/' + str).set(
  	'done'
  	);

    firebase.database().ref('log/'+yesterday).once('value').then(function(snapshot) {
    if (snapshot.val() == 'done')
      firebase.database().ref("/dir").set(
    	daysInRow+1 );
    });

  	$("#addDaily").hide();
    $("#dir").text(daysInRow+1);
  }

var shown = {
  anime: "hidden",
  exercise: "hidden",
  cards: "hidden"
};
function toggle(class_) {
  if (shown[class_] != "hidden") {
    $("." + class_ ).hide(); //Piilottaa elementin
    $("." + class_ + "Show" ).show();
    $(".upper"+class_+" .toggleShow").attr("src", "img/plus.png")
    shown[class_] = "hidden";
  } else {
    $("." + class_ ).show(); // näyttää elementin
    $("." + class_ + "Show" ).hide();
    $(".upper"+class_+" .toggleShow").attr("src", "img/minus.png")
    shown[class_] = "shown";
  }
}
