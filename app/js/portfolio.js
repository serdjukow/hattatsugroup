const portfolio = () => {
	const portfolioUrl = '../db/data.json'
	let isLlocked = false

	async function sendRequest() {
		const response = await fetch(portfolioUrl)
		const myObj = await response.json()
		try {
			if (window.location.pathname === '/portfolio.html') {
				toHtml(myObj)
				buttonsSet(myObj)
				galleryFilter(myObj)
			}
		} catch (err) {
			console.log(err)
		}
	}
	sendRequest()

	function sendData(itemId) {
		fetch('https://serdjukow.eu/edit.php', {
			method: 'POST',
			body: JSON.stringify(itemId),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(responce => {
				if (responce.ok) {
					return responce.json()
				} else {
					throw new Error('')
				}
			})
			.then(data => {
				updateLikes(data)
				toHtml(data)
			})
			.catch(error => {
				console.error(error.message)
			})
	}

	function toHtml(myObj) {
		const galleryItems = document.querySelector('.gallery__items')
		galleryItems.innerHTML = ''

		myObj.forEach(element => {
			galleryItems.innerHTML += `
			<div id="PF_${element.id}"  data-gallery="${element.description ? element.description : ''}" class="gallery__item item" >
				<div class="item__img-container">
					<img src="${element.img}" alt="${element.project}" />
				</div>
				<div class="item__content">
					<h3 class="item__title">${element.project}</h3>
					<div class="item__desc">
					    ${element.type ? `<p>${element.type}</p>` : ''}
						${element.description ? `<p>${element.description}</p>` : ''}
						${element.design ? `<p>${element.design}</p>` : ''}
						${element.stack ? `<p>${element.stack}</p>` : ''}
					</div>
				</div>
				<div class="item__buttons">
					<a class="item__button button-demo" href="${element.link}" title="Demo" target="_blank">
						<div class="button-demo__svg">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-eye fa-w-18 fa-9x"><path fill="currentColor" d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z" class=""></path></svg>
						</div>
					</a>

					<button id="BT_${element.id}"  ${isLlocked ? 'disabled' : ''} class="item__button button-like" title="Add like">
						<div class="button-like__svg">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="thumbs-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-thumbs-up fa-w-16 fa-9x"><path fill="currentColor" d="M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z" class=""></path>
							</svg>
						</div>
						<div class="button-like__count">${element.like}</div>
					</button>
				</div>
			</div>
			`
		})
	}

	function buttonsSet(myObj) {
		const arrButtons = []
		arrButtons.push('all')
		myObj.forEach(element => arrButtons.push(element.type.toLowerCase()))
		addButtons(new Set(arrButtons))
	}

	function addButtons(buttonsSet) {
		const galleryMenu = document.querySelector('.gallery__menu')
		galleryMenu.innerHTML = ''
		buttonsSet.forEach(element => (galleryMenu.innerHTML += `<button data-button="${element}" class="button-filter ${element === 'all' ? 'active' : ''}">${element}</button>`))
	}

	const clearActive = () => {
		const galleryButtons = document.querySelectorAll('.gallery__menu button')
		galleryButtons.forEach(button => {
			button.classList.remove('active')
		})
	}

	function galleryFilter(myObj) {
		const galleryMenu = document.querySelector('.gallery__menu')
		galleryMenu.addEventListener('click', e => {
			e.preventDefault()
			if (e.target.dataset.button) {
				clearActive()
				e.target.classList.add('active')
				e.target.dataset.button === 'all' ? toHtml(myObj) : toHtml(myObj.filter(elem => elem.type.toLowerCase() === e.target.dataset.button))
			}
		})
	}

	if (document.querySelector('.gallery__items')) {
		const galleryItems = document.querySelector('.gallery__items')
		galleryItems.addEventListener('click', event => {
			if (!galleryItems) {
				sendRequest()
			}
			let id = event.target.id.split('_')[1]
			if (event.target.closest('.button-like')) {
				event.preventDefault()
				if (checkLike(id)) {
					sendData(id)
				}
			}
		})
	}

	function updateLikes(newArr) {
		const galleryItems = document.querySelectorAll('.gallery__item')
		galleryItems.forEach(item => {
			let id = +item.id.split('_')[1]
			let elem = newArr.filter(el => el.id === id)
			item.querySelector('.button-like__count').textContent = elem[0].like
		})
	}

	function checkLike(likeId) {
		const likesObj = { id: likeId }
		const localbksef = JSON.parse(sessionStorage.getItem('checkLike'))
		if (!sessionStorage.getItem('checkLike')) {
			sessionStorage.setItem('checkLike', JSON.stringify([likesObj]))
			return true
		} else if (sessionStorage.getItem('checkLike') && localbksef.findIndex(item => item.id === likeId) == -1) {
			const likesArr = [...localbksef, likesObj]
			sessionStorage.setItem('checkLike', JSON.stringify(likesArr))
			return true
		}
		return false
	}
}
portfolio()
