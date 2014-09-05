describe('View Manager', function(){
  var SubView = Backbone.View.extend({tagName: 'table'});
  var view, subView;
  beforeEach(function(){
    view = new Backbone.View();
    subView = new SubView();
  });

  describe('when creating a Backbone view', function(){
    it('should provide a setView function', function(){
      expect(_.isFunction(view.setView)).to.be.true;
    });

    it('should provide a addSubView function', function(){
      expect(_.isFunction(view.addSubView)).to.be.true;
    });

    it('should provide a removeSubViews function', function(){
      expect(_.isFunction(view.removeSubViews)).to.be.true;
    });

    it('should provide a removeSubViewForModel function', function(){
      expect(_.isFunction(view.removeSubViewForModel)).to.be.true;
    });

    it('should provide a close function', function(){
      expect(_.isFunction(view.close)).to.be.true;
    });
  });

  describe('when rendering a Backbone view', function(){
    // var watcher = jasmine.createSpy('rendered');
    beforeEach(function(){
      // view.on('rendered',watcher);
      // view.onRender = jasmine.createSpy('onRender');
      view.render();
    });

    it('should return itself for chaining methods', function(){
      expect(view.render()).to.equal(view);
    });

    // it('should trigger a rendered event', function() {
    //   expect(watcher).toHaveBeenCalled();
    // });
    //
    // it('should call the onRender function', function() {
    //   expect(view.onRender).toHaveBeenCalled();
    // });

  });
/*
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

      it('should have the table element as the root node', function(){
        expect(view.el.nodeName).toBe('TABLE');
      });

      it('should have table body as first child elements', function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TBODY');
      });
    });

    describe('when rerendering a view with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render().render();
      });

      it('should have the table element as the root node', function(){
        expect(view.el.nodeName).toBe('TABLE');
      });

      it('should have table body as first child elements', function(){
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

      it('should have a div element as the root node', function(){
        expect(view.el.nodeName).toBe('DIV');
      });

      it('should have table as first child elements', function(){
        expect(view.$el.children().first().prop('nodeName')).toEqual('TABLE');
      });
    });

  });

  describe('when calling setView', function(){
    beforeEach(function(){
      view.removeSubViews = jasmine.createSpy('removeSubViews');
      view.setView(subView);
    });

    it('should remove the existing views', function(){
      expect(view.removeSubViews).toHaveBeenCalled();
    });

    it('should have a table child element', function(){
      expect(view.$('table').length).toBe(1);
    });

    it('should add the view to the subViews', function(){
      expect(view._subViews.length).toBe(1);
    });
  });

  describe('when calling setView with emptyDOM option', function(){
    beforeEach(function(){
      view.$el.empty = jasmine.createSpy('empty');
      view.setView(subView,{emptyDOM: true});
    });

    it('should empty the DOM of the container', function(){
      expect(view.$el.empty).toHaveBeenCalled();
    });

  });

  describe('when calling addSubView', function(){
    var watcher = jasmine.createSpy('watcher');
    beforeEach(function(){
      subView.on('shown',watcher);
      view.$el.append = jasmine.createSpy('append');
      subView.render = jasmine.createSpy('render');
      subView.onShow = jasmine.createSpy('onShow');
      view.addSubView({view: subView});
    });

    it('should call render on the sub view', function(){
      expect(subView.render).toHaveBeenCalled();
    });

    it('should append the content to the container', function(){
      expect(view.$el.append).toHaveBeenCalledWith(subView.el);
    });

    it('should add the view to the subViews', function(){
      expect(view._subViews.length).toBe(1);
    });

    it('should call onShow on the sub view', function(){
      expect(subView.onShow).toHaveBeenCalled();
    });

    it('should trigger a shown event on sub view', function(){
      expect(watcher).toHaveBeenCalled();
    });

    it('should return the sub view for chaining methods', function(){
      expect(view.addSubView({view: subView})).toBe(subView);
    });

  });

  describe('when calling addSubView', function(){
    beforeEach(function(){
      view.template = _.template('<div id="container"></div>');
      view.render();
    });

    describe('with a selector', function(){
      beforeEach(function(){
        view.addSubView({view: subView, selector: '#container'});
      });

      it('should append to the selected container', function(){
        expect(view.$('#container').children().first().prop('nodeName')).toBe('TABLE');
      });
    });

    describe('with a prepend location', function(){
      beforeEach(function(){
        view.$el.prepend = jasmine.createSpy('prepend');
        view.addSubView({view: subView, location: 'prepend'});
      });
      it('should call prepend on the view', function(){
        expect(view.$el.prepend).toHaveBeenCalled();
      });
    });

  });

  describe('when calling removeSubViews', function(){
    var subView2 = new Backbone.View();
    beforeEach(function(){
      subView.close = jasmine.createSpy('close');
      view.addSubView({view: subView});
      subView2.close = jasmine.createSpy('close');
      view.addSubView({view: subView2});
      view.removeSubViews();
    });
    it('should call close on each sub view', function(){
      expect(subView.close).toHaveBeenCalled();
      expect(subView2.close).toHaveBeenCalled();
    });
    it('should remove all the sub views from the list', function(){
      expect(view._subViews.length).toBe(0);
    });
  });

  describe('when calling close', function(){
    var watcher = jasmine.createSpy('watcher');
    beforeEach(function(){
      view.removeSubViews = jasmine.createSpy('removeSubViews');
      view.onClose = jasmine.createSpy('onClose');
      view.remove = jasmine.createSpy('remove');
      view.on('closed',watcher);
      view.close();
    });
    it('should remove all sub views', function(){
      expect(view.removeSubViews).toHaveBeenCalled();
    });
    it('should call remove', function(){
      expect(view.remove).toHaveBeenCalled();
    });
    it('should call onClose', function(){
      expect(view.onClose).toHaveBeenCalled();
    });
    it('should trigger closed event', function(){
      expect(watcher).toHaveBeenCalled();
    });
  });
*/

});
