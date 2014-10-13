var TicTacToe = (function() {
  var constructor = function(api, grid, status) {
    this.api = api;
    this.grid = grid;
    this.status = status;
    this.interval = null;
  };

  var createGrid = function(cells) {
    var boardWidth = Math.sqrt(cells.length);
    $(this.grid).empty();

    for (var i = 0; i < boardWidth; i++) {
      var row = $("<tr>");

      for (var j = 0; j < boardWidth; j++) {
        row.append($("<td>"));
      }

      $(this.grid).append(row);
    }
  };

  var updateGame = function(data) {
    this.updateGrid(data.board);
    this.updateStatus(data.message);

    if (data.playable == false) {
      clearInterval(this.interval);
    }
  };

  var setupNewGame = function(data) {
    createGrid.call(this, data.board);
    updateGame.call(this, data);
  };

  var stopGame = function(errorText) {
    clearInterval(this.interval);
  };

  constructor.prototype.createNewGame = function(boardSize, gameMode) {
    this.api.newGame(boardSize, gameMode, setupNewGame.bind(this));
    this.attachGridEvents();
  };

  constructor.prototype.attachGridEvents = function() {
    var that = this;

    $(this.grid).find("td").each(function(index, element) {
      $(element).bind("click", function(event) {
        that.play(index + 1);
      });
    });
  };

  constructor.prototype.detachGridEvents = function() {
    $(this.grid).find("td").unbind("click");
  };

  constructor.prototype.updateGrid = function(cells) {
    $(this.grid).find("td").each(function(index, element) {
      var value = cells[index];

      if (value) {
        $(element).addClass(value);
        $(element).text(value);
      }
    });
  };

  constructor.prototype.updateStatus = function(message) {
    $(this.status).text(message);
  };

  constructor.prototype.play = function(location) {
    var that = this;
    var locations = [location];

    var thing = function() {
      that.api.play(locations.pop(), updateGame.bind(that), stopGame.bind(that));
    };

    this.interval = setInterval(thing, 1);
  };

  return constructor;
}());
