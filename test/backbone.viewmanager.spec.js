describe('View Manager', function(){
  var view;
  beforeEach(function(){
    view = new Backbone.View();
  });

  describe('when creating a Backbone view', function(){
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
    it("should return itself for chaining methods", function(){
      expect(view.render()).toBe(view);
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

  describe('when rendering a view with single parent template', function(){
    beforeEach(function(){
      view.template = _.template('<table><th><td>name</td><td>email</td></th></table>')
    });

    describe('with attachToTemplate disabled', function(){
      beforeEach(function(){
        view.attachToTemplate = false;
        view.render();
      });

      it('should render the template as the first child', function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TABLE');
      });
    });

    describe('with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render();
      });

      it("should have the table element as the root node", function(){
        expect(view.el.nodeName).toBe('TABLE');
      });

      it("should have table body as first child elements", function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TBODY');
      });
    });

    describe('when rerendering a view with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render().render();
      });

      it("should have the table element as the root node", function(){
        expect(view.el.nodeName).toBe('TABLE');
      });

      it("should have table body as first child elements", function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TBODY');
      });
    });

  });

  describe('when rendering a view with multiple parent template', function(){
    beforeEach(function(){
      view.template = _.template('<table><th><td>name</td><td>email</td></th></table><p>test</p>');
    });

    describe('with attachToTemplate disabled', function(){
      beforeEach(function(){
        view.attachToTemplate = false;
        view.render();
      });

      it('should render the template as the first child', function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TABLE');
      });
    });

    describe('with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render();
      });

      it("should have a div element as the root node", function(){
        expect(view.el.nodeName).toBe('DIV');
      });

      it("should have table as first child elements", function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TABLE');
      });
    });

  });

  describe('when calling setView with no options', function(){
    var subView;
    beforeEach(function(){
      subView = new Backbone.View({});
      subView.template = _.template('<table></table>');
    });

    it('should remove the existing views', function(){
      view.removeSubViews = jasmine.createSpy("removeSubViews");
      view.setView(subView);
      expect(view.removeSubViews).toHaveBeenCalled();
    });

    it('should have a table child element', function(){
      view.setView(subView);
      expect(view.$('table').length).toBe(1);
    });

    it('should add the view to the subViews', function(){
      view.setView(subView);
      expect(view._subViews.length).toBe(1);
    });
  });

});
