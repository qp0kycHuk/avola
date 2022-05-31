// $('form').on('submit', (event) => {
// 	if (!event.target.querySelector('input[data-submit]')) return;

// 	event.preventDefault()

// 	let inputs = [...event.target.querySelectorAll('input[data-submit]')]
// 	inputs.map((input) => {
// 		if (input.getAttribute('data-submit').includes('nospace')) {
// 			input.value = input.value.replace(/\s/g, '')
// 		}
// 		if (input.getAttribute('data-submit').includes('number')) {
// 			input.type = 'number'
// 			input.value = parseInt(input.value.replace(/[^0-9]/g, ''));
// 		}

// 		console.log(typeof input.value);
// 	})


// 	event.target.submit()



// })


function checkSupportWebp() {
	var elem = document.createElement('canvas');

	if (!!(elem.getContext && elem.getContext('2d'))) {
		document.body.classList.add('support-webp');
		document.body.classList.remove('no-support-webp');
	} else {
		document.body.classList.add('no-support-webp');
		document.body.classList.remove('support-webp');
	}
}
checkSupportWebp();


function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : false;
}

function initSelect(select, settings = {
	autocomplete: false
}) {

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return;
	}

	let options = [...select.querySelectorAll('option')]
	let customOptions = options.map((option) => ({
		label: option.innerHTML,
		value: option.value,
	}));
	let id = select.id

	select.setAttribute('data-select-id', id);
	const container = select.parentElement.querySelector('#' + id + '-cover') || document.createElement('div');

	container.classList.add('form-select');
	container.id = id + '-cover';
	container.innerHTML = '';

	Promise.resolve()
		.then(() => select.insertAdjacentElement('beforebegin', container))
		.then(() => select.setAttribute('hidden', true))
		.then(() => {
			var instance = new SelectPure('#' + container.id, {
				options: customOptions,
				initValue: options.find((option) => option.selected).value,
				multiple: select.multiple,
				classNames: {
					select: "select-pure__select form-input",
				},
				autocomplete: settings.autocomplete,
				placeholder: select.getAttribute('placeholder'),
				icon: "form-select-remove",
				inlineIcon: false,

				onChange: values => {
					options
						.map((option) => option.selected = values.includes(option.value));

					var eventChange = new Event('change', {
						bubbles: true,
						cancelable: true,
					});
					var eventInput = new Event('input', {
						bubbles: true,
						cancelable: true,
					});

					select.dispatchEvent(eventChange);
					select.dispatchEvent(eventInput);
				}
			});
		})
}


function slidersInit() {
	if (document.querySelector('.user-tab-links')) {
		var userTabSwiper = new Swiper('.user-tab-links', {
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			spaceBetween: 8,
			slidesPerView: 'auto',
			slidesPerGroup: 1,
			slideClass: 'swiper-slide',
			touchRatio: 1,
			// centeredSlides: true,
			navigation: {
				nextEl: '.user-tab-arrow-next',
				prevEl: '.user-tab-arrow-prev',
			},
			breakpoints: {
				540: {
					centeredSlides: false,
				},
				992: {
					touchRatio: 0,
				}
			}

		});

		function onSlideClick(event) {
			if (!event.target.closest('.user-tab-links .swiper-slide')) return;

			let index = userTabSwiper.clickedIndex - 1;

			userTabSwiper.slideTo(index)
		}
		document.addEventListener('click', onSlideClick);
	}


	if (document.querySelector('.team-slider')) {
		var userTabSwiper = new Swiper('.team-slider', {
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			spaceBetween: 8,
			slidesPerView: 1,
			slidesPerGroup: 1,
			slideClass: 'swiper-slide',
			touchRatio: 1,
			// centeredSlides: true,
			navigation: {
				nextEl: '.team-slider-next',
				prevEl: '.team-slider-prev',
			},
			breakpoints: {
				540: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},

			}

		});

		function onSlideClick(event) {
			if (!event.target.closest('.user-tab-links .swiper-slide')) return;

			let index = userTabSwiper.clickedIndex - 1;

			userTabSwiper.slideTo(index)
		}
		document.addEventListener('click', onSlideClick);
	}






	if (document.querySelector('.jk-item-gallery-slider')) {
		var jkItemGallerySwiper = new Swiper('.jk-item-gallery-slider', {
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			// lazy:true,
			spaceBetween: 10,
			slidesPerView: 1,
			slidesPerGroup: 1,
			slideClass: 'swiper-slide',
			touchRatio: 1,
			navigation: {
				prevEl: '.jk-item-gallery-arrow-prev',
				nextEl: '.jk-item-gallery-arrow-next',
			},
			pagination: {
				el: '.jk-item-gallery-pagination',
				type: 'fraction',
			},
			breakpoints: {
				992: {
					// touchRatio: 0,
				}
			}

		});
	}



	if (document.querySelector('.jk-inner-thumbs')) {
		var jkInnerThumb = new Swiper('.jk-inner-thumbs', {
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			spaceBetween: 10,
			slidesPerView: 4,
			slidesPerGroup: 1,
			touchRatio: 0,
			navigation: {
				prevEl: '.jk-inner-thumbs-prev',
				nextEl: '.jk-inner-thumbs-next',
			},
			breakpoints: {
				621: {
					slidesPerView: 6,
				},
				681: {
					slidesPerView: 8,
				}
			}

		});
	}

	if (document.querySelector('.jk-inner-slider')) {
		var jkInnerSlider = new Swiper('.jk-inner-slider', {
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			loop: false,
			spaceBetween: 10,
			slidesPerView: 1,
			slidesPerGroup: 1,
			touchRatio: 1,
			navigation: {
				prevEl: '.jk-inner-slider-prev',
				nextEl: '.jk-inner-slider-next',
			},
			pagination: {
				el: '.jk-inner-slider-pagination',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					return current + ' из ' + total;
				},
			},

			thumbs: {
				swiper: document.querySelector('.jk-inner-thumbs').swiper
			},
			breakpoints: {
				992: {
					// touchRatio: 0,
				}
			}

		});
	}
}
(function () {
	function wavesInit() {
		Waves.init({
			duration: 1000,
		});
		Waves.attach('.btn', ['waves-custom']);
		Waves.attach('.waves', ['waves-custom']);

	}

	function click(event) {
		function scrollTo() {
			const target = event.target.closest('a[href]');
			const href = target.getAttribute('href');

			if (!href) return;
			if (href[0] != '#' || href == '#') return;

			event.preventDefault();
			const offset = 54 + 32 + 5;

			const offsetElement = document.createElement('div')
			offsetElement.style.position = 'absolute'
			offsetElement.style.left = '0'
			offsetElement.style.top = -offset + 'px'

			document.querySelector(href).style.position = 'relative'
			document.querySelector(href).appendChild(offsetElement)


			offsetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})

			document.querySelector(href).removeChild(offsetElement)
			document.querySelector(href).style.position = ''
		}
		if (event.target.closest('a[href]')) scrollTo();



	}



	function start() {
		slidersInit();
		// Modal.open('jk-edit-modal');
	}



	window.addEventListener('load', start);
	document.addEventListener('click', click);
	wavesInit();
})();

// Тултипы
(function () {


	const ToolTip = function (selector, options) {


		const defaultOptions = {
			title: 'tooltip',
			position: 'top'
		};

		const init = () => {
			const covers = document.querySelectorAll(selector);

			for (const i in covers) {
				if (!Object.hasOwnProperty.call(covers, i)) continue;

				const item = document.createElement('div');
				item.classList.add('tooltip')

				let position = options.position || (options.getPosition && options.getPosition(covers[i])) || defaultOptions.position || '';

				item.classList.add('tooltip--' + position);
				item.textContent = options.title || (options.getTitle && options.getTitle(covers[i])) || defaultOptions.title;

				covers[i].classList.add('tooltip-parent');
				covers[i].appendChild(item);
				covers[i].removeAttribute('title')
			}
		}

		return {
			init
		};

	}



	ToolTip('[data-tooltip]', {
		getTitle: (item) => item.getAttribute('title'),
		getPosition: (item) => item.getAttribute('data-tooltip-position'),
	}).init()
})();

// темы
(function () {
	const themes = {
		clear: {
			key: '1',
			name: 'default'
		},
		dark: {
			key: '2',
			name: 'dark'
		}
	}
	let activeTheme;


	document.addEventListener('keyup', (event) => {
		for (const i in themes) {
			if (!themes.hasOwnProperty(i)) continue;
			if (event.key == themes[i].key && event.altKey) {
				setTheme(themes[i])
				return;
			}
		}
	});

	function saveTheme() {
		const activeThemeJson = JSON.stringify(activeTheme);
		document.cookie = 'activeThemeJson=' + activeThemeJson + '; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT'
	}

	function setTheme(theme) {
		document.body.setAttribute('data-theme', theme.name);
		activeTheme = theme;
	}

	function initTheme() {

		const activeThemeJson = getCookie('activeThemeJson');

		if (!activeThemeJson) {
			setTheme(themes.clear);
			return;
		}

		const oldActiveTheme = JSON.parse(activeThemeJson);
		setTheme(oldActiveTheme);
	}

	initTheme();

	window.addEventListener('unload', saveTheme);
})();

// Загрузка фото в интпут
(function () {
	function onChangePhoto(event) {
		const field = event.target.closest('[data-field]');
		if (!field) return;
		const isMultiple = !!event.target.closest('[data-field].form-field--multiple');
		let files = event.target.files;

		if (event.target.files.length > 0) {
			addFiles(event.target.files, field, isMultiple);
			field.classList.add('active');
			return;
		}
	}

	document.addEventListener('change', onChangePhoto);
	document.addEventListener('dragenter', (event) => {
		event.preventDefault();
		const fields = [...document.querySelectorAll('.form-field--dropable')];
		fields.map((field) => field.classList.add('waiting'));

		if (event.target.closest('.form-field--dropable')) {
			event.target.closest('.form-field--dropable').classList.add('hovered');
		}
	})

	document.addEventListener('dragleave', (event) => {
		event.preventDefault()
		if (event.target.closest('.form-field--dropable') && event.relatedTarget && !event.relatedTarget.closest('.form-field--dropable')) {
			event.target.closest('.form-field--dropable').classList.remove('hovered');
		}

		if (event.target.closest('html') && !event.relatedTarget) {
			const fields = [...document.querySelectorAll('.form-field--dropable')];
			fields.map((field) => field.classList.remove('waiting'));
		}

	})
	document.addEventListener('dragexit', (event) => {
		event.preventDefault()
	});
	document.addEventListener('dragover', (event) => {
		event.preventDefault()
	});
	document.addEventListener('drop', (event) => {
		event.preventDefault()

		const fields = [...document.querySelectorAll('.form-field--dropable')];
		fields.map((field) => {
			field.classList.remove('hovered');
			field.classList.remove('waiting');
		});

		const field = event.target.closest('[data-field]');
		if (!field) return;


		if (event.target.closest('[data-field].form-field--multiple')) {
			if (event.dataTransfer.files.length > 0) {
				addFiles(event.dataTransfer.files, field, true);
				field.classList.add('active');
				return;
			}
		}


		if (event.dataTransfer.files.length > 0) {
			addFiles(event.dataTransfer.files, field, false);
			field.classList.add('active');
		}
	});


	function addFiles(fileList, field, multiple) {
		const input = field.querySelector('input');


		if (multiple) {
			const filesNode = field.querySelector('[data-field-files]');

			const detailFiles = input.detail ? [...input.detail.files, ...fileList] : [...fileList];
			input.detail = {
				files: detailFiles
			}

			let files = [...fileList]
				.filter((file) => {
					const type = file.type.replace(/\/.+/, '')
					return (type == 'image');
				})

			for (const i in files) {
				if (!Object.hasOwnProperty.call(files, i)) continue;

				const div = document.createElement('div');
				div.classList.add('form-field-file');

				const close = document.createElement('button');
				close.classList.add('form-field-file__close');
				close.addEventListener('click', (event) => {
					event.stopPropagation();
					event.preventDefault();

					input.detail = {
						files: input.detail.files.filter((item) => item != files[i])
					}
					div.parentElement.removeChild(div);
				})

				const img = document.createElement('img');
				img.src = URL.createObjectURL(files[i]);

				div.appendChild(img);
				div.appendChild(close);
				filesNode.appendChild(div);

				URL.revokeObjectURL(files[i]);

			}
			return;
		}




		input.detail = {
			files: [fileList[0]]
		}
		const photo = field.querySelector('[data-preview]');

		photo.src = URL.createObjectURL(fileList[0]);
		URL.revokeObjectURL(fileList[0]);
		field.classList.add('active')

		input.required = false;
		input.setAttribute('data-required', 'true');

	}


	document.addEventListener('click', (event) => {
		if (!event.target.closest('[data-clear-file]')) return;
		const inputId = event.target.getAttribute('data-for');
		const input = document.getElementById(inputId);
		if (!input) return;

		input.value = '';
		input.innerHTML = input.innerHTML;


		const field = input.closest('[data-field]');
		if (!field) return;
		const photo = field.querySelector('[data-preview]');
		photo.src = '';


	})
})();

function isReady(block) {
	const inputs = [...block.querySelectorAll('input'), ...block.querySelectorAll('select'), ...block.querySelectorAll('textarea')]
		.filter((input) => input.type != 'hidden');

	let ready = true;

	for (const i in inputs) {
		if (!Object.hasOwnProperty.call(inputs, i)) continue;
		if (inputs[i].type == 'checkbox' || inputs[i].type == 'radio') {
			if (inputs[i].checked == false && inputs[i].required) {
				ready = false;
				break;
			}

		} else if (inputs[i].value == '' && inputs[i].required) {
			ready = false;
			break;
		}

	}

	return ready;
}

// Навигация в модалке редактирования
(function () {
	function checkBlock(block) {
		const modal = block.closest('.jk-edit-modal');
		const link = modal.querySelector('[data-edit-nav="' + block.id + '"]');



		if (isReady(block)) link.classList.add('active');
		else link.classList.remove('active');
	}

	function onModal(event) {
		const blocks = event.detail.target.querySelectorAll('[data-edit-block]');
		for (const i in blocks) {
			if (!Object.hasOwnProperty.call(blocks, i)) continue;
			checkBlock(blocks[i]);
		}

	}


	function onInput(event) {
		const block = event.target.closest('[data-edit-block]');

		if (!block) return;

		checkBlock(block);
	}

	document.addEventListener('modalopen', onModal);
	document.addEventListener('input', onInput);


	// Добавление транспорта в модалке редактирования


	function checkFields(block) {

		if (isReady(block)) block.classList.remove('is-empty');
		else block.classList.add('is-empty');
	}

	function clearFields(block) {
		const inputs = [...block.querySelectorAll('input'), ...block.querySelectorAll('textarea')]
			.filter((input) => input.type != 'hidden');

		for (const i in inputs) {
			if (!Object.hasOwnProperty.call(inputs, i)) continue;

			if (inputs[i].type == 'checkbox' || inputs[i].type == 'radio') {
				inputs[i].checked = false

			} else inputs[i].value = '';

		}
	}

	document.addEventListener('click', function (event) {
		if (event.target.closest('[data-copy-node]')) {
			const id = event.target.closest('[data-copy-node]').getAttribute('data-copy-node');

			const node = document.getElementById(id);

			const copy = node.cloneNode(true);

			const selectToInit = [];

			const uniqueChilds = [...node.querySelectorAll('input[id]'), ...node.querySelectorAll('select[id]')];
			uniqueChilds.map((child) => {
				let childId = child.id;
				let newChildId = childId + '-0';


				if (child.getAttribute('data-select-id') != null) {
					const selectCover = copy.querySelector('#' + child.getAttribute('data-select-id') + '-cover')
					selectCover.parentElement.removeChild(selectCover)
					selectToInit.push(copy.querySelector('#' + child.id))
				}

				if (document.getElementById(newChildId)) {
					for (let i = 1; ; i++) {
						newChildId = childId + '-' + i;
						if (!document.getElementById(newChildId)) {
							break;
						}
					}
				}
				copy.querySelector('#' + child.id).id = newChildId;



			})


			copy.setAttribute('data-copy-target', id);
			clearFields(copy);
			checkFields(copy)


			let newId = id + '-0';
			if (document.getElementById(newId)) {
				for (let i = 1; ; i++) {
					newId = id + '-' + i;
					if (!document.getElementById(newId)) {
						break;
					}
				}
			}
			copy.id = newId;
			if (copy.querySelector('[data-remove-node="' + id + '"]')) {
				[...copy.querySelectorAll('[data-remove-node]')].map((btn) => {
					btn.setAttribute('data-remove-node', newId);
				})
			}

			let copyList = document.querySelectorAll('[data-copy-target="' + id + '"]');

			const max = node.getAttribute('data-max-copy');
			if (max != null && copyList.length >= max) {
				node.classList.add('max-copy');
				return;
			} else {
				node.classList.remove('max-copy');

			}

			if (copyList.length == 0) node.insertAdjacentElement('afterend', copy);
			else copyList[copyList.length - 1].insertAdjacentElement('afterend', copy);
			$('input[type="tel"]').mask('+7 (9 9 9) 9 9 9 - 9 9 - 9 9');

			// setTimeout(() => selectToInit.map((select) => initSelect(select)), 200)
			selectToInit.map((select) => initSelect(select, { autocomplete: select.getAttribute('data-autocomplete') }))

			const block = node.closest('[data-edit-block]');
			if (block) checkBlock(block);

			if (max != null && copyList.length >= max - 1) {
				node.classList.add('max-copy');
				return;
			} else {
				node.classList.remove('max-copy');

			}
		}
		if (event.target.closest('[data-remove-node]')) {
			const id = event.target.closest('[data-remove-node]').getAttribute('data-remove-node');

			const node = document.getElementById(id);
			const block = node.closest('[data-edit-block]');



			node.parentElement.removeChild(node);


			const originalId = node.getAttribute('data-copy-target');
			const originalNode = document.getElementById(originalId)
			// console.log(originalNode);
			const copyList = document.querySelectorAll('[data-copy-target="' + originalId + '"]');

			const max = originalNode.getAttribute('data-max-copy');
			if (max != null && copyList.length >= max) {
				originalNode.classList.add('max-copy');
			} else {
				originalNode.classList.remove('max-copy');

			}

			if (block) checkBlock(block);
		}

	})


	function onModal1(event) {
		const blocks = event.detail.target.querySelectorAll('[data-fields-isempty]');
		for (const i in blocks) {
			if (!Object.hasOwnProperty.call(blocks, i)) continue;
			checkFields(blocks[i]);
		}

		const isEmptyList = event.detail.target.querySelectorAll('[data-fields-isempty]');
		for (const i in isEmptyList) {
			if (!Object.hasOwnProperty.call(isEmptyList, i)) continue;
			// const isEmptyList = event.target.closest('[data-fields-isempty]');
			if (isEmptyList[i].getAttribute('[data-fields-isempty]') != null) checkFields(isEmptyList[i]);


		}

	}


	function onInput1(event) {
		const block = event.target.closest('[data-fields-isempty]');
		if (!block) return;

		checkFields(block);


	}


	document.addEventListener('modalopen', onModal1);
	document.addEventListener('input', onInput1);
})();


// Маска для инпутов
(function () {

	function maskMoney(event) {
		const value = event.target.value;
		const clearValue = value.replace(/[^0-9.,]/g, '');
		let floatValue = clearValue.replace(/[.,]/g, (i => m => !i++ ? m : '')(0));
		floatValue = floatValue.replace(/[.,]/g, '.');

		const floatArr = floatValue.split('.')


		let numValue = parseInt(floatArr[0]);

		const max = event.target.getAttribute('max')
		const min = event.target.getAttribute('min')
		if (max && numValue > parseInt(max)) numValue = max
		if (min && numValue < parseInt(min)) numValue = min

		const formatValue = new Intl.NumberFormat('ru-RU').format(numValue);
		event.target.value = floatValue
		if (!isNaN(numValue)) {
			event.target.value = formatValue + (floatArr[1] != undefined ? ('.' + floatArr[1]) : '');

		} else {
			event.target.value = '';
		}

	}

	function maskNumber(event) {
		let value = +event.target.value;

		const max = event.target.getAttribute('max')
		const min = event.target.getAttribute('min')
		if (max && parseInt(value) > parseInt(max)) value = max
		if (min && parseInt(value) < parseInt(min)) value = min

		if (!isNaN(value)) {
			event.target.value = value;

		} else {
			event.target.value = '';
		}
	}

	function maskYear(event) {
		const input = event.target
		removeHelper(input)
		if (input.value.length >= 4) {
			const min = input.getAttribute('min')
			if (min && parseInt(input.value) < parseInt(min)) input.value = min

		}
		let value = input.value.substring(0, 4)
		value = parseInt(value.replace(/[^0-9]/g, ''));


		const max = input.getAttribute('max')
		if (max && value > parseInt(max)) value = max


		if (!isNaN(value)) {
			input.value = value;
		} else {
			input.value = '';
		}

		const blurHandler = () => {
			const min = input.getAttribute('min')

			if (min && parseInt(input.value) < parseInt(min) && input.value != '') input.value = min

			input.removeEventListener('blur', blurHandler)
		}

		input.addEventListener('blur', blurHandler)


	}

	function maskLowerCase(event) {
		event.target.value = event.target.value.toLowerCase();
	}


	function maskInt(event) {
		let value = event.target.value.replace(/[^0-9]/g, '')
		value = parseInt(value);

		if (isNaN(value)) {
			event.target.value = '';
			return
		}
		event.target.value = value;
	}



	function input(event) {
		if (event.target.type == 'number') maskNumber(event);

		if (event.target.getAttribute('data-mask') != null) {
			if (event.target.getAttribute('data-mask').includes('number')) maskNumber(event);
			if (event.target.getAttribute('data-mask').includes('year')) maskYear(event);
			if (event.target.getAttribute('data-mask').includes('int')) maskInt(event);
			if (event.target.getAttribute('data-mask').includes('lowercase')) maskLowerCase(event);
			if (event.target.getAttribute('data-mask').includes('money')) maskMoney(event);
		}

		if (event.target.getAttribute('data-target') != null) {
			const targetid = event.target.getAttribute('data-target')
			const targetInput = document.getElementById(targetid)

			if (event.target.getAttribute('data-submit').includes('nospace')) {
				targetInput.value = event.target.value.replace(/\s/g, '')

			}
			if (event.target.getAttribute('data-submit').includes('number')) {
				targetInput.value = parseInt(event.target.value.replace(/[^0-9]/g, ''));

			}

			console.log(targetInput.value);
		}

		const value = event.target.value;
		const position = event.target.selectionStart;

		if (value[position - 1] == '2' && value[position - 2] == 'м' && (value[position - 3] == ' ' || !value[position - 3])) {
			event.target.value = value.substr(0, position - 1) + '²' + value.substr(position);
			event.target.selectionStart = position;
			event.target.selectionEnd = position;
		}
	}
	document.addEventListener('input', input);

})();


function initPhoneMask() {
	const separator = '_';
	$('input[type="tel"]').mask('+7 (9 9 9) 9 9 9 - 9 9 - 9 9', {
		placeholder: separator
	});
	$('input[type="tel"]').on('click', (event) => {
		const indexOfSeparator = event.target.value.indexOf(separator)
		setTimeout(() => {
			if (event.target.selectionStart > indexOfSeparator) {
				event.target.setSelectionRange(indexOfSeparator, indexOfSeparator)
			}
		}, 100)

	})
}

function initFancybox() {
	$('[data-fancybox-modal]').fancybox({
		type: 'ajax',
		touch: false,
		baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		afterLoad: (opt, obj) => {
			window.Tab.init(obj.$content[0]);
			window.Toggle.init(obj.$content[0]);
			initPhoneMask()
			initFancybox()


		}
	});
}
jQuery(document).ready(function () {

	jQuery.fancybox.defaults.backFocus = false;
	jQuery.fancybox.defaults.hash = false;
	jQuery.fancybox.defaults.buttons = ["close"];
	jQuery.fancybox.defaults.idleTime = false
	jQuery.fancybox.defaults.mobile.idleTime = false
	jQuery.fancybox.defaults.mobile.clickOutside = false
	jQuery.fancybox.defaults.mobile.clickSlide = false
	jQuery.fancybox.defaults.mobile.clickContent = false
	jQuery.fancybox.modalInit = initFancybox;
	jQuery.fancybox.defaults.ajaxTpl = '<section class="modal fancybox-container fancybox-modal fancybox-inner" role="dialog" tabindex="-1">' +
		'<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
		'<div class="fancybox-toolbar">{{buttons}}</div>' +
		'<div class="fancybox-navigation">{{arrows}}</div>' +
		'<div class=" modal-container"><div class="fancybox-stage"></div></div>' +
		'<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
		'</section>';

	initPhoneMask()

	jQuery.fancybox.openModal = (src, ...options) => {
		$.fancybox.open({
			src: src,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
			...options
		});
	}


	jQuery.fancybox.modalInit()
});

document.addEventListener('click', (event) => {
	// console.log('click');
	if (event.target.closest('.fancybox-slide') && !event.target.closest('.fancybox-content')) {
		jQuery.fancybox.close()
	}
});



(function () {
	document.addEventListener('modalopen', (event) => {
		if (event.target.closest('.js-modal-alert')) {

			event.detail.closePromise
				.then((options) => console.log(!!options));
		}
	})
})();



(function () {
	document.addEventListener('click', (event) => {
		if (!event.target.closest('[data-checkall]')) return;

		const id = event.target.getAttribute('data-checkall');
		const node = document.getElementById(id);

		let fields = [...node.querySelectorAll('input')];
		fields = fields
			.filter((field) => field.type == 'checkbox')
			.map((field) => field.checked = true);

	})
})();

function validateForm(form) {

	const inputs = [...form.querySelectorAll('input')]
		.filter((input) => input.required)
	let isReady = true;

	const onInput = (event) => {
		const field = event.target.closest('.form-field');
		if (!field) return;
		field.classList.remove('form-field--error');
		const helper = field.querySelector('.form-helper');

		if (helper) {
			helper.textContent = '';
		}


	}

	inputs.map((input) => {
		const field = input.closest('.form-field');
		if (!field) return;
		if (input.value.trim() == '') {
			isReady = false;
			field.classList.add('form-field--error');

			input.addEventListener('input', onInput)

			const helper = field.querySelector('.form-helper') || document.createElement('div');
			helper.classList.add('form-helper');
			helper.textContent = 'Заполните поле';
			field.appendChild(helper);
		}


	})
	return isReady;
}
// не нашли что искали
(function () {

	document.addEventListener('click', async (event) => {
		if (event.target.closest('.-save-user-filter-form-add-')) {
			const block = event.target.closest('.smartfilter');
			const iblockid = parseInt(block.getAttribute('data-iblockid'));

			let p13, p11MAX, p20MAX;

			if (iblockid == 2) {
				p13 = $('#select-id-13 option:selected').text(); //Технология
				p11MAX = $("#MAIN_FILTER_20_MAX").val(); //Площадь дома ДО
				p20MAX = $("#MAIN_FILTER_18_MAX").val(); //Цена ДО
			}
			if (iblockid == 6) {
				p13 = $('#select-id-55 option:selected').text(); //Технология
				p11MAX = $("#MAIN_FILTER_57_MAX").val(); //Площадь дома ДО
				p20MAX = $("#MAIN_FILTER_63_MAX").val(); //Цена ДО
			}
			console.log(iblockid, p13, p11MAX, p20MAX);

			$.fancybox.open({
				src: encodeURI('/local/ajax/modal_save_user_filter_form.php?iblockid=' + iblockid + '&type=' + p13 + '&pricemax=' + p20MAX + '&shousemax=' + p11MAX),
				type: 'ajax',
				touch: false,
				baseTpl: jQuery.fancybox.defaults.ajaxTpl,
			});

		}
	})


	$('body').on('click', '.notfindforme', function (event) {
		const form = event.target.closest('.list_hidden_input_form');
		var data = $(form).find(':input').serialize();
		if (!validateForm(form)) {
			return;
		}

		$.fancybox.open({
			src: '/local/ajax/AMOsend.php?ajax=Y&showmodal=filter-success-modal&' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	});


	$('body').on('click', '.notfindform_false', function () {
		var data = $('.list_hidden_input_form :input').serialize();
		$.fancybox.open({
			src: '/local/ajax/modal_notfindform_false.php?' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	});

	$('body').on('click', '.save-callback-modal', function () {
		var data = $('.form-callback-modal :input').serialize();
		$.fancybox.open({
			src: '/local/ajax/AMOsend.php?ajax=Y&showmodal=callback-success-modal&' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	});

	$('body').on('click', '.save-callback-expertise-modal', function () {
		var data = $('.callback-expertise-modal :input').serialize();

		if (!validateForm(document.querySelector('.callback-expertise-modal'))) {
			return;
		}



		$.fancybox.open({
			src: '/local/ajax/AMOsend.php?ajax=Y&showmodal=callback-expertise-success-modal&' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	});

	$('body').on('click', '.order_expertise', function (event) {
		$.fancybox.open({
			src: '/local/ajax/order_expertise.php?showmodal=Y&ajax=Y',
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl
		});
	});
})();

//сохранение email при сохранении фильтра пользователя
document.addEventListener('submit', async (event) => {
	if (event.target.closest('#modal-filter-user-email-form')) {
		event.preventDefault();
		var formData = new FormData(document.getElementById("modal-filter-user-email-form"));
		const options = { method: 'POST', body: formData };
		let response = await fetch('/local/ajax/modal_save_user_filter_form.php', options);
		let html = await response.text();
		if (html) {
			$.fancybox.close();
			$.fancybox.open(html, { touch: false, baseTpl: jQuery.fancybox.defaults.ajaxTpl });
		}
	}
})

/************************************/
/*
Серга с этим надо чтото сделать вызывается при загрузке страницы дважды
*/
function user_filter_find() {
	let base = $(".filter-form:not(.hidden) .-ChooseObj-:checked").data('choose');
	let TYPEHOUSE,
		PRICE,
		S_HOUSE;
	// base = house|flat
	if (base == "house") {
		TYPEHOUSE = $('#select-id-13 option:selected').text();
		PRICE = $('#MAIN_FILTER_18_MAX').val();
		S_HOUSE = $('#MAIN_FILTER_20_MAX').val();
	}
	if (base == "flat") {
		TYPEHOUSE = $('#select-id-55 option:selected').text();
		PRICE = $('#MAIN_FILTER_63_MAX').val();
		S_HOUSE = $('#MAIN_FILTER_57_MAX').val();
	}
	// console.log(base, TYPEHOUSE, PRICE, S_HOUSE); 

	$.ajax({
		url: '/local/ajax/user-filter-find.php',
		data: { 'TYPEHOUSE': TYPEHOUSE, 'PRICE': PRICE, 'S_HOUSE': S_HOUSE },
		success: function (json) {
			if (json.status) {
				$('#userfilerform_' + base).html('<div class="filter-form__link filter-form__remove "> <button type="button" class="link save-user-filter-form -saved-search-item__remove-" data-action="remove" data-modal-link="delete-saved" data-id="' + json.id + '"> <svg class="icon"> <use xlink:href="/local/img/sprite.svg#delete" /></svg> Удалить поиск </button> </div>');

			} else {
				$('#userfilerform_' + base).html('<div class="filter-form__link "> <a class="link save-user-filter-form -save-user-filter-form-add-" data-action="add"> <svg class="icon"> <use xlink:href="/local/img/sprite.svg#like-search" /></svg> Сохранить фильтр и оповещать о новых объектах </a> </div>');
			}
		},
		dataType: 'json'
	});
}
//поиск ранее сохранённых фильтров

window.addEventListener('load', () => {
	// user_filter_find()
	document.addEventListener('change', async (event) => {

		if (!event.target.closest('.smartfilter')) { return; }
		// if (event.target.closest('#select-id-5')) { user_filter_find() }
		if (event.target.closest('#select-id-13')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_18_MAX_pseudo')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_20_MAX_pseudo')) { user_filter_find() }
		// --------------------- //
		if (event.target.closest('#select-id-55')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_63_MAX_pseudo')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_57_MAX_pseudo')) { user_filter_find() }
	})
	document.addEventListener('keyup', async (event) => {
		if (!event.target.closest('.smartfilter')) { return; }
		if (event.target.closest('#MAIN_FILTER_18_MAX_pseudo')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_20_MAX_pseudo')) { user_filter_find() }
		// --------------------- //
		if (event.target.closest('#MAIN_FILTER_63_MAX_pseudo')) { user_filter_find() }
		if (event.target.closest('#MAIN_FILTER_57_MAX_pseudo')) { user_filter_find() }
	})
})

/***********************************/



//сохранить изменения в фильре пользователя/удалить
window.addEventListener('load', () => {
	document.addEventListener('change', async (event) => {
		if (event.target.closest('.UF_USE_EMAIL')) {

			let action = 'update';
			let field = 'UF_USE_EMAIL';
			let field_value = $(event.target).prop('checked');
			let id = $(event.target).data('id');

			$(event.target).attr('disabled', true);
			if (field_value == false) { field_value = 0; }

			$.ajax({
				url: '/local/ajax/user-filter-action.php',
				data: {
					'id': id, 'action': action, 'field': field, 'field_value': field_value
				},
				success: function () {
					$(event.target).attr('disabled', false);
				}
			});
		}
	})
})
//удалить пользовательский фильтр из списка
document.addEventListener('click', async (event) => {
	if (event.target.closest('.-saved-search-item__remove-')) {


		let id = event.target.closest('.-saved-search-item__remove-').getAttribute('data-id');
		let postaction = event.target.closest('.-saved-search-item__remove-').getAttribute('data-postaction');
		$.fancybox.open({
			src: '/local/ajax/modal-confirm-remove-user-filter.php?id=' + id + '&postaction=' + postaction,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	}
})

//удалить пользовательский фильтр и обновить страницу после подтверждения
document.addEventListener('click', async (event) => {
	if (event.target.closest('.confirmed-remove-user-filter')) {

		let id = $(event.target).data('id');
		let postaction = $(event.target).data('postaction');
		$.ajax({
			url: '/local/ajax/user-filter-action.php',
			data: { 'id': id, 'action': 'remove' },
			success: function () {
				if (postaction == 'reload') { location.href = '/objects/?del_filter=Y'; }
				if (postaction == 'remove') { $("#card_" + id).remove(); }
				$.fancybox.close();
			}
		});
	}
})

document.addEventListener('submit', async (event) => {
	if (event.target.closest('#modal-update-user')) {
		event.preventDefault();
		var formData = new FormData(document.getElementById("modal-update-user"));
		const options = {
			method: 'POST',
			body: formData
		};
		let response = await fetch('/local/ajax/update_user.php', options);
		let result = await response.json();
		if (result.status) {
			$.fancybox.close();
			location.reload();
		} else {
			$('#field-password').addClass('form-field--error').append('<div class="form-helper">' + result.text + '</div>')
		}
	}
})

document.addEventListener('submit', (event) => {
	if (event.target.closest('#modal-request-add')) {
		event.preventDefault();
		const data = $(event.target).serialize();
		$.fancybox.close();

		$.fancybox.open({
			src: '/local/ajax/AMOsend.php?ajax=Y&showmodal=modal-request-add&' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});
	}

	//если пользователь не авторизован сохраним форму заявки на экспертизу
	if (event.target.closest('#modal-expertise-nonauth')) {
		event.preventDefault();
		$.fancybox.close();
		const data = $(event.target).serialize();

		/*$.fancybox.open({
			src: '/local/ajax/php/modal-expertise-nonauth-save.php?' + data,
			type: 'ajax',
			touch: false,
			baseTpl: jQuery.fancybox.defaults.ajaxTpl,
		});*/

		/*let formData = new FormData(document.getElementById("modal-expertise-nonauth"));
		const options = { method: 'GET', body: formData };
		await fetch('/local/ajax/php/modal-expertise-nonauth-save.php', options);*/

		$.ajax({ url: '/local/ajax/php/modal-expertise-nonauth-save.php?' + data });

	}
});

$(function () {
	$("body").on("click", ".show_phone", function () {
		let el = $(this);
		let type = $(this).data('type');
		if (type == undefined) type = 'get';

		if (type == 'show') {
			// console.log('show', type);
			$.ajax({
				url: '/local/ajax/getphonebyid.php',
				data: {
					'id': $(this).data('item')
				},
				success: function (html) {
					el.removeClass('btn--primary').addClass('btn--primary--light waves-effect waves-custom').text(html);
				},
				dataType: 'html'
			});
		}
		if (type == 'get') {
			$.fancybox.open({
				src: '/local/ajax/getphonebyid.php?id=' + $(this).data('item'),
				type: 'ajax',
				touch: false,
				baseTpl: jQuery.fancybox.defaults.ajaxTpl
			});
			el.removeClass('btn--primary').addClass('btn--primary--light waves-effect waves-custom').text('Запрошено');
		}
	});
	// console.log(type);
});


function calk_user_filters(classlist, classinput) {
	var bodies = $("." + classlist),
		i = 0;
	(function loadBody() {
		let id = $(bodies.eq(i)).data('id');
		$('.' + classinput).eq(i++).load("/local/ajax/user-filter-count.php?id=" + id, loadBody);
	})();
}




function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		// console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		// console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
}


document.addEventListener('click', (event) => {
	if (!event.target.closest('[data-copy-to-clipboard]')) return;
	const text = event.target.closest('[data-copy-to-clipboard]').getAttribute('data-copy-to-clipboard');
	const cover = event.target.closest('[data-copy-to-clipboard]')

	copyTextToClipboard(text);

	if (cover.classList.contains('copied')) return;

	cover.classList.remove('copied');
	setTimeout(() => {
		cover.classList.add('copied');
	}, 100)
	setTimeout(() => {
		cover.classList.remove('copied');
	}, 2000)
});



function removeHelper(input, text) {
	const field = input.closest('.form-field');

	if (!field) return;
	field.classList.remove('form-field--error');
	const helper = field.querySelector('.-dinamic-form-helper-');
	if (!helper) return
	if (text && helper.textContent != text) return


	helper.parentElement.removeChild(helper)

}

function addHelper(input, text, error) {
	const field = input.closest('.form-field');
	if (!field) return;
	const helper = field.querySelector('.-dinamic-form-helper-') || document.createElement('div');
	helper.classList.add('form-helper');
	helper.classList.add('-dinamic-form-helper-');
	helper.textContent = text;
	if (error) helper.style.color = '#EA4D3D'
	if (!error) helper.style.color = ''
	field.appendChild(helper);


}




(() => {

	const onUnFocus = (event) => {
		removeHelper(event.target)

		event.target.removeEventListener('blur', onUnFocus)
	}

	const onInput = (event) => {

		if (!event.target.closest('input')) return
		const input = event.target;




		// if (input.getAttribute('data-helper-is-caps') != null) {

		// 	input.addEventListener('blur', onUnFocus)

		// 	addHelper(input, 'Включен Caps-lock');


		// }

		if (input.getAttribute('data-helper-is-cir') != null) {
			const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
			const rusUpper = rusLower.toUpperCase()
			const rus = rusLower + rusUpper

			const valueArr = [...input.value]

			let rusContain = false
			valueArr.map((char) => {
				if (rus.includes(char)) {
					rusContain = true
				}
			})


			if (rusContain) {

				input.removeEventListener('blur', onUnFocus)
				addHelper(input, 'Содержит кириллицу', true);
			} else {
				removeHelper(input, 'Содержит кириллицу');
			}



		}



	}

	const onKeyPress = (event) => {
		if (!event.target.closest('input')) return
		const input = event.target;

		if (input.getAttribute('data-helper-is-caps') != null && event.getModifierState("CapsLock")) {
			input.addEventListener('blur', onUnFocus)
			addHelper(input, 'Включен Caps-lock');
			onInput(event)

		} else {
			input.removeEventListener('blur', onUnFocus)
			removeHelper(input, 'Включен Caps-lock');
		}


	}
	document.addEventListener('keydown', onKeyPress)
	document.addEventListener('input', onInput)










	window.form = {}
	window.form.validate = (form) => {
		const inputs = [...form.querySelectorAll('input')]
		let isReady = true;

		const onInput = (event) => {
			removeHelper(event.target)
			event.target.removeEventListener('focus', onInput)

		}


		inputs.map((input) => {
			const field = input.closest('.form-field');
			if (!field) return;


			if (input.getAttribute('data-required') != null && input.value.trim() == '') {
				isReady = false;
				field.classList.add('form-field--error');

				input.addEventListener('focus', onInput)
				addHelper(input, 'Заполните поле');


			}


		})
		return isReady;
	}
})();


(() => {
	document.addEventListener('input', (event) => {
		if (!event.target.closest('[data-one-required]')) return

		const id = event.target.closest('[data-one-required]').getAttribute('data-one-required');

		const inputs = document.querySelectorAll(`[data-one-required="${id}"]`)

		let isFilled = false;

		inputs.forEach((input) => {
			if (input.value.trim() !== '') isFilled = true
		})

		inputs.forEach((input) => {
			if (isFilled) input.removeAttribute('required')
			if (!isFilled) input.setAttribute('required', '')
		})

	})
})();








document.addEventListener('tabchange', (event) => {
	// console.log(event.detail);

	if (event.detail.target.querySelector('.lk-user-table-btns')) {
		const btns = [...event.detail.target.querySelectorAll('.lk-user-table-btn')]
		btns.map((btn) => {
			if (btn.classList.contains('tab-active')) {
				btn.classList.add('btn--primary--pale')
				btn.classList.remove('btn--contur')
			} else {
				btn.classList.remove('btn--primary--pale')
				btn.classList.add('btn--contur')
			}
		})

	}
})



document.addEventListener('click', (event) => {
	if (event.target.closest('.-statistic-call-')) {
		fetch('/local/ajax/php/statistic-call.php')
			.then((response) => response.text())
			.then((result) => console.log(result))
	}
})


if (navigator.share && screen.width < 992) {
	document.addEventListener('click', (event) => {
		if (event.target.closest('[data-share-mobile]')) {
			navigator.share({
				url: event.target.closest('[data-share-mobile]').getAttribute('data-share-mobile')
			})
		}
	})


}