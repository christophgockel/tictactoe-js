var FakeAPI = function() {
  return {
    newGame: function(boardSize, gameMode, callback) {
      callback({board:[null, null, null, null, null, null, null, null, null], message: "next player..."});
    },
    play: function(move, successCallback, errorCallback) {
    }
  }
};
