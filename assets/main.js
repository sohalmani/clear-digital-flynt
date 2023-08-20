import './scripts/publicPath'
import 'console-polyfill'
import 'intersection-observer'
import 'normalize.css/normalize.css'
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

  // TODO: This code can be separated in separate file and
  // imported just like 'feather-icons' are imported above
  const markerSelector = '.marker'
  const markerElements = document.querySelectorAll(markerSelector)

  if (markerElements.length) {
    const observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('draw')
        } else {
          entry.target.classList.remove('draw')
        }
      })
    }, {
      rootMargin: '30px 0px 30px 0px',
      threshold: 0.5
    });

    [...markerElements].forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })
  }
})

installCE(window, {
  type: 'force',
  noBuiltIn: true
})

function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('../Components/', true, /\/script\.js$/))
