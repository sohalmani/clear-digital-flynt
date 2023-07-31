import $ from 'jquery'
import 'core-js/es/number'
import Swiper, { Navigation, A11y, Autoplay } from 'swiper/swiper.esm'

Swiper.use([Navigation, A11y, Autoplay])

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
    this.$slide = $('.swiper-slide', this)
    this.$container = $('.container')
    this.$content = $('.image-two-col__content', this)
  }

  bindFunctions () {

  }

  bindEvents () {
    $(window).on('load resize', () => {
      if ($(window).width() < 768) {
        this.slider.destroy(false)
      } else {
        this.slider.init()
      }
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
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        // when window width is >= 992
        992: {
          slidesPerView: 2
        },
        // when window width is >= 1200
        1200: {
          noSwiping: true,
          noSwipingClass: 'swiper-slide',
          slidesPerView: 2
        }
      }
    }
    this.slider = new Swiper(this.$slider.get(0), parameters)

    this.alignContent()
    this.setSlideButtonWitdh()
  }

  alignContent () {
    this.slider.on('init resize slideChangeTransitionStart', () => {
      if ($(window).width() >= 1200) {
        this.$content.each((i, el) => {
          this.$el = $(el)
          this.$el.width(this.getContentWidth())

          if ($(el).closest('.swiper-slide').hasClass('swiper-slide-active')) {
            $(el).css('transform', `translateX(${this.getContentLeftPos()}px)`)
          }

          if ($(el).closest('.swiper-slide').hasClass('swiper-slide-next')) {
            $(el).css('transform', `translateX(${this.getContentRightPos()}px)`)
          }
        })
      } else {
        this.$content.removeAttr('style')
      }
    })
  }

  setSlideButtonWitdh () {
    this.slider.on('init resize', () => {
      this.slider.navigation.nextEl.style.width = `${this.getSlideButtonWidth()}px`
      this.slider.navigation.prevEl.style.width = `${this.getSlideButtonWidth()}px`
    })
  }

  getContentWidth () {
    return (this.$container.width() / 2) * 0.833333
  }

  getContentLeftPos () {
    const offsetLeft = parseInt(this.$container.offset().left, 10)
    const paddingLeft = parseInt(this.$container.css('padding-left'), 10)

    return offsetLeft + paddingLeft
  }

  getContentRightPos () {
    const slideWidth = this.$slide.width()

    return slideWidth - (this.getContentWidth() + this.getContentLeftPos())
  }

  getSlideButtonWidth () {
    const containerOffsetLeft = parseInt(this.$container.offset().left, 10)
    const containerPaddingLeft = parseInt(this.$container.css('padding-left'), 10)

    return containerOffsetLeft + containerPaddingLeft
  }
}

window.customElements.define('flynt-block-image-two-col', BlockImageTwoCol, { extends: 'div' })
