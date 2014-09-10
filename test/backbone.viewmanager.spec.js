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
    var watcherSpy = sinon.spy();
    var viewResult;
    beforeEach(function(){
      view.on('rendered',watcherSpy);
      view.onRender = sinon.spy();
      viewResult = view.render();
    });

    it('should trigger a rendered event', function() {
      expect(watcherSpy).to.have.been.calledOnce;
    });

    it('should call the onRender function', function() {
      expect(view.onRender).to.have.been.calledOnce;
    });

    it('should return itself for chaining methods', function(){
      expect(viewResult).to.equal(view);
    });
  });

  describe('when rendering a view with a serializeData method',function(){
    beforeEach(function(){
      view.template = _.template('<table><tr><td><%=name%></td></tr></table>');
      view.serializeData = sinon.spy(function(){
        return {name:'mocha'};
      });
      view.render();
    })
    it('should call the serializeData method', function(){
      expect(view.serializeData).to.be.calledOnce;
    });
    it('should have a column with a value of mocha', function(){
      expect(view.$('td').text()).to.equal('mocha');
    });
  });

  describe('when rendering a view with single parent template', function(){
    beforeEach(function(){
      view.template = _.template('<table><th><td>name</td><td>email</td></th></table>');
    });

    describe('with attachToTemplate disabled', function(){
      beforeEach(function(){
        view.render();
      });

      it('should render the template as the first child', function(){
        expect(view.$el.children().first().prop('nodeName')).to.equal('TABLE');
      });
    });

    describe('with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render();
      });

      it('should have the table element as the root node', function(){
        expect(view.el.nodeName).to.equal('TABLE');
      });

      it('should have table body as first child elements', function(){
        expect(view.$el.children().first().prop('nodeName')).to.equal('TBODY');
      });
    });
  });

  describe('when rerendering a subView with attachToTemplate enabled', function(){
    var emailAddress = 'mocha@gmail.com';
    beforeEach(function(){
      view.template = _.template('<table></table>');
      view.attachToTemplate = true;
      view.render();

      subView.template = _.template('<tr><td>name</td><td id="email"><%=email%></td></tr>');
      subView.model = new Backbone.Model({name: 'mocha', email: ''});
      subView.serializeData = subView.model.toJSON.bind(subView.model);
      subView.listenTo(subView.model,'change',subView.render);
      subView.attachToTemplate = true;

      view.addSubView({view: subView});
      subView.model.set('email',emailAddress);
    });

    it('should have the table element as the root node', function(){
      expect(view.el.nodeName).to.equal('TABLE');
    });

    it('should have table body as first child elements', function(){
      expect(view.$el.children().first().prop('nodeName')).to.equal('TBODY');
    });

    it('should have td with new email address', function(){
      expect(view.$('#email').text()).to.equal(emailAddress);
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
        expect(view.$el.children().first().prop('nodeName')).to.equal('TABLE');
      });
    });

    describe('with attachToTemplate enabled', function(){
      beforeEach(function(){
        view.attachToTemplate = true;
        view.render();
      });

      it('should have a div element as the root node', function(){
        expect(view.el.nodeName).to.equal('DIV');
      });

      it('should have table as first child elements', function(){
        expect(view.$el.children().first().prop('nodeName')).to.equal('TABLE');
      });
    });

  });

  describe('when calling setView', function(){
    var removeSubViewsSpy = sinon.spy();
    beforeEach(function(){
      view.removeSubViews = removeSubViewsSpy;
      view.setView(subView);
    });

    it('should remove the existing views', function(){
      expect(removeSubViewsSpy).to.have.been.calledOnce;
    });

    it('should have a table child element', function(){
      expect(view.$('table').length).to.equal(1);
    });

    it('should add the view to the subViews', function(){
      expect(view._subViews.length).to.equal(1);
    });
  });

  describe('when calling setView with emptyDOM option', function(){
    var emptySpy;
    beforeEach(function(){
      emptySpy = sinon.spy(view.$el,'empty');
      view.$el.empty = emptySpy;
      view.setView(subView,{emptyDOM: true});
    });

    it('should empty the DOM of the container', function(){
      expect(emptySpy).to.have.been.calledOnce;
    });

  });

  describe('when calling addSubView', function(){
    beforeEach(function(){
      this.watcherSpy = sinon.spy();
      subView.on('shown', this.watcherSpy);
      subView.onShow = sinon.spy();
      sinon.spy(view.$el,'append');
      sinon.spy(subView, 'render');
      view.addSubView({view: subView});
    });

    it('should call render on the sub view', function(){
      expect(subView.render).to.have.been.calledOnce;
    });

    it('should append the content to the container', function(){
      expect(view.$el.append).to.have.been.calledWith(subView.el);
    });

    it('should add the view to the subViews', function(){
      expect(view.getSubViewCount()).to.equal(1);
    });

    it('should call onShow on the sub view', function(){
      expect(subView.onShow).to.have.been.calledOnce;
    });

    it('should trigger a shown event on sub view', function(){
      expect(this.watcherSpy).to.have.been.calledOnce;
    });

    it('should return the sub view for chaining methods', function(){
      expect(view.addSubView({view: subView})).to.equal(subView);
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
        expect(view.$('#container').children().first().prop('nodeName')).to.equal('TABLE');
      });
    });

    describe('with a prepend location', function(){
      beforeEach(function(){
        sinon.spy(view.$el,'prepend');
        view.addSubView({view: subView, location: 'prepend'});
      });
      it('should call prepend on the view', function(){
        expect(view.$el.prepend).to.have.been.calledOnce;
      });
    });

  });

  describe('when calling removeSubViews', function(){
    var subView2 = new Backbone.View();
    beforeEach(function(){
      subView.close = sinon.spy();
      view.addSubView({view: subView});
      subView2.close = sinon.spy();
      view.addSubView({view: subView2});
      view.removeSubViews();
    });
    it('should call close on each sub view', function(){
      expect(subView.close).to.have.been.calledOnce;
      expect(subView2.close).to.have.been.calledOnce;
    });
    it('should remove all the sub views from the list', function(){
      expect(view.getSubViewCount()).to.equal(0);
    });
  });

  describe('when calling close', function(){
    beforeEach(function(){
      this.watcherSpy = sinon.spy();
      view.removeSubViews = sinon.spy();
      view.onClose = sinon.spy();
      view.remove = sinon.spy();
      view.on('closed',this.watcherSpy);
      view.close();
    });
    it('should remove all sub views', function(){
      expect(view.removeSubViews).to.have.been.calledOnce;
    });
    it('should call remove', function(){
      expect(view.remove).to.have.been.calledOnce;
    });
    it('should call onClose', function(){
      expect(view.onClose).to.have.been.calledOnce;
    });
    it('should trigger closed event', function(){
      expect(this.watcherSpy).to.have.been.calledOnce;
    });
  });

  describe('when sub views close themselves', function(){
    var subView2 = new Backbone.View();
    beforeEach(function(){
      view.addSubView({view:subView});
      view.addSubView({view:subView2});
      subView2.close();
    });
    it('should be removed from the sub views array', function(){
      expect(view.getSubViewCount()).to.equal(1);
    });
  });


});
