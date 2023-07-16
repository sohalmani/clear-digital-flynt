import $ from 'jquery'
import 'core-js/es/number'
import Swiper, { Navigation, A11y, Autoplay, Pagination } from 'swiper/swiper.esm'
import 'swiper/swiper-bundle.css'

Swiper.use([Navigation, A11y, Autoplay, Pagination])

class SliderQuote extends window.HTMLDivElement {
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
    this.initSlider()
  }

  initSlider () {
    const parameters = {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 100,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      }
    }
    this.slider = new Swiper(this.$slider.get(0), parameters)
  }
}

window.customElements.define('flynt-slider-quote', SliderQuote, { extends: 'div' })
