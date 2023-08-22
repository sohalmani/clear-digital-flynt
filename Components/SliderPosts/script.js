import $ from 'jquery'
import 'core-js/es/number'
import Swiper, { Navigation, A11y, Autoplay, Pagination } from 'swiper/swiper.esm'
import 'swiper/swiper-bundle.css'

Swiper.use([Navigation, A11y, Autoplay, Pagination])

class SliderPosts extends window.HTMLDivElement {
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
      slidesPerView: 'auto',
      speed: 400,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
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
      this.slider.navigation.nextEl.style.width = `${this.getSlideButtonRightWidth()}px`
      this.slider.navigation.nextEl.style.right = `-${this.getSlideButtonRightPos()}px`
      this.slider.navigation.prevEl.style.width = `${this.getSlideButtonLeftWidth()}px`
    })
  }

  getSlideButtonLeftWidth () {
    const sliderOffsetLeft = parseInt(this.$slider.offset().left, 10) - parseInt(this.$slider.css('padding-left'), 10)
    const sliderParentOffsetLeft = parseInt(this.$slider.parent().offset().left, 10)
    const slidePaddingLeft = parseInt($(this.slider.slides[0]).css('padding-left'), 10) * 2

    return sliderParentOffsetLeft - sliderOffsetLeft + slidePaddingLeft
  }

  getSlideButtonRightWidth () {
    const mainOffsetRight = parseInt($('main').offset().left, 10) + parseInt($('main').outerWidth(), 10)
    const sliderOffsetRight = parseInt(this.$slider.offset().left, 10) + parseInt(this.$slider.outerWidth(), 10)
    const slidePaddingRight = parseInt($(this.slider.slides[0]).css('padding-left'), 10) * 2

    return mainOffsetRight - sliderOffsetRight + slidePaddingRight
  }

  getSlideButtonRightPos () {
    const mainOffsetRight = parseInt($('main').offset().left, 10) + parseInt($('main').outerWidth(), 10)
    const sliderOffsetRight = parseInt(this.$slider.offset().left, 10) + parseInt(this.$slider.outerWidth(), 10)
    const slidePaddingRight = parseInt($(this.slider.slides[0]).css('padding-left'), 10)

    return mainOffsetRight - sliderOffsetRight - slidePaddingRight
  }
}

window.customElements.define('flynt-slider-posts', SliderPosts, { extends: 'div' })
