if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback) {
        var _arr = this;
        for (var i in _arr) {
            if (_arr.hasOwnProperty(i)) {
                callback(_arr[i], parseInt(i), _arr);
            }
        }
    }
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
        var _arr = [];
        this.forEach(function(el, i, arr) {
            _arr.push(callback(el, i, arr));
        });
        return _arr;
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
        var _arr = [];
        this.forEach(function(el, i, arr) {
            if (callback(el, i, arr)) {
                _arr.push(el);
            }
        });
        return _arr;
    }
}

if (!Array.prototype.find) {
    Array.prototype.find = function(callback) {
        var _arr = this;
        for (var i in _arr) {
            if (_arr.hasOwnProperty(i) && callback(_arr[i], parseInt(i), _arr)) {
                return _arr[i];
            }
        }
        return null;
    }
}


if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(callback) {
        var _arr = this;
        for (var i in _arr) {
            var j = parseInt(i)
            if (_arr.hasOwnProperty(i) && callback(_arr[i], j, _arr)) {
                return j;
            }
        }
        return -1;
    }
}

if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback) {
        var _arr = this,
            len = _arr.length,
            r = callback(_arr[0], _arr[1], 0, _arr);
        for (var i = 1; i < len - 2; i++) {
            if (_arr.hasOwnProperty(i)) {
                r = callback(r, _arr[i + 1], i, _arr);
            }
        }
        return r;
    }
}


if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function(callback) {
        var _arr = this,
            len = _arr.length,
            r = callback(_arr[len - 1], _arr[len - 2], 0, _arr);
        for (var i = len - 2; i > 0; i--) {
            if (_arr.hasOwnProperty(i)) {
                r = callback(r, _arr[i - 1], len - i - 1, _arr);
            }
        }
        return r;
    }
}

if (!Array.prototype.some) {
    Array.prototype.some = function(callback) {
        var _arr = this;
        for (var i in _arr) {
            if (_arr.hasOwnProperty(i) && callback(_arr[i], parseInt(i), _arr)) {
                return true;
            }
        }
        return false;
    }
}

if (!Array.prototype.every) {
    Array.prototype.every = function(callback) {
        var _arr = this;
        for (var i in _arr) {
            if (_arr.hasOwnProperty(i) && !callback(_arr[i], parseInt(i), _arr)) {
                return false;
            }
        }
        return true;
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(el) {
        var _arr = this;
        for (var i in _arr) {
            if (_arr.hasOwnProperty(i) && _arr[i] === el) {
                return parseInt(i);
            }
        }
        return -1;
    }
}


if (!Function.prototype.bind) {
    Function.prototype.bind = Function.prototype.bind || function() {
        var fn = this,
            presetArgs = []
            .slice
            .call(arguments);
        var context = presetArgs.shift();
        return function() {
            return fn.apply(context, presetArgs.concat([].slice.call(arguments)));
        };
    };
}

if (typeof Object.assign != 'function') {

    Object.assign = function(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };

}

if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;

        return new F();
    };
}


if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [],
                prop,
                i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}


! function(window) {

    var hasOwn = Object.prototype.hasOwnProperty;

    if (!window.JSON) {
        window.JSON = {
            parse: function(str) {
                try {
                    return eval('(' + str + ')');
                } catch (err) {
                    throw new TypeError('JSON.parse: unexpected character at line 1 column 1 of the JSON data');
                }
            },
            stringify: function(obj) {
                var otype = typeof obj;
                if (otype === "string") {
                    return '"' + obj + '"';
                }
                if (otype !== 'object') {
                    return obj;
                }

                var str = '',
                    boolOrNum = function(o) {
                        var type = typeof o;
                        if (type === 'number' || type === 'boolean') {
                            return true;
                        }
                        return false;
                    }

                for (var i in obj) {
                    if (hasOwn.call(obj, i)) {
                        var value = obj[i],
                            valueStr = value.toString();
                        str += '"' + i + '":' + boolOrNum(value) ? valueStr : '"' + valueStr + '"';
                    }
                }
                return '{' + str + '}';
            },
            toString: function() {
                return "[Object JSON]";
            },
            toLocalString: function() {
                return "[Object JSON]";
            },
            valueOf: function() {
                return {};
            }
        };
    }


    if (!window.console) {
        window.console = {};
    }
    var con = window.console;
    var prop,
        method;
    var dummy = function() {};
    var properties = ['memory'];
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEn' +
        'd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,time' +
        'line,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop())
        if (!con[prop])
            con[prop] = {};
    while (method = methods.pop())
        if (!con[method])
            con[method] = dummy;


    Array.isArray || (Array.isArray = function(arr) {
        return Object.prototype.toString.call(arr) == '[object Array]';
    });

    Object.is || (Object.is = function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10 Steps 6.b-6.e: +0 != -0 Added the nonzero y check to make
            // Flow happy, but it is redundant
            return x !== 0 || y !== 0 || 1 / x === 1 / y;
        } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    });
}(window);
