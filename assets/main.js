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

// TODO: Find a better place to keep this code
$(function () {
  $('body').prepend('<div class="cursor" data-circle-expand="false" data-icon=""><div class="cursorCircle"></div><div class="cursorIcon"></div></div>')
  const cursor = document.querySelector('.cursor')

  if (cursor) {
    let cursorX = -100
    let cursorY = -100
    let hoveredElementsExpand = []
    let iconElementsExpand = []

    const cursorSizeOffset = 0.5 * cursor.clientWidth

    const initializeCursor = function () {
      document.addEventListener('mousemove', (event) => {
        cursorX = event.clientX - cursorSizeOffset
        cursorY = event.clientY - cursorSizeOffset
      })

      document.documentElement.addEventListener('mousedown', () => {
        cursor.classList.add('click')
      })

      document.documentElement.addEventListener('mouseup', () => {
        cursor.classList.remove('click')
      })

      document.documentElement.addEventListener('mouseleave', () => {
        cursor.classList.add('hidden')
      })

      document.documentElement.addEventListener('mouseenter', () => {
        cursor.classList.remove('hidden')
      })

      const moveCursor = function () {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
        hoveredElementsExpand = document.querySelectorAll(
          '[data-cursor-expand]:hover'
        )
        iconElementsExpand = document.querySelectorAll(
          '[data-cursor-icon]:hover'
        )
        cursor.dataset.circleExpand =
          hoveredElementsExpand.length > 0 ? 'true' : 'false'
        cursor.dataset.icon =
          iconElementsExpand.length > 0
            ? iconElementsExpand[0].dataset.cursorIcon
            : ''

        window.requestAnimationFrame(moveCursor)
      }

      window.requestAnimationFrame(moveCursor)
    }

    initializeCursor()
  }
})

function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('../Components/', true, /\/script\.js$/))
