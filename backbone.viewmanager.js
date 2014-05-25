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
    * if there is a template function defined in the view.  It returns this
    * to support chaining
    * @render
    */
    render: function() {
        if (this.template) {
            this.$el.html(this.template(this));
            if (this.onRender && _.isFunction(this.onRender)) {
                this.onRender.apply(this, arguments);
            }
        }
        return this;
    },

    /**
    * Use setView to replace the entire contents of the view with a new view.
    * this function will also remove all views currently contained within the view.
    * @setView
    * @param {Backbone.View} view - The view to use
    */
    setView: function(view) {
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
    * AddSubView is used to render and add a subview to an parent view.
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
            options.view.onShow.apply(this,arguments);
        }

        return options.view;
    },

    /**
    * Removes all sub-views from a parent
    * @removeSubViews
    */
    removeSubViews: function() {
        _.each(this._subViews, function(subView, i){
            subView.remove();
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

  });

    Backbone.View.prototype.remove = _.wrap(Backbone.View.prototype.remove, function(oldRemove) {
        this.unbind();
        this.removeSubViews();
        if (oldRemove) oldRemove.call(this);
    });

}));
