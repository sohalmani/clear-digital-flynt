import $ from 'jquery'
import 'core-js/es/number'
import Swiper, { Navigation, A11y, Autoplay, Pagination } from 'swiper/swiper.esm'
import 'swiper/swiper-bundle.css'

Swiper.use([Navigation, A11y, Autoplay, Pagination])

class BlockImageTwoCol extends window.HTMLDivElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.props = this.getInitialProps()
    this.state = this.getInitialState()
    this.resolveElements()
    this.bindFunctions()
    this.bindEvents()
  }

  getInitialProps () {
    // eslint-disable-next-line prefer-const
    let data = {}
    // try {
    //   data = JSON.parse($('script[type="application/json"]', this).text())
    // } catch (e) {}
    return data
  }

  getInitialState () {
    return {}
  }

  resolveElements () {
    this.$slider = $('.swiper', this)
  }

  bindFunctions () {

  }

  bindEvents () {

  }

  connectedCallback () {
    if (this.$slider.length) {
      this.initSlider()
    }
  }

  initSlider () {
    const parameters = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 0,
      breakpoints: {
        992: {
          slidesPerView: 2
        },
        1200: {
          noSwiping: true,
          noSwipingClass: 'swiper-slide',
          slidesPerView: 2
        }
      }
    }
    this.slider = new Swiper(this.$slider.get(0), parameters)
  }
}

window.customElements.define('flynt-block-image-two-col', BlockImageTwoCol, { extends: 'div' })
