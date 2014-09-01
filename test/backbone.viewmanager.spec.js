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
      view.template = _.template('<table></table>');
    });

    it("should return itself for chaining methods", function(){
      expect(view.render()).toBe(view);
    });

    it('should render the template as the first child', function(){
      view.render();
      expect(view.$el.children().first().prop('nodeName')).toEqual('TABLE');
    });

    it("should trigger a rendered event", function() {
      var watcher = jasmine.createSpy("rendered");
      view.on('rendered',watcher);
      view.render();
      expect(watcher).toHaveBeenCalled();
    });

    it("should call the onRender function", function() {
      view.onRender = jasmine.createSpy("onRender");
      view.render();
      expect(view.onRender).toHaveBeenCalled();
    });
  });
});
