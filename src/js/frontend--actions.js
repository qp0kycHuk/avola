const _core = {
	jk: {}
}

const states = {
	start: 'start',
	end: 'end',
	canceled: 'canceled'
}

// const classes = {
// 	before:
// }



const Actions = {
	jk: () => {
		let nodeItem;
		let jkItem;
		let timeNode;
		let id;

		let timeOutBeforeRemove = 7000;

		function initCore() {
			if (!_core.jk[id]) _core.jk[id] = {};

			nodeItem = document.querySelector('[data-id="' + id + '"]');
			jkItem = nodeItem.querySelector('.card');
			timeNode = nodeItem.querySelector('.jk-return-time');
		}

		function _start(options) {


			nodeItem.classList.add('before-remove');
			hide(jkItem);
			_core.jk[id].state = states.start;

			_core.jk[id].removeTimeout = setTimeout(() => {
				nodeItem.classList.add('after-remove');
				_finish(options);
			}, timeOutBeforeRemove);

			if (options.startAction) options.startAction();

			startСounting(timeNode, timeOutBeforeRemove, id)
		}


		function _finish(options) {
			if (_core.jk[id].state == states.canceled) return;
			_core.jk[id].state = states.end;
			if (options.finishAction) options.finishAction()
			setTimeout(() => {
				nodeItem.parentNode.removeChild(nodeItem)
			}, 1000)
		}


		function _cancel(options) {
			clearTimeout(_core.jk[id].removeTimeout);
			clearInterval(_core.jk[id].countingInterval);
			_core.jk[id].state = states.canceled;
			if (options.cancelAction) options.cancelAction()
			show(jkItem)
			nodeItem.classList.remove('before-remove');
		}

		const remove = function (identificator) {
			id = identificator;
			initCore();


			const _options = {
				startAction: () => {},
				finishAction: () => {
					console.log('remove');
					fetch('/local/ajax/remove_obj.php?id=' + id)
						.then((response) => response.text())
						.then((data) => {
							console.log(data);
						})
				},
				cancelAction: () => {}
			}

			return {
				finish: () => _finish(_options),
				cancel: () => _cancel(_options),
				start: () => _start(_options),
			}
		}

		const archive = function (identificator, options) {
			id = identificator;
			initCore();

			const _options = {
				startAction: () => {},
				finishAction: () => {
					console.log('archive');
					fetch('/local/ajax/toarchive.php?id=' + id + '&status=' + options.status + '&comment=' + options.comment)
						.then((response) => response.text())
						.then((data) => {
							console.log(data);

						})
				},
				cancelAction: () => {}
			}

			return {
				finish: () => _finish(_options),
				cancel: () => _cancel(_options),
				start: () => _start(_options),
			}
		}

		const removeCollection = function (identificator, options) {
			id = identificator;
			initCore();

			const parameters = Object.keys(options)
				.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k]))
				.join('&');


			const _options = {
				startAction: () => {},
				finishAction: () => {
					console.log('archive');
					fetch('/local/ajax/settings_link.php?' + parameters)
						.then((response) => response.text())
						.then((data) => {
							console.log(data);

						})
				},
				cancelAction: () => {}
			}

			return {
				finish: () => _finish(_options),
				cancel: () => _cancel(_options),
				start: () => _start(_options),
			}
		}





		return {
			remove,
			archive
		}
	}
}

// const Actions = (url, options) => {
// 	let id = options.id;
// 	let nodeItem = document.querySelector('[data-id="' + id + '"]');
// 	let jkItem = nodeItem.querySelector('.card');
// 	let timeNode = nodeItem.querySelector('.jk-return-time');
// 	if (!_core.jk[id]) _core.jk[id] = {};

// 	let timeOutBeforeRemove = 7000;

// 	const parameters = Object.keys(options)
// 		.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k]))
// 		.join('&');



// 	function _start(options) {
// 		nodeItem.classList.add('before-remove');
// 		hide(jkItem);
// 		_core.jk[id].state = states.start;

// 		_core.jk[id].removeTimeout = setTimeout(() => {
// 			nodeItem.classList.add('after-remove');
// 			_finish(options);
// 		}, timeOutBeforeRemove);

// 		if (options.startAction) options.startAction();

// 		startСounting(timeNode, timeOutBeforeRemove, id)
// 	}


// 	function _finish(options) {
// 		if (_core.jk[id].state == states.canceled) return;
// 		_core.jk[id].state = states.end;
// 		// if (options.finishAction) options.finishAction()

// 		fetch(url + '?' + parameters);


// 		setTimeout(() => {
// 			nodeItem.parentNode.removeChild(nodeItem)
// 		}, 1000)
// 	}


// 	function _cancel(options) {
// 		clearTimeout(_core.jk[id].removeTimeout);
// 		clearInterval(_core.jk[id].countingInterval);
// 		_core.jk[id].state = states.canceled;
// 		if (options.cancelAction) options.cancelAction()
// 		show(jkItem)
// 		nodeItem.classList.remove('before-remove');
// 	}

// 	const remove = function (identificator) {
// 		id = identificator;
// 		initCore();


// 		const _options = {
// 			startAction: () => {},
// 			finishAction: () => {
// 				console.log('remove');
// 				fetch('/local/ajax/remove_obj.php?id=' + id)
// 					.then((response) => response.text())
// 					.then((data) => {
// 						console.log(data);
// 					})
// 			},
// 			cancelAction: () => {}
// 		}

// 		return {
// 			finish: () => _finish(_options),
// 			cancel: () => _cancel(_options),
// 			start: () => _start(_options),
// 		}
// 	}

// 	const archive = function (identificator, options) {
// 		id = identificator;
// 		initCore();

// 		const _options = {
// 			startAction: () => {},
// 			finishAction: () => {
// 				console.log('archive');
// 				fetch('/local/ajax/toarchive.php?id=' + id + '&status=' + options.status + '&comment=' + options.comment)
// 					.then((response) => response.text())
// 					.then((data) => {
// 						console.log(data);

// 					})
// 			},
// 			cancelAction: () => {}
// 		}

// 		return {
// 			finish: () => _finish(_options),
// 			cancel: () => _cancel(_options),
// 			start: () => _start(_options),
// 		}
// 	}

// 	const removeCollection = function (identificator, options) {
// 		id = identificator;
// 		initCore();

// 		const parameters = Object.keys(options)
// 			.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k]))
// 			.join('&');


// 		const _options = {
// 			startAction: () => {},
// 			finishAction: () => {
// 				console.log('archive');
// 				fetch('/local/ajax/settings_link.php?' + parameters)
// 					.then((response) => response.text())
// 					.then((data) => {
// 						console.log(data);

// 					})
// 			},
// 			cancelAction: () => {}
// 		}

// 		return {
// 			finish: () => _finish(_options),
// 			cancel: () => _cancel(_options),
// 			start: () => _start(_options),
// 		}
// 	}





// 	return {
// 		remove,
// 		archive,
// 		removeCollection
// 	}
// }



function hide(node) {
	if ($) {
		node.style.maxHeight = node.scrollHeight + 'px';
		$(node).animate({
			maxHeight: "0",
		}, 500);
	} else {
		node.style.maxHeight = '0'
	}
}

function show(node) {
	if ($) {
		$(node).animate({
			maxHeight: node.scrollHeight,
		}, 500);
	} else {
		node.style.maxHeight = node.scrollHeight + 'px';
	}
}

function startСounting(node, startTime, id) {
	let time = startTime;

	node.textContent = time / 1000;
	_core.jk[id].countingInterval = setInterval(() => {
		node.textContent = time / 1000;
		time = time - 1000;
		if (time <= 0) time = 0;
	}, 1000);
}




