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

// Test Drive of our Model Object

model.fire("53");
model.fire("06");
model.fire("16");

model.fire("26");
model.fire("34");
model.fire("44");

model.fire("12");
model.fire("11");
model.fire("10");
