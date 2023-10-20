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
    // this.triggerMenu = this.triggerMenu.bind(this)
    // this.triggerMegaMenu = this.triggerMegaMenu.bind(this)
    this.handleHeaderScroll = this.handleHeaderScroll.bind(this)
  }

  bindEvents () {
    // this.$.on('click', '[data-toggle-menu]', this.triggerMenu)
    // this.$.on('click', this.$navLink , this.triggerMegaMenu)
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
    $(e.target).toggleClass('active')
    this.$nav.slideToggle()
    this.$menuButton.attr('aria-expanded', this.$menuButton.attr('aria-expanded') === 'false' ? 'true' : 'false')
  }

  triggerMegaMenu (e) {
    this.$menu.removeClass('.nav-link--active')
    $(e.target).toggleClass('nav-link--active')
    $(e.target).find(this.$menu).slideToggle()
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

// TODO: Convert code into ES6 classes base
var $navigation = $('.navigation')

if ($navigation) {
  var $menu = $('.megamenu')
  var $menuButton = $('.hamburger')
  var $nav = $('nav')
  var $navLink = $('.nav-link')

  var initMenu = function () {
    $menuButton.removeClass('active')
    $navLink.removeClass('nav-link--active')
    $nav.removeAttr('style')
    $menu.removeClass('megamenu--open').removeAttr('style')
  }

  var triggerMenu = function (e) {
    $(this).toggleClass('active')
    $nav.slideToggle()
    $menuButton.attr('aria-expanded', $menuButton.attr('aria-expanded') === 'false' ? 'true' : 'false')
  }

  var triggerMegaMenu = function (e) {
    e.stopPropagation()

    if ($(window).width() > 1023) return

    if (!$(this).hasClass('nav-link--active')) {
      $(this).siblings().removeClass('nav-link--active')
      $(this).siblings().find('.megamenu__dropdown').stop(true, true).slideUp()
      $(this).addClass('nav-link--active')
      $(this).find('.megamenu__dropdown').stop(true, true).slideDown()
    } else {
      $navLink.removeClass('nav-link--active')
      $navigation.find('.megamenu__dropdown').removeClass('megamenu--open').stop(true, true).slideUp()
    }
  }

  // var  handleHeaderScroll = function() {
  //   if (window.scrollY > 0) {
  //     header.classList.add('main-navigation-isScrolled')
  //   } else {
  //     header.classList.remove('main-navigation-isScrolled')
  //   }
  // }

  // $(window).on('scroll', handleHeaderScroll)
  $(window).on('orientationchange', initMenu)
  $menuButton.on('click', triggerMenu)
  $navLink.on('click', triggerMegaMenu)
}
