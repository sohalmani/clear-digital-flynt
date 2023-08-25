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

// TODO: Make Class Based
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
        $(this).closest('.tabs-with-content-items').css('display', 'none')
        $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tabs-with-content-content .tab-body[data-tab-body=' + tabId + ']').css('display', 'block')
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
      $(this).closest('.tab-body').css('display', 'none')
      $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tabs-with-content-items').css('display', 'block')
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
