describe('View Manager', function(){
  describe('when creating a Backbone view', function(){
    var view;
    beforeEach(function(){
      view = new Backbone.View();
    });

    it('should provide a setView function', function(){
      expect(_.isFunction(view.setView)).toBe(true);
    });

    it('should provide a addSubView function', function(){
      expect(_.isFunction(view.addSubView)).toBe(true);
    });

    it('should provide a removeSubViews function', function(){
      expect(_.isFunction(view.removeSubViews)).toBe(true);
    });

    it('should provide a removeSubViewForModel function', function(){
      expect(_.isFunction(view.removeSubViewForModel)).toBe(true);
    });

    it('should provide a close function', function(){
      expect(_.isFunction(view.close)).toBe(true);
    });
  });

  describe('when rendering a Backbone view', function(){
    var view;
    beforeEach(function(){
      view = new Backbone.View();
    });

    it("should return itself for chaining methods", function(){
        expect(view.render()).toBe(view);
    });

    it("should trigger a rendered event", function() {
      var watcher = jasmine.createSpy("onRender");
      view.on('rendered',watcher);
      view.render();
      expect(watcher).toHaveBeenCalled();
    });
  });
});
