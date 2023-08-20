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
    this.$slide = $('.swiper-slide', this)
    this.$container = $('.container')
    this.$content = $('.image-two-col__content', this)
  }

  bindFunctions () {

  }

  bindEvents () {
    $(window).on('load resize', () => {
      if ($(window).width() < 768) {
        if (this.slider.$el) {
          this.slider.destroy(false)
        }

        this.$content.each((i, el) => {
          $(el).removeAttr('style')
        })
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
      this.$content.each((i, el) => {
        const $el = $(el)

        if ($(window).width() >= 1200) {
          $el.width(this.getContentWidth())

          if ($(el).closest('.swiper-slide').hasClass('swiper-slide-active')) {
            $(el).css('transform', `translateX(${this.getContentLeftPos()}px)`)
          }

          if ($(el).closest('.swiper-slide').hasClass('swiper-slide-next')) {
            $(el).css('transform', `translateX(${this.getContentRightPos()}px)`)
          }
        } else {
          $el.removeAttr('style')
        }
      })
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
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      }
    }
    this.slider = new Swiper(this.$slider.get(0), parameters)
  }
}

window.customElements.define('flynt-slider-quote', SliderQuote, { extends: 'div' })

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

$(function () {
  var $tabsWithContent = $('[is="flynt-block-tabs-with-content"]')
  if ($tabsWithContent) {
    var $tabTitle = $tabsWithContent.find('.tab-head')
    var $tabBody = $tabsWithContent.find('.tabs-with-content-content .tab-body')
    var $closeButton = $tabsWithContent.find('.tab-closeButton')
    var addIdOnInnerMenu = function (elements, customAttribute, attrTextValue) {
      $(elements).each(function (i) {
        $(this).attr(customAttribute, attrTextValue + (i + 1))
      })
    }
    var handleTabClick = function (e) {
      var tabId = $(this).attr('data-tab')
      var windowWidth = $(window).width()

      if (windowWidth > 767) {
        $(this).closest('.tabs-with-content-items').fadeOut()
        $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tabs-with-content-content .tab-body[data-tab-body=' + tabId + ']').fadeIn()
      } else {
        if (!$(this).closest('.tab').hasClass('tab-isOpen')) {
          $('.tab').removeClass('tab-isOpen')
          $tabsWithContent.find('.tab-body').stop(true, true).slideUp()
          $(this).closest('.tab').addClass('tab-isOpen')
          $(this).closest('.tab').find('.tab-body').stop(true, true).slideDown()
        } else {
          $('.tab').removeClass('tab-isOpen')
          $tabsWithContent.find('.tab-body').stop(true, true).slideUp()
        }
      }
    }
    var handleCloseButton = function (e) {
      $(this).closest('.tab-body').fadeOut()
      $(this).closest($tabsWithContent).find('.tabs-with-content-items').fadeIn()
    }
    addIdOnInnerMenu($tabTitle, 'data-tab', 'tab-')
    addIdOnInnerMenu($tabBody, 'data-tab-body', 'tab-')
    $tabTitle.on('click', handleTabClick)
    $closeButton.on('click', handleCloseButton)
  }
})

class TabsWithContent extends window.HTMLDivElement {
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

  bindFunctions () {

  }

  bindEvents () {

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
    this.$tabHead = $('.tab-head', this)
  }
}

window.customElements.define('flyunt-tabs-with-content', TabsWithContent, { extends: 'div' })
