import $ from 'jquery'

class HeroImageCta extends window.HTMLDivElement {
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
  }

  bindFunctions () {
  }

  bindEvents () {
  }

  connectedCallback () {
  }
}

window.customElements.define('flynt-hero-image-cta', HeroImageCta, { extends: 'div' })

$(function () {
  var $videoOverlay = $('.video-overlay')

  function setVideoBoxDimesnions () {
    if ($('.video-overlay .video-overlay__item').length) {
      var videoBoxWidth = $('.container').width()
      var videoBoxHeight = (videoBoxWidth / 16) * 9

      if ((videoBoxHeight + 100) > $(window).height()) {
        videoBoxHeight = $('.video-overlay').height()
        videoBoxWidth = (videoBoxHeight / 9) * 16
      }

      $('.video-overlay .video-overlay__item').css({
        width: videoBoxWidth + 'px',
        height: videoBoxHeight + 'px'
      })
      var windowWidth = $(window).width()
      if (windowWidth >= 1200) {
        if ($(window).height() >= 776) {
          $('.video-overlay .video-overlay__item').css({ height: '620px' })
        }
      }
    }
  }

  if ($videoOverlay.length) {
    var btnClass = '.video-play'

    $(document).on('click', btnClass, function (e) {
      e.preventDefault()

      var videoSrc = $(this).attr('href')
      var videoId
      var ampersandPosition
      if (videoSrc.indexOf('watch') > 0) {
        videoId = videoSrc.split('v=')[1]
        ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition)
        }
        videoSrc = 'https://youtube.com/embed/' + videoId
      } else if (videoSrc.indexOf('youtu.be') > 0) {
        videoId = videoSrc.split('e/')[1]
        ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition)
        }
        videoSrc = 'https://youtube.com/embed/' + videoId
      }
      $('.video-overlay iframe').attr('src', videoSrc)
      $('.video-overlay').addClass('video-overlay--open')
    })

    $(document).on('click keydown', function (e) {
      var clickedElement = e.target
      if ($(clickedElement).hasClass('video-overlay') || $(clickedElement).hasClass('close-button') || $(clickedElement).hasClass('video-overlay__item') || $(clickedElement).hasClass('container')) {
        $('.video-overlay').removeClass('video-overlay--open')
        $('.video-overlay iframe').attr('src', '')
      } else if (e.key === 'Escape') {
        $('.video-overlay').removeClass('video-overlay--open')
        $('.video-overlay iframe').attr('src', '')
      }
    })

    $(window).on('load resize', setVideoBoxDimesnions)
  }
})
