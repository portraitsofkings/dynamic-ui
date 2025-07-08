export default class Dropdown {
  constructor(element) {
    this.dropdown = element
    this.button = this.dropdown.querySelector('.button')
    this.items = this.dropdown.querySelector('.items')
    this.button.addEventListener('click', () => {
      this.toggleVisible()
    })
  }

  toggleVisible() {
    const classList = this.items.classList
    const isVisible = classList.contains('hidden')
    if (isVisible) {
      classList.remove('hidden')
    } else {
      classList.add('hidden')
    }
  }
}

/**
 * Expected html structure
 *  <div class="dropdown">
      <button class="button">Dropdown</button>
      <div class="items hidden">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
      </div>
    </div>
 */
