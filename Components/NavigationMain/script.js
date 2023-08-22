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
  }

  bindEvents () {
    // this.$.on('click', '[data-toggle-menu]', this.triggerMenu)
    // this.$.on('click', this.$navLink , this.triggerMegaMenu)
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
}

window.customElements.define('flynt-navigation-main', NavigationMain, {
  extends: 'div'
})

// TODO: Convert code into ES6 classes base
var $navigation = $('header .navigation')

if ($navigation) {
  var $menu = $('.megamenu')
  var $menuButton = $('.hamburger')
  var $nav = $('nav')
  var $navLink = $('.nav-link')
  let lastScrollVal

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

  var navTriggerScroll = function () {
    var scrollValue = $(window).scrollTop()

    if (scrollValue > lastScrollVal) {
      $navigation.addClass('navigation--active navigation--hide')
    } else if (scrollValue === 0) {
      $navigation.removeClass('navigation--active')
    } else {
      $navigation.removeClass('navigation--hide')
    }

    lastScrollVal = scrollValue
  }
  $(window).on('scroll', navTriggerScroll)
  $(window).on('orientationchange', initMenu)
  $menuButton.on('click', triggerMenu)
  $navLink.on('click', triggerMegaMenu)
}
