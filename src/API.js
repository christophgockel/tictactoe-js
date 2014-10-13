var API = (function() {
  var endpoints = {};

  var constructor = function(endpoints) {
    this.endpoints = endpoints;
  };

  constructor.prototype.newGame = function(boardSize, gameMode, callback) {
    $.ajax({
      url: this.endpoints.new,
      type: "POST",
      data: {
        board_size: boardSize,
        game_mode: gameMode
      },
      dataType: "json",
      async: false,
    })
    .then(
      function(data, status, xhr) {
        returnData = data;
        callback(returnData);
      },
      function(xhr, status, error) {
        console.log(status, error);
      });
  };

  constructor.prototype.play = function(move, successCallback, errorCallback) {
    $.ajax({
      url: this.endpoints.play,
      type: "PUT",
      data: {
        move: move
      },
      dataType: "json",
      async: false,
      success: function(data, status, xhr) {
        returnData = data;
        successCallback(returnData);
      },
      error: function(xhr, status, error) {
        errorCallback(error);
      }
    });
  };

  return constructor;
}());
