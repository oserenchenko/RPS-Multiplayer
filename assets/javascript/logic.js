  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDN0nHFpYx38EF5YVHurr6WOpnlkVtGttM",
    authDomain: "rps-multiplayer-952a1.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-952a1.firebaseio.com",
    projectId: "rps-multiplayer-952a1",
    storageBucket: "",
    messagingSenderId: "1048247113109"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //global variables
  var turn = 0;
  var player1Wins = 0;
  var player1Losses = 0;
  var player2Wins = 0;
  var player2Losses = 0;

  //function that populates the specified html location with rock, paper, scissors option buttons
  function gameReset(displayLocation) {
    var rpgOptionArr = ["Rock", "Paper", "Scissors"];
    for (var i = 0; i < rpgOptionArr.length; i++) {
      var newBtn = $('<button>');
      newBtn.attr({
        value: rpgOptionArr[i],
        class: 'rpgBtn'
      });
      newBtn.text(rpgOptionArr[i]);
      $(displayLocation).append(newBtn);
    }
    turn++;
    console.log(turn);
    database.ref().update({
      turn: turn
    });
  };

  $('#inputName').on('click', function (event) {
    event.preventDefault();
    var playerName = $('#nameOfPlayer').val().trim();
    database.ref('players/1').once("value", function (snapshot) {
      if (snapshot.exists() == false) {
        database.ref('players/1').set({
          name: playerName,
          wins: player1Wins,
          losses: player1Losses
        });
      } else {
        database.ref('players/2').once("value", function (snapshot) {
          if (snapshot.exists() == false) {
            database.ref('players/2').set({
              name: playerName,
              wins: player2Wins,
              losses: player2Losses
            });
          }
        });
      }
    });
  });


  database.ref('players/1').on("value", function (snapshot) {
    if (snapshot.exists()) {
      $('#player1Display').text('Player 1: ' + snapshot.val().name);
      $('#player1Score').text('Wins: ' + snapshot.val().wins + ' Losses: ' + snapshot.val().losses)
    }
  });

  database.ref('players/2').on("value", function (snapshot) {
    if (snapshot.exists()) {
      $('#player2Display').text('Player 2: ' + snapshot.val().name);
      $('#player2Score').text('Wins: ' + snapshot.val().wins + ' Losses: ' + snapshot.val().losses)
    }
  });

  database.ref('players/2').on("value", function (snapshot) {
    if (snapshot.exists()) {
      gameReset('#player1Display');
    }
  });


  $(document).on('click', '.rpgBtn', function (event) {
    event.preventDefault();
    var player1Choice = $(this).val();
    console.log(player1Choice);
    database.ref().on('value', function(snapshot) {
      if (snapshot.val().turn == 1) {
        console.log('yes');
    }
    })
  });