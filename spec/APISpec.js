describe("API", function() {
  var api;

  beforeEach(function() {
    this.api = new API({
      "new": "/some/api/new",
      "play": "/some/api/play"
    });
  });

  describe("#newGame", function() {
    beforeEach(function() {
      spyOn($, "ajax").and.callFake(function(request) {
        var deferred = $.Deferred();

        deferred.resolve(request.data);

        return deferred.promise();
      });
    });

    it("invokes callback on success", function() {
      var success = jasmine.createSpy("success handler");
      this.api.newGame("board_3x3", "human_human", success);

      expect(success).toHaveBeenCalled();
    });
  });
});
