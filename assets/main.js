import './scripts/publicPath'
import 'console-polyfill'
// import 'normalize.css/normalize.css'
import './main.scss'
import $ from 'jquery'
import feather from 'feather-icons'

import installCE from 'document-register-element/pony'

window.jQuery = $

window.lazySizesConfig = window.lazySizesConfig || {}
window.lazySizesConfig.preloadAfterLoad = true
require('lazysizes')

$(document).ready(function () {
  feather.replace({
    'stroke-width': 1
  })
})

installCE(window, {
  type: 'force',
  noBuiltIn: true
})

// TODO: Find a better place to keep this code
$(function () {
  const wMin = 360
  const wMax = 2500
  const wDiff = wMax - wMin
  const docRoot = document.querySelector(':root')
  const typographySizeProp = '--window-size-anim-delay'

  const typographySizing = function () {
    const w = window.innerWidth
    let ratio = (w - wMin) / wDiff
    if (ratio <= 0) {
      ratio = 0
    } else if (ratio > 1) {
      ratio = 1
    }
    ratio *= -1
    docRoot.style.setProperty(typographySizeProp, ratio + 's')
  }

  typographySizing()
  window.addEventListener('resize', typographySizing)
})

function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('../Components/', true, /\/script\.js$/))
