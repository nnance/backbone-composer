backbone.viewmanager
====================

[![Build Status](https://secure.travis-ci.org/nnance/backbone-viewmanager.png?branch=master)](http://travis-ci.org/nnance/backbone-viewmanager)
[![Coverage Status](https://img.shields.io/coveralls/nnance/backbone-viewmanager.svg)](https://coveralls.io/r/nnance/backbone-viewmanager)
[![Dependency Status](https://gemnasium.com/nnance/backbone-viewmanager.svg)](https://gemnasium.com/nnance/backbone-viewmanager)

Backbone View plugin to simplify rendering and life cycle management


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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L95">lineno 95</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L212">lineno 212</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L178">lineno 178</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L140">lineno 140</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L82">lineno 82</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L163">lineno 163</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L148">lineno 148</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L189">lineno 189</a>
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
<a href="https://github.com/nnance/backbone-viewmanager/blob/master/backbone.viewmanager.js#L67">lineno 67</a>
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
