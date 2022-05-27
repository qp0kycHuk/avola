(function () {
	function matches() {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
		}
	}
	matches();

	function closest() {
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (selector) {
				if (!this) return null;
				if (this.matches(selector)) return this;
				return !this.parentElement ? null : this.parentElement.closest(selector);
			}
		}
	}
	closest();

	function includes() {
		if (!Array.prototype.includes) {
			Object.defineProperty(Array.prototype, 'includes', {
				value: function (searchElement, fromIndex) {
					if (this == null) {
						throw new TypeError('"this" is null or not defined');
					}
					var o = Object(this);
					var len = o.length >>> 0;
					if (len === 0) {
						return false;
					}
					var n = fromIndex | 0;
					var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

					function sameValueZero(x, y) {
						return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
					}
					while (k < len) {
						if (sameValueZero(o[k], searchElement)) {
							return true;
						}
						k++;
					}
					return false;
				}
			});
		}
	}
	includes();

	function foreach() {
		if ('NodeList' in window && !NodeList.prototype.forEach) {
			console.info('polyfill forEach for IE11');
			NodeList.prototype.forEach = function (callback, thisArg) {
				thisArg = thisArg || window;
				for (var i = 0; i < this.length; i++) {
					callback.call(thisArg, this[i], i, this);
				}
			};
		}
	}
	foreach();
})()