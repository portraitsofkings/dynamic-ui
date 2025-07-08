import Dropdown from './dropdown/Dropdown.js'
const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach(dropdown => new Dropdown(dropdown))

import Carousel from './carousel/Carousel.js'
const carousels = document.querySelectorAll('.carousel')
carousels.forEach(carousel => new Carousel(carousel))
