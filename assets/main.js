import './scripts/publicPath'
import 'console-polyfill'
import 'intersection-observer'
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

// TODO: Find a better place to keep this code
$(function () {
  const textUnderlineSelector = '.graphic-effect-underline'
  const textCrossoutSelector = '.graphic-effect-crossout'

  const underlineElements = document.querySelectorAll(textUnderlineSelector)
  const crossoutElements = document.querySelectorAll(textCrossoutSelector)

  if (underlineElements.length > 0 || crossoutElements.length > 0) {
    if (underlineElements.length > 0) {
      for (const e of underlineElements) {
        const underlineImage = e.dataset.underlineImage
        if (underlineImage) {
          const img = document.createElement('img')
          img.src = `${window.FlyntData.templateDirectoryUri}/assets/underlines/${underlineImage}.svg`
          console.log(img.src)
          e.appendChild(img)
        }
      }
    }

    if (crossoutElements.length > 0) {
      for (const e of crossoutElements) {
        const crossoutImage = e.dataset.crossoutImage
        if (crossoutImage) {
          const img = document.createElement('img')
          img.src = `${window.FlyntData.templateDirectoryUri}/assets/crossouts/${crossoutImage}.svg`
          e.appendChild(img)
        }
      }
    }

    const options = {
      rootMargin: '30px 0px 30px 0px',
      threshold: 0.5
    }

    const observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('draw')
        } else {
          entry.target.classList.remove('draw')
        }
      })
    }, options);

    [...underlineElements, ...crossoutElements].forEach((i) => {
      if (i) {
        observer.observe(i)
      }
    })
  }
})

function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('../Components/', true, /\/script\.js$/))
