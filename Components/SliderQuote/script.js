import $ from 'jquery'
import 'core-js/es/number'
import Swiper, { Navigation, A11y, Autoplay, Pagination } from 'swiper/swiper.esm'

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
    this.$container = $('.container', this)
    this.$slider = $('.swiper', this)
  }

  bindFunctions () {
  }

  bindEvents () {
    $(window).on('load', () => {
      this.slider.init()
    })
  }

  connectedCallback () {
    this.initSlider()
  }

  initSlider () {
    const parameters = {
      init: false,
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 100,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      },
      breakpoints: {
        // when window width is >= 1200
        1200: {
          noSwiping: true,
          noSwipingClass: 'swiper-slide'
        }
      }
    }
    this.slider = new Swiper(this.$slider.get(0), parameters)
    this.setSlideButtonWidth()
  }

  setSlideButtonWidth () {
    this.slider.on('init resize', () => {
      this.slider.navigation.nextEl.style.width = `${this.getSlideButtonWidth()}px`
      this.slider.navigation.prevEl.style.width = `${this.getSlideButtonWidth()}px`
    })
  }

  getSlideButtonWidth () {
    const containerOffsetLeft = parseInt(this.$container.offset().left, 10)
    const containerPaddingLeft = parseInt(this.$container.css('padding-left'), 10)

    return containerOffsetLeft + containerPaddingLeft
  }
}

window.customElements.define('flynt-slider-quote', SliderQuote, { extends: 'div' })
