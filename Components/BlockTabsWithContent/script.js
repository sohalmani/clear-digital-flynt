import $ from 'jquery'

// TODO: Convert code into ES6 classes base
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

  bindFunctions () {
  }

  bindEvents () {
  }

  connectedCallback () {
  }
}

window.customElements.define('flynt-block-tabs-with-content', TabsWithContent, { extends: 'div' })
