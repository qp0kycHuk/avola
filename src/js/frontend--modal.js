(function () {
	const activeClass = 'active';
	const attr = {
		link: 'data-modal-link',
		cover: 'data-modal-cover',
		close: 'data-modal-close',

	}


	function getMaxZindex() {
		const modals = document.querySelectorAll('[' + attr.cover + '].' + activeClass);
		let maxIndex = -1;
		for (const i in modals) {
			if (!modals.hasOwnProperty(i)) continue;

			const zIndex = getComputedStyle(modals[i]).zIndex;

			maxIndex = zIndex > maxIndex ? zIndex : maxIndex;

		}

		return +maxIndex;
	}

	function setBodyOverflow() {
		return {
			hidden: function () {
				document.body.style.paddingRight = getScrollBarWidth() + 'px';
				document.body.style.overflow = 'hidden';
			},
			visible: function () {
				document.body.style.paddingRight = '';
				document.body.style.overflow = '';
			}
		}
	}

	function getScrollBarWidth() {
		let div = document.createElement('div');
		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	}





	class Modal {
		constructor(id) {
			this.id = id;
			this.opened = false;
			this.closePromiseResolve = null;


		}

		open(options, link) {
			if (this.opened) return;
			const modalNode = document.getElementById(this.id);

			if (!modalNode) {
				console.error('Modal with id = "' + this.id + '" not found!!!');
				return;
			}

			this.opened = true;
			modalNode.classList.add(activeClass);
			if (modalNode.showModal) modalNode.showModal();
			setBodyOverflow().hidden();



			!this.modalHistory.includes(this.id) ? this.modalHistory.push(this.id) : null;


			const zIndex = getMaxZindex();
			modalNode.style.zIndex = zIndex > 0 ? zIndex + 1 : '';

			window.location.href = '#' + this.id;


			this.closePromise = new Promise((resolve) => {
				this.closePromiseResolve = resolve;
			});

			var openEvent = new CustomEvent("modalopen", {
				bubbles: true,
				cancelable: true,
				detail: {
					closePromise: this.closePromise,
					target: modalNode,
					link: link,
					options: options
				}
			});
			if (link) link.dispatchEvent(openEvent);
			modalNode.dispatchEvent(openEvent);



		}

		close(options, _onHash) {


			if (!this.opened) return;
			const modalNode = document.getElementById(this.id);

			if (!modalNode) {
				console.error('Modal with id = "' + this.id + '" not found!!!');
				return;
			}

			this.opened = false;
			modalNode.classList.remove(activeClass);
			if (modalNode.close) modalNode.close();


			if (!_onHash) {
				history.back();

			}
			this.modalHistory.pop();
			this.modalHistory.length >= 1 ? window.location.hash = '#' + this.modalHistory[this.modalHistory.length - 1] : null;

			setTimeout(function () {
				modalNode.style.zIndex = '';

				if (!document.querySelector('[' + attr.cover + '].' + activeClass)) {
					setBodyOverflow().visible();
				}
			}, 250);

			var closeEvent = new CustomEvent("modalclose", {
				bubbles: true,
				cancelable: true,
				detail: {
					target: modalNode,
					options: options
				}
			});
			modalNode.dispatchEvent(closeEvent);

			this.closePromiseResolve(options);
		}


	}

	Modal.prototype.modalHistory = [];
	Modal.prototype.instances = {};

	Modal.create = function (id) {
		if (!this.prototype.instances[id]) {
			this.prototype.instances[id] = new Modal(id);
		}
		return this.prototype.instances[id];
	}

	Modal.open = function (id, options, link) {
		const modal = Modal.create(id)
		return modal.open(options, link)
	}

	Modal.close = function (id, options, _onHash) {
		const modal = Modal.create(id)
		return modal.close(options, _onHash)
	}

	Modal.clickHandler = function (event) {
		let target = event.target;

		const show = function () {
			const id = target.closest('[' + attr.link + ']').getAttribute(attr.link)
			Modal.open(id, null, target.closest('[' + attr.link + ']'));

		}

		const close = function () {
			if (!(target.getAttribute(attr.cover) != null || target.closest('[' + attr.close + ']'))) return;
			const id = target.closest('[' + attr.cover + ']').id;
			let closeAttr = target.closest('[' + attr.close + ']') ? target.closest('[' + attr.close + ']').getAttribute(attr.close) : null;

			Modal.close(id, closeAttr)


		}
		if (target.closest('[' + attr.cover + ']') && target.closest('[' + attr.link + ']')) {
			close();
			setTimeout(() => {
				show()
			}, 100)

			return;
		}
		target.closest('[' + attr.cover + ']') ? close() : null;
		target.closest('[' + attr.link + ']') ? show() : null;

	}

	Modal.keyupHandler = function (event) {
		if (event.key == 'Escape' && Modal.prototype.modalHistory.length >= 1) {
			Modal.close(this.prototype.modalHistory[this.prototype.modalHistory.length - 1])
		}
	}

	Modal.hashChangeHandler = function (event) {

		if (this.prototype.modalHistory[this.prototype.modalHistory.length - 1] &&
			window.location.hash != this.prototype.modalHistory[this.prototype.modalHistory.length - 1] &&
			window.location.hash != '#' + this.prototype.modalHistory[this.prototype.modalHistory.length - 1]) {

			this.close(this.prototype.modalHistory[this.prototype.modalHistory.length - 1], null, true)
		}

	}


	document.addEventListener('click', (event) => Modal.clickHandler(event));
	window.addEventListener('hashchange', (event) => Modal.hashChangeHandler(event));
	document.addEventListener('keyup', (event) => Modal.keyupHandler(event));

	window.Modal = Modal;
})();