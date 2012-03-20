// Copyright The Workers Ltd. 2012 (theworkers.net)
// @author Ross Cairns
(function () {

    var root = this;
    var W = root.W || {};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = W;
        root.W = W;
    } else {
        root.W = W;
    }

    // use underscore if availble
    // (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
    // Underscore is freely distributable under the MIT license.
    // Portions of Underscore are inspired or borrowed from Prototype,
    // Oliver Steele's Functional, and John Resig's Micro-Templating.
    // For all details and documentation:
    // http://documentcloud.github.com/underscore
    if (!_) {
        var nativeForEach   = Array.prototype.forEach,
            slice           = Array.prototype.slice;
    }
    var _ = _ || {
        extend : function(obj) {
            _.each(slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        },
        each : function(obj, iterator, context) {
            if (obj === null) return;
            if (nativeForEach && obj.forEach === nativeForEach) {
              obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
              for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
              }
            } else {
              for (var key in obj) {
                if (_.has(obj, key)) {
                  if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
              }
            }
          }
    };

        // Helpers from Backbone
        // (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
        // Backbone may be freely distributed under the MIT license.

        // Shared empty constructor function to aid in prototype-chain creation.
        var ctor = function(){};

        // Helper function to correctly set up the prototype chain, for subclasses.
        // Similar to `goog.inherits`, but uses a hash of prototype properties and
        // class properties to be extended.
        var inherits = function(parent, protoProps, staticProps) {
            var child;

            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if (protoProps && protoProps.hasOwnProperty('constructor')) {
                child = protoProps.constructor;
            } else {
                child = function(){ parent.apply(this, arguments); };
            }

            // Inherit class (static) properties from parent.
            _.extend(child, parent);

            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();

            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if (protoProps) _.extend(child.prototype, protoProps);

            // Add static properties to the constructor function, if supplied.
            if (staticProps) _.extend(child, staticProps);

            // Correctly set child's `prototype.constructor`.
            child.prototype.constructor = child;

            // Set a convenience property in case the parent's prototype is needed later.
            child.__super__ = parent.prototype;

            return child;
        };

        // The self-propagating extend function that Backbone classes use.
        var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
            child.extend = this.extend;
            return child;
        };

    W.Object = function () {};
    W.Object.extend = extend;
}());
