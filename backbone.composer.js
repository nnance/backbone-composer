/*!
 * backbone.composer.js
 * Copyright 2014, Nick Nance (@nancenick)
 * backbone.composer.js may be freely distributed under the MIT license.
 */
 (function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  }

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object') {
    factory(require('underscore'), require('backbone'));
  }

  // Finally, as a browser global.
  else {
    factory(_, Backbone);
  }

}(function (_, Backbone) {


  // Backbone.View Mixins
  // --------------------

  _.extend(Backbone.View.prototype, {

    /**
    * ViewManager has a default render function that will render
    * if there is a template function defined in the view.  If serializeData is
    * implemented its' return value will be passed to the template funcion otherwise
    * this will be passed.
    *
    * Implement an 'onRender'
    * function to extend the render functionality.  It returns 'this' to support
    * chaining. This will trigger a 'rendered' event.
    *
    * By setting attachToTemplate render will attach the view to the top element of
    * the template. Using this option will remove the default behavior of Backbone
    * that creates all views with a default div tag.
    * @render
    */
    render: function() {
        if (this.template && _.isFunction(this.template)) {
            var data = _.isFunction(this.serializeData) ? this.serializeData() : this;
            var $template = $(this.template(data));
            if (this.attachToTemplate && $template.length === 1) {
                // swap out the view on the top level element to avoid duplication
                this.$el.replaceWith($template);

                // delegate events
                this.setElement($template);
            } else {
                this.$el.html($template);
            }
        }

        this.restoreSubViews();

        if (this.onRender && _.isFunction(this.onRender)) {
            this.onRender.apply(this, arguments);
        }
        this.trigger('rendered',this);
        return this;
    },

    /**
    * Use setView to replace the entire contents of the view with a new view.
    * this function will also remove all views currently contained within the view.
    * This will trigger a 'shown' event.
    * @setView
    * @param {Backbone.View} view - The view to use
    * @param {object} options - Set options.emptyDOM to true in cases where the DOM
    * that the view is attached is managed by something other than Backbone
    */
    setView: function(view, options) {
        this.removeSubViews();
        // this is needed for cases where the DOM is changed by something
        // other than what is managed by backbone
        if (options && options.emptyDOM) {
            this.$el.empty();
        }
        this.addSubView({view: view, selector: this.$el});
        return view;
    },

    /**
    * Use getView to retrieve the primary subView
    * @getView
    */
    getView: function() {
        if (this._subViews && this._subViews.length > 0) {
            return this._subViews[0];
        }
    },

    /**
    * AddSubView is used to render and add a subview to an parent view. If you need
    * to perform some work after the view is added to the DOM you can implement a
    * 'onShow' function.  This will also trigger a 'shown' event.
    * @addSubView
    * @param {object} options - An option object with a view and a selector
    */
    addSubView: function(options) {
        if (!options || !options.view) {
            throw new Error('Missing required view option');
        }

        if (!this._subViews) {
            this._subViews = [options];
        }
        else {
            this._subViews.push(options);
        }
        this.listenTo(options.view,'closed',this._removeSubView);

        return this._showSubView(options);
    },

    /**
    * RestoreSubViews can be used to restore views to the DOM that have been
    * removed as a result of the parent view rerendering
    * @restoreSubViews
    */
    restoreSubViews: function() {
      // restore the sub views to the dom
      _.each(this._subViews,this._showSubView,this);
    },

    _showSubView: function(options) {
      var selector;
      if (_.isObject(options.selector)) {
          selector = options.selector;
      }
      else if (_.isString(options.selector)) {
          selector = this.$(options.selector);
      }
      else {
          selector = this.$el;
      }

      options.view.render();
      if (options.location === 'prepend') {
          selector.prepend(options.view.el);
      }
      else if (options.location === 'before') {
          selector.before(options.view.el);
      }
      else if (options.location === 'after') {
          selector.after(options.view.el);
      }
      else {
          selector.append(options.view.el);
      }

      if (options.view.onShow && _.isFunction(options.view.onShow)) {
          options.view.onShow.apply(options.view,arguments);
      }
      options.view.trigger('shown',this);

      return options.view;
    },

    /**
    * Retrieve the current number of sub views.
    * @getSubViewCount
    */
    getSubViewCount: function() {
      return this._subViews ? this._subViews.length : 0;
    },

    /**
    * Removes all sub-views from a parent
    * @removeSubViews
    */
    removeSubViews: function() {
      _.each(this._subViews, function(subView) {
        this.stopListening(subView.view);
        subView.view.close();
      }, this);
      this._subViews = [];
    },

    _removeSubView: function(view) {
      var viewOption = _.findWhere(this._subViews, {view: view});
      var index = this._subViews.indexOf(viewOption);
      if (index > -1) {
        this._subViews.splice(index,1);
      }
    },

    /**
    * RemoveSubViewForModel will close the first sub view that has the attched
    * model.  As a result a 'closed' event will be fired for the view and it
    * will be removed from the DOM.
    * @removeSubViewForModel
    * @param {object} model - The model associated with the view
    */
    removeSubViewForModel: function(model) {
        _.find(this._subViews, function(subView, index) {
          if (subView.view.model && subView.view.model === model) {
              subView.view.close();
              return true;
          }
        }, this);
    },

    /**
    * Helper function to return the attribute of a model if the model is assigned
    * @getAttr
    * @params {string} attribute - The name of the attribute
    */
    getAttr: function(attribute) {
        if (this.model) {
            return this.model.get(attribute);
        }
    },

    /**
    * Return all the fields and their value of a form as an object
    * @serializeForm
    * @params {string} selector - A jquery selector identifying the form
    */
    serializeForm: function(selector) {
        var result = {};
        var fields = this.$(selector).serializeArray();
        _.each(fields, function(field) {
            if (result[field.name]) {
                if (!result[field.name].push) {
                    result[field.name] = [result[field.name]];
                }
                result[field.name].push(field.value || '');
            } else {
                result[field.name] = field.value || '';
            }
        });
        return result;
    },

    /**
    * Remove all subviews and safely remove this view from the DOM. Implement an
    * 'onClose' function for any additional clean up that is required before
    * removing the view from the DOM.  This will trigger a 'closed' event just
    * before removing from the DOM.
    * @close
    */
    close: function() {
        if (this.onClose && _.isFunction(this.onClose)) {
            this.onClose.apply(this, arguments);
        }
        this.removeSubViews();
        this.remove();
        this.trigger('closed',this);
        this.unbind();
    }

  });

}));
