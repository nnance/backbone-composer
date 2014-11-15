backbone-viewmanager
====================

Current Version: 0.1.11

[![Build Status](https://secure.travis-ci.org/nnance/backbone-viewmanager.png?branch=master)](http://travis-ci.org/nnance/backbone-viewmanager)
[![Coverage Status](https://img.shields.io/coveralls/nnance/backbone-viewmanager.svg)](https://coveralls.io/r/nnance/backbone-viewmanager)
[![Dependency Status](https://gemnasium.com/nnance/backbone-viewmanager.svg)](https://gemnasium.com/nnance/backbone-viewmanager)


# View Manager

View Manager is a minimal, slightly opinionated Backbone plugin to simplify view rendering and life cycle management.  The plugin goals include:
* Minimize boilerplate view code
* Manage view life cycle to minimize memory leaks
* Simplify the management of child views / subviews
* Restore the state of the DOM after re-rendering

## Table of Contents
* [Overview](#overview)
* [API](#api)

## <a name="overview"></a>Overview
View Manager attempts to enhance the existing Backbone.View classs with a simple API and without altering its' existing behavior.  To this point there are two significant aspects of the plugin important to understand.

### Rendering
View Manager provides an implementation of the render function that isn't provided by default in Backbone.  View Manager mostly provides this implementation as a way to remove boilerplate code.  The additional features of the plugin can be used even if you elect to override the provided rendering implementation.  However, it is likely you will find the benefits of its render implementation to be useful.  The benefits include:

#### Templating
If you assign a template function to the view, View Manager will use the template function to establish as the DOM for the view. For example:
```
Backbone.View.extend({
  template: JST['templates/index.ejs'],
  ...
});
```
View Manager doesn't handle the loading of the template or make any assumptions on how the template is loaded.  It does require that the template is defined as a function.  It is recommend that you use a template system that is pre-compiled.

#### Removing the div wrapper
By default Backbone wraps all views with a div tag. This can cause confusion and create unexpected DOM elements.  Backbone's solution to this problem requires elements of the template being defined in the view code.  In many situations this solution isn't desirable.

This can be avoided by setting the attachToTemplate option to true on a view to automatically attach the outer tag of the view to the top level tag of the template.  Keeping all the DOM definition in the template.  For example:
```
Backbone.View.extend({
  template: JST['templates/index.ejs'],
  attachToTemplate: true,
  ...
});
```
If you want to set this value globally you can do something like this:
```
Backbone.View.prototype.attachToTemplate = true;
```
#### Serializing View Data
In Backbone there are many ways to hidrate a view with data.  ViewManager promotes the use of a serializeData function as good approach to clearly defining the required data structure required by the template.

By implementing a serializeData function in a view, ViewManager will use the results of this function as the input to the template function.  A simple example would be:
```
Backbone.View.extend({
  serializeData: function() {
    return this.model.toJSON();
  }
});
```
#### Rendering hooks
When using the ViewManager render function the view with fire an rendered event once the view has completed rendering to the DOM and it's sub views are restored.  



## <a name="api"></a>API
<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="addSubView"><span class="type-signature"></span>addSubView<span class="signature">(options)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>AddSubView is used to render and add a subview to an parent view. If you need
to perform some work after the view is added to the DOM you can implement a
'onShow' function.  This will also trigger a 'shown' event.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>options</code></td>
<td class="type">
<span class="param-type">object</span>
</td>
<td class="description last"><p>An option object with a view and a selector</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L97">lineno 97</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="close"><span class="type-signature"></span>close<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Remove all subviews and safely remove this view from the DOM. Implement an
'onClose' function for any additional clean up that is required before
removing the view from the DOM.  This will trigger a 'closed' event just
before removing from the DOM.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L239">lineno 239</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="getAttr"><span class="type-signature"></span>getAttr<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Helper function to return the attribute of a model if the model is assigned</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L205">lineno 205</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="getSubViewCount"><span class="type-signature"></span>getSubViewCount<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Retrieve the current number of sub views.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L161">lineno 161</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="getView"><span class="type-signature"></span>getView<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Use getView to retrieve the primary subView</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L84">lineno 84</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="removeSubViewForModel"><span class="type-signature"></span>removeSubViewForModel<span class="signature">(model)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>RemoveSubViewForModel will close the first sub view that has the attched
model.  As a result a 'closed' event will be fired for the view and it
will be removed from the DOM.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>model</code></td>
<td class="type">
<span class="param-type">object</span>
</td>
<td class="description last"><p>The model associated with the view</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L191">lineno 191</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="removeSubViews"><span class="type-signature"></span>removeSubViews<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Removes all sub-views from a parent</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L169">lineno 169</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="render"><span class="type-signature"></span>render<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>ViewManager has a default render function that will render
if there is a template function defined in the view.  If serializeData is
implemented its' return value will be passed to the template funcion otherwise
this will be passed.</p>
<p>Implement an 'onRender'
function to extend the render functionality.  It returns 'this' to support
chaining. This will trigger a 'rendered' event.</p>
<p>By setting attachToTemplate render will attach the view to the top element of
the template. Using this option will remove the default behavior of Backbone
that creates all views with a default div tag.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L41">lineno 41</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="restoreSubViews"><span class="type-signature"></span>restoreSubViews<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>RestoreSubViews can be used to restore views to the DOM that have been
removed as a result of the parent view rerendering</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L118">lineno 118</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="serializeForm"><span class="type-signature"></span>serializeForm<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Return all the fields and their value of a form as an object</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L216">lineno 216</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="setView"><span class="type-signature"></span>setView<span class="signature">(view, options)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Use setView to replace the entire contents of the view with a new view.
this function will also remove all views currently contained within the view.
This will trigger a 'shown' event.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>view</code></td>
<td class="type">
<span class="param-type">Backbone.View</span>
</td>
<td class="description last"><p>The view to use</p></td>
</tr>
<tr>
<td class="name"><code>options</code></td>
<td class="type">
<span class="param-type">object</span>
</td>
<td class="description last"><p>Set options.emptyDOM to true in cases where the DOM
that the view is attached is managed by something other than Backbone</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js">backbone.viewmanager.js</a>
<span>, </span>
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L69">lineno 69</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->
