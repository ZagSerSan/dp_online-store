export const cartAnimation = (target, state) => {
  const cartHelperEl = document.querySelector('.cart-helper')
  const headerCartCoords = document.querySelector('[data-cart="cart"]').getBoundingClientRect()
  if (state) {
    const cartHelperEl = document.querySelector('.cart-helper')

    cartHelperEl.style.top = `${headerCartCoords.top + 10}px`
    cartHelperEl.style.left = `${headerCartCoords.left}px`
    cartHelperEl.style.height = `25px`
    cartHelperEl.style.width = `25px`
    setTimeout(() => {
      cartHelperEl.classList.add('active')
    }, 100);
    setTimeout(() => {
      cartHelperEl.style.top = `${headerCartCoords.top + 30}px`
      cartHelperEl.style.left = `${headerCartCoords.left}px`
      cartHelperEl.style.transform = 'rotateZ(45deg)'
    }, 150)
    setTimeout(() => {
      cartHelperEl.style.transform = 'rotateZ(0deg)'
      cartHelperEl.classList.remove('active')
    }, 850)
  } else {
    const targetCoords = target.getBoundingClientRect()
    cartHelperEl.style.top = `${targetCoords.top}px`
    cartHelperEl.style.left = `${targetCoords.left}px`
    cartHelperEl.style.height = `30px`
    cartHelperEl.style.width = `30px`
    setTimeout(() => {
      cartHelperEl.classList.add('active')
    }, 100);
    setTimeout(() => {
      cartHelperEl.style.top = `${headerCartCoords.top}px`
      cartHelperEl.style.left = `${headerCartCoords.left}px`
      cartHelperEl.style.transform = 'rotateZ(45deg)'
    }, 150)
    setTimeout(() => {
      cartHelperEl.style.transform = 'rotateZ(0deg)'
      cartHelperEl.classList.remove('active')
    }, 850)
  }
}
