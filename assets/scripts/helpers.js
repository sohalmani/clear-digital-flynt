import $ from 'jquery'
import 'intersection-observer'

$(function () {
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
