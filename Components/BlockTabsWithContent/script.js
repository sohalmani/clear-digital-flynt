import $ from 'jquery'

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
    this.$tabTitle = $('.tab-head', this)
    this.$tabBody = $('.tabs-with-content-content .tab-body', this)
    this.$closeButton = $('.tab-closeButton', this)
  }

  bindFunctions () {
  }

  bindEvents () {
    this.$tabTitle.on('click', this.handleTabClick)
    this.$closeButton.on('click', this.handleCloseButton)
  }

  connectedCallback () {
    this.addIdOnInnerMenu(this.$tabTitle, 'data-tab', 'tab-')
    this.addIdOnInnerMenu(this.$tabBody, 'data-tab-body', 'tab-')
  }

  addIdOnInnerMenu (elements, customAttribute, attrTextValue) {
    $(elements).each(function (i) {
      $(this).attr(customAttribute, attrTextValue + (i + 1))
    })
  }

  handleTabClick (e) {
    const tabId = $(this).attr('data-tab')
    const windowWidth = $(window).width()

    if (windowWidth > 767) {
      $(this).closest('.tabs-with-content-items').css('display', 'none')
      $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tabs-with-content-content .tab-body[data-tab-body=' + tabId + ']').css('display', 'block')
    } else {
      if (!$(this).closest('.tab').hasClass('tab-isOpen')) {
        $('.tab').removeClass('tab-isOpen')
        $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tab-body').stop(true, true).slideUp()
        $(this).closest('.tab').addClass('tab-isOpen')
        $(this).closest('.tab').find('.tab-body').stop(true, true).slideDown()
      } else {
        $('.tab').removeClass('tab-isOpen')
        $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tab-body').stop(true, true).slideUp()
      }
    }
  }

  handleCloseButton (e) {
    $(this).closest('.tab-body').css('display', 'none')
    $(this).closest('[is="flynt-block-tabs-with-content"]').find('.tabs-with-content-items').css('display', 'block')
  }
}

window.customElements.define('flynt-block-tabs-with-content', TabsWithContent, { extends: 'div' })
