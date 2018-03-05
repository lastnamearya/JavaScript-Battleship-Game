// It's an MVC App

// View Object, responsible for the view of our Game

var view = {

  displayMessage: function(msg) {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
}

// Display for the user

view.displayMessage('Tap tap, is this thing on?');

// *************************************************************** //

// Model object, which controls the state of our Game

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    {
      locations: ["10", "20", "30"],
      hits: ["", "", ""]
    },
    {
      locations: ["32", "33", "34"],
      hits: ["", "", ""]
    },
    {
      locations: ["63", "64", "65"],
      hits: ["", "", ""]
    }],

  fire: function(guess){
    for(var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if(index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage('HIT');
        if (this.isSunk(ship)){
          view.displayMessage("You sank my batleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },

  isSunk: function(ship) {
    for(var i = 0; i < this.shipLength; i++){
      if(ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
}

// *************************************************************** //

// Controller of our App


var controller = {
  guesses: 0,

  processGuess: function(guess){
    var location = parseGuess(guess);
    console.log(location);

    if(location){
      this.guesses++;
      var hit = model.fire(location);
      if(hit && model.shipSunk === model.numShips) {
        view.displayMessage('You sank all my battleship, in' + this.guesses + " guesses");
      }
    }
  }
};

// Test Drive of our Controller's ProcessGuess
controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if(guess === null || guess.length !== 2) {
    alert('Oops, please enter a letter and a number on the board.');
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if(isNaN(row) || isNaN(column)) {
      alert("Ops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Oops, that off the board");
    } else {
      return row + column;
    }
  }
  return null;
}

