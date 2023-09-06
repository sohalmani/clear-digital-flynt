import $ from 'jquery'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import getVideoId from 'get-video-id'

class ModalVideoOembed extends window.HTMLDivElement {
  constructor (...args) {
    const self = super(...args)
    self.init()
    return self
  }

  init () {
    this.$ = $(this)
    this.resolveElements()
    this.bindFunctions()
    this.bindEvents()
  }

  resolveElements () {
    this.$videoButton = $('.video--playInModal')
    this.$videoPlayer = $('.video-player', this)
    this.$iframe = $('iframe', this)
    this.$closeButton = $('[data-close]', this)
  }

  bindFunctions () {
    this.openModal = this.openModal.bind(this)
    this.loadVideo = this.loadVideo.bind(this)
    this.videoIsLoaded = this.videoIsLoaded.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeModalOnEscapeKeydown = this.closeModalOnEscapeKeydown.bind(this)
  }

  bindEvents () {
    this.$videoButton.on('click', this.openModal)
    this.$videoPlayer.on('click', this.stopEventPropagation)
    this.$.on('click', this.closeModal)
    $(document).on('keydown', this.closeModalOnEscapeKeydown)
  }

  openModal (e) {
    e.preventDefault()
    this.$.addClass('modalVideoOembed--isVisible')
    disableBodyScroll(this.$.get(0))
    this.loadVideo()
  }

  closeModal (e) {
    enableBodyScroll(this.$.get(0))
    this.$.removeClass('modalVideoOembed--isVisible')
    this.$iframe.attr('src', '')
  }

  closeModalOnEscapeKeydown (e) {
    if (e.key === 'Escape') {
      this.closeModal()
    }
  }

  stopEventPropagation (e) {
    e.stopPropagation()
  }

  loadVideo () {
    this.$iframe.one('load', this.videoIsLoaded.bind(this))
    this.$iframe.attr('src', this.createIframeEmbedSrc(this.$videoButton.attr('href')))
    this.$videoPlayer.addClass('video-player--isLoading')
  }

  videoIsLoaded () {
    this.$videoPlayer.removeClass('video-player--isLoading')
    this.$videoPlayer.addClass('video-player--isLoaded')
  }

  createIframeEmbedSrc (videoSrc) {
    return `https://www.youtube-nocookie.com/embed/${getVideoId(videoSrc).id}?feature=oembed&autoplay=true`
  }
}

window.customElements.define('flynt-modal-video-oembed', ModalVideoOembed, { extends: 'div' })
