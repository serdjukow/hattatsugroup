import { Swiper, EffectFade, Navigation, Pagination, Scrollbar, Controller, Parallax, Mousewheel } from 'swiper'
Swiper.use([EffectFade, Navigation, Pagination, Scrollbar, Controller, Parallax, Mousewheel])

import { gsap, Power2 } from 'gsap'

import MicroModal from 'micromodal'



document.addEventListener('DOMContentLoaded', () => {
	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableScroll: true,
		disableFocus: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})

	function modalPolicy() {
		let policyConfirmation = localStorage.getItem('policy-confirmation')
		if (!policyConfirmation || +policyConfirmation + 31536000000 < Date.now()) {
			setTimeout(() => {
				MicroModal.show('modal-2')
				localStorage.setItem('policy-confirmation', Date.now())
			}, 1000)
		}
	}
	modalPolicy()

	const swiperText = new Swiper('.slider-text', {
		autoplay: true,
		//direction: 'vertical',
		loop: false,
		effect: 'slide',
		speed: 2000,
		mousewheel: {
			invert: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
	})

	const swiperIMG = new Swiper('.slider-img', {
		direction: 'vertical',
		loop: false,
		speed: 2000,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				return `0${total}`
			},
		},
	})

	swiperIMG.controller.control = swiperText
	swiperText.controller.control = swiperIMG

	// slideChange

	let curnum = document.querySelector('.current'),
		pagcur = document.querySelector('.slider-pagination-current'),
		gear = document.querySelector('.slider-gear')

	swiperText.on('slideChange', function () {
		let ind = swiperText.realIndex + 1
		gsap.to(curnum, 0.2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function () {
				gsap.to(curnum, 0.1, {
					force3D: true,
					y: 10,
				})
				curnum.innerHTML = `0${ind}`
				pagcur.innerHTML = `0${ind}<span class="slider-pagination-current__dot">.</span>`
			},
		})
		gsap.to(curnum, 0.2, {
			force3D: true,
			y: 0,
			delay: 0.3,
			opacity: 1,
			ease: Power2.easeOut,
		})
	})

	swiperText.on('slideNextTransitionStart', function () {
		gsap.to(gear, 2.6, {
			rotation: '+=45',
			ease: Power2.easeOut,
		})
	})

	swiperText.on('slidePrevTransitionStart', function () {
		gsap.to(gear, 2.6, {
			rotation: '-=45',
			ease: Power2.easeOut,
		})
	})

	// < menu burger
	const iconMenu = document.querySelector('.menu__icon')
	const menuButton = document.querySelector('.menu__button')
	const homeAside = document.querySelector('.home-aside')
	if (iconMenu) {
		menuButton.addEventListener('click', function (e) {
			document.body.classList.toggle('_lock')
			iconMenu.classList.toggle('_active')
			menuButton.classList.toggle('_active')
			homeAside.classList.toggle('_active')
		})
	}
	// </ menu burger

	const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick)
		})
		function onMenuLinkClick(e) {
			const menuLink = e.target
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto)
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight

				if (iconMenu.classList.contains('_active')) {
					document.body.classList.remove('_lock')
					iconMenu.classList.remove('_active')
					menuButton.classList.remove('_active')
					homeAside.classList.remove('_active')
				}
				window.scrollTo({
					top: gotoBlockValue,
					behavior: 'smooth',
				})
				e.preventDefault()
			}
		}
	}

	const isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i)
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i)
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i)
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i)
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
		},
		any: function () {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
		},
	}

	if (isMobile.any()) {
		document.body.classList.add('_touch')

		let menuArrows = document.querySelectorAll('.menu__arrow')
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index]
				menuArrow.addEventListener('click', function (e) {
					menuArrow.parentElement.classList.toggle('_active')
				})
			}
		}
	} else {
		document.body.classList.add('_pc')
	}
})
