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

        return options.view;
    },

    removeSubViews: function() {
        _.each(this._subViews, function(subView, i){
            subView.remove();
            delete this._subViews[i];
        }, this);
    },

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
        this.removeSubViews();
        if (oldRemove) oldRemove.call(this);
    });

}));
