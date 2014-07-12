(function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'));

  // Finally, as a browser global.
  else
    factory(_, Backbone);

}(function (_, Backbone) {


  // Backbone.View Mixins
  // --------------------

  _.extend(Backbone.View.prototype, {

    /**
    * ViewManager has a default render function that will render
    * if there is a template function defined in the view.  Implement an 'onRender'
    * function to extend the render functionality.  It returns 'this' to support
    * chaining. This will trigger a 'rendered' event.
    * @render
    */
    render: function() {
        if (this.template) {
            this.$el.html(this.template(this));
            if (_.isUndefined(this.attachToTemplate) || this.attachToTemplate) {
                var topElement = this.$el.first();
                if (topElement.children().length === 1) {
                    this.setElement(topElement.children().first());
                }
            }
            if (this.onRender && _.isFunction(this.onRender)) {
                this.onRender.apply(this, arguments);
            }
            this.trigger('rendered');
        }
        return this;
    },

    /**
    * Use setView to replace the entire contents of the view with a new view.
    * this function will also remove all views currently contained within the view.
    * This will trigger a 'shown' event.
    * @setView
    * @param {Backbone.View} view - The view to use
    */
    setView: function(view, options) {
        this.removeSubViews();
        this.addSubView({view: view, selector: this.$el});
        return view;
    },

    getView: function() {
        if (this._subViews && this._subViews.length > 0)
            return this._subViews[0];
    },

    insertView: function(view, location) {
        return this.addSubView({view: view, selector: location});
    },

    /**
    * AddSubView is used to render and add a subview to an parent view. If you need
    * to perform some work after the view is added to the DOM you can implement a
    * 'onShow' function.  This will also trigger a 'shown' event.
    * @addSubView
    * @param {object} options - An option object with a view and a selector
    */
    addSubView: function(options) {
        if (!this._subViews)
            this._subViews = [options.view];
        else
            this._subViews.push(options.view);

        var selector;
        if (_.isObject(options.selector))
            selector = options.selector;
        else if (_.isString(options.selector))
            selector = this.$(options.selector);
        else
            selector = this.$el;

        options.view.render();
        if (options.location === 'prepend')
            selector.prepend(options.view.el);
        else if (options.location === 'before')
            selector.before(options.view.el);
        else if (options.location === 'after')
            selector.after(options.view.el);
        else
            selector.append(options.view.el);

        if (options.view.onShow && _.isFunction(options.view.onShow)) {
            options.view.onShow.apply(options.view,arguments);
        }
        options.view.trigger('shown');

        return options.view;
    },

    /**
    * Removes all sub-views from a parent
    * @removeSubViews
    */
    removeSubViews: function() {
        _.each(this._subViews, function(subView, i){
            subView.close();
            delete this._subViews[i];
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
        this.unbind();
        this.removeSubViews();
        this.remove();
        this.trigger('closed');
    }

  });

}));
