function getNextElement(element, firstSibling) {
  return element.nextElementSibling ? element.nextElementSibling : firstSibling
}

function getPreviousElement(element, lastSibling) {
  return element.previousElementSibling
    ? element.previousElementSibling
    : lastSibling
}

export default class Carousel {
  constructor(element, timeout = 5000) {
    this.carousel = element
    this.slidesContainer = this.carousel.querySelector('.slides')
    this.#init(timeout)
  }

  getFirstSlide() {
    const slides = Array.from(this.slidesContainer.children)
    return slides[0]
  }

  getLastSlide() {
    const slides = Array.from(this.slidesContainer.children)
    return slides[slides.length - 1]
  }

  #init(timeout) {
    this.#startTimer(timeout)

    const next = this.carousel.querySelector('.next')
    next.addEventListener('click', () => {
      this.nextSlide(this.getFirstSlide())
      this.#startTimer(timeout)
      console.log('next')
    })

    const previous = this.carousel.querySelector('.previous')
    previous.addEventListener('click', () => {
      this.previousSlide(this.getLastSlide())
      this.#startTimer(timeout)
      console.log('previous')
    })

    const dots = this.carousel.querySelector('.dots')
    // warning! slides variable is not updated when dom changes
    const slides = Array.from(this.slidesContainer.children)
    slides.forEach((_, slideId) => {
      const dot = document.createElement('button')
      dot.textContent = '•'
      dot.addEventListener('click', () => {
        this.setSlide(slideId)

        this.#startTimer(timeout)

        console.log(slideId + 1)
      })
      dots.appendChild(dot)
    })
  }

  #startTimer(timeout) {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(() => {
      this.nextSlide(this.getFirstSlide())
    }, timeout)
  }

  getActiveSlide() {
    return this.slidesContainer.querySelector('.active')
  }

  previousSlide(lastSlide) {
    const activeSlide = this.getActiveSlide(this.slidesContainer)
    const previousSlide = getPreviousElement(activeSlide, lastSlide)

    activeSlide.classList.remove('active')
    previousSlide.classList.add('active')
  }

  nextSlide(firstSlide) {
    const activeSlide = this.getActiveSlide(this.slidesContainer)
    const nextSlide = getNextElement(activeSlide, firstSlide)

    activeSlide.classList.remove('active')
    nextSlide.classList.add('active')
  }

  setSlide(index) {
    const slides = Array.from(this.slidesContainer.children)
    const selectedSlide = slides[index]
    if (!selectedSlide) {
      console.log(`setSlide: Slide with index '${index}' doesn't exist`)
      return
    }

    const activeSlide = this.getActiveSlide(this.slidesContainer)
    activeSlide.classList.remove('active')

    selectedSlide.classList.add('active')
  }
}

/**
 * Expected html structure
 * <div class="carousel">
      <div class="frame">
        <div class="slides">
          <div class="slide active">1</div>
          <div class="slide">2</div>
          <div class="slide">3</div>
        </div>
        <button class="previous">&lt;</button>
        <button class="next">&gt;</button>
        <div class="dots"></div>
      </div>
    </div>
 */
