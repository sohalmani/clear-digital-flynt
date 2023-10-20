import $ from 'jquery'

class NavigationMain extends window.HTMLElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.bindFunctions()
    this.bindEvents()
    this.resolveElements()
  }

  bindFunctions () {
    this.triggerMenu = this.triggerMenu.bind(this)
    this.triggerMegaMenu = this.triggerMegaMenu.bind(this)
    this.handleHeaderScroll = this.handleHeaderScroll.bind(this)
  }

  bindEvents () {
    this.$.on('click', '[data-toggle-menu]', this.triggerMenu)
    this.$.on('click', '.nav-link', this.triggerMegaMenu)
    $(window).on('scroll', this.handleHeaderScroll)
  }

  resolveElements () {
    this.$menu = $('.megamenu', this)
    this.$navigation = $('.navigation', this)
    this.$menuButton = $('.hamburger', this)
    this.$nav = $('nav', this)
    this.$navLink = $('.nav-link', this)
  }

  connectedCallback () {}

  triggerMenu (e) {
    e.stopPropagation()
    $(e.target).closest('.hamburger').toggleClass('active')
    this.$nav.slideToggle()
    this.$menuButton.attr('aria-expanded', this.$menuButton.attr('aria-expanded') === 'false' ? 'true' : 'false')
  }

  triggerMegaMenu (e) {
    e.stopPropagation()

    if ($(window).width() > 1023) return

    if (!$(e.target).hasClass('nav-link--active')) {
      $(e.target).siblings().removeClass('nav-link--active')
      $(e.target).siblings().find('.megamenu__dropdown').stop(true, true).slideUp()
      $(e.target).addClass('nav-link--active')
      $(e.target).find('.megamenu__dropdown').stop(true, true).slideDown()
    } else {
      this.$navLink.removeClass('nav-link--active')
      $('.megamenu__dropdown').stop(true, true).slideUp()
    }
  }

  handleHeaderScroll () {
    if (window.scrollY > 0) {
      this.classList.add('main-navigation-isScrolled')
    } else {
      this.classList.remove('main-navigation-isScrolled')
    }
  }
}

window.customElements.define('flynt-navigation-main', NavigationMain, {
  extends: 'div'
})
