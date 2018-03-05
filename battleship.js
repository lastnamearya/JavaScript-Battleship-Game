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

  // ships: [
  //   {
  //     locations: ["10", "20", "30"],
  //     hits: ["", "", ""]
  //   },
  //   {
  //     locations: ["32", "33", "34"],
  //     hits: ["", "", ""]
  //   },
  //   {
  //     locations: ["63", "64", "65"],
  //     hits: ["", "", ""]
  //   }],

  ships: [
    {
      locations: ["0", "0", "0"],
      hits: ["", "", ""]
    },
    {
      locations: ["0", "0", "0"],
      hits: ["", "", ""]
    },
    {
      locations: ["0", "0", "0"],
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
  },

  // **************************************************************** 
  // Automatically generating Ship Locations

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
        this.ships[i].locations = locations;
      }
    },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if(direction === 1) {
      // Generate a starting location for a horizontal ship
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * this.boardSize - this.shipLength);
    } else {
      // Generate s starting location for a vertical ship
        row = Math.floor(Math.random() * this.boardSize - this.shipLength);
        col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for(var i = 0; i < this.shipLength; i++){
      if(direction === 1) {
        // add location to array for new horizontal ship
        newShipLocations.push(row + "" + (col + i));
      } else {
        // add location to array for new vertical ship
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for(var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++){
        if(ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

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
        view.displayMessage('You sank all my battleship, in ' + this.guesses + " guesses");
      }
    }
  }
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if(guess === null || guess.length !== 2) {
    alert('Oops, please enter a letter and a number on the board.');
  } else {
    var firstChar = guess.charAt(0);
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

// *************************************************************** //

// Event Listeners of our App

function init() {
  var fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleKeyPress(e) {
  var fireButton = document.getElementById('fireButton');
  
  if(e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function handleFireButton() {
  var guessInput = document.getElementById('guessInput');
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

window.onload = init;

