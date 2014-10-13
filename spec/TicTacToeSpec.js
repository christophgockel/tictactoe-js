describe("TicTacToe", function() {
  var api;
  var ttt;
  var gridFixture;
  var statusFixture;

  beforeEach(function() {
    api = jasmine.createSpyObj("API", ["newGame", "play"]);
  });

  beforeEach(function() {
    var table = affix("table");
    var row = table.affix("tr");

    row.affix("td");
    row.affix("td");
    row.affix("td");

    gridFixture = table;
    statusFixture = affix("div");
    ttt = new TicTacToe(api, gridFixture, statusFixture);
  });

  it("defines the global module", function() {
    expect(TicTacToe).toBeDefined();
  });

  describe("#attachGridEvents()", function() {
    it("clicking a table cell triggers playing a move", function() {
      spyOn(ttt, "play");

      ttt.attachGridEvents();
      $(gridFixture).find("td").first().trigger("click");

      expect(ttt.play).toHaveBeenCalled();
    });
  });

  describe("#detachGridEvents()", function() {
    beforeEach(function() {
      var table = affix("table");
      var row = table.affix("tr");

      row.affix("td");
      row.affix("td");
      row.affix("td");

      gridFixture = table;
      ttt = new TicTacToe(api, gridFixture, statusFixture);
      ttt.attachGridEvents(gridFixture);
    });

    it("removes the click handlers from table cells", function() {
      ttt.detachGridEvents();
      $(gridFixture).find("td").eq(1).trigger("click");

      expect(api.play).not.toHaveBeenCalled();
    });
  });

  describe("#createNewGame()", function() {
    it("calls newGame() on the API", function() {
      var t = new TicTacToe(api, $(affix("table")));
      t.createNewGame("3x3", "human_human");

      expect(api.newGame).toHaveBeenCalledWith("3x3", "human_human", jasmine.any(Function));
    });

    xit("creates the initial grid", function() {
      var table = affix("table");
      var t = new TicTacToe(api, $(table));
      t.createNewGame("3x3", "human_human");

      expect(table.html()).toEqual(3);
    });

    xit("resets the status content", function() {
      $(statusFixture).text("some text");
      var tictactoe = new TicTacToe(api, gridFixture, statusFixture);
      tictactoe.createNewGame("3x3", "human_human");

      expect(statusFixture.html()).not.toEqual("some text");
    });
  });

  describe("#updateGrid()", function() {
    it("updates the cells in the grid", function() {
      ttt.updateGrid([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      $(gridFixture).find("td").each(function(index, element) {
        expect($(gridFixture).find("td").eq(index).html()).toEqual((index + 1).toString());
      });
    });
  });

  describe("#updateStatus()", function() {
    it("updates the text of the status node", function() {
      ttt.updateStatus("some update");

      expect(statusFixture.html()).toEqual("some update");
    });
  });

  describe("#play", function() {
    beforeEach(function() {
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("plays rounds consecutively", function() {
      api.play.and.returnValue(42);

      ttt.play(2);
      jasmine.clock().tick(2);

      expect(api.play.calls.count()).toEqual(2);
    });

//    it("plays rounds until an error happens", function() {
//      var values = [true, true, false];
//      api.play.and.callFake(function() {
//        values.pop();
//      });
//
//      ttt.play(2);
//    });
  });
});
