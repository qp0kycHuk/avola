(function () {
	const attr = {
		cover: 'data-parallax',
		speed: 'data-speed',
		parent: 'data-parallax-parent',

	}


	function parallax() {
		const parallaxItems = document.querySelectorAll('[' + attr.cover + ']');

		for (const i in parallaxItems) {
			if (!parallaxItems.hasOwnProperty(i)) return;

			const elem = parallaxItems[i];

			const parent = elem.closest('[' + attr.parent + ']') || elem.parentElement;
			const parentOffset = parent.getBoundingClientRect().top;
			const coof = -parentOffset / 10;
			const speed = elem.getAttribute(attr.speed);


			elem.style.transform = 'translateY(' + coof * speed + '%)';

		}
	}

	parallax();
	window.addEventListener('scroll', parallax);

})();