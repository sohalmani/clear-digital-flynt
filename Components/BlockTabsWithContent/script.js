import $ from 'jquery'

$(function () {
  var $tabsWithContent = $('.tabs-with-content')
  if ($tabsWithContent) {
    var $tabTitle = $tabsWithContent.find('.tab__head')
    var $tabBody = $tabsWithContent.find('.tabs-with-content__content .tab__body')
    var $tabsItemsWrapper = $('.tabs-with-content__items')
    var $closeButton = $tabsWithContent.find('.close-btn')
    var addIdOnInnerMenu = function (elements, customAttribute, attrTextValue) {
      $(elements).each(function (i) {
        $(this).attr(customAttribute, attrTextValue + (i + 1))
      })
    }
    var initTabs = function () {
      $('.tab').removeClass('tab--open')
      $tabsWithContent.find('.tab__body').removeAttr('style')
      $tabsItemsWrapper.removeAttr('style')
    }
    var handleTabClick = function (e) {
      var tabId = $(this).attr('data-tab')
      var windowWidth = $(window).width()

      if (windowWidth > 767) {
        $(this).closest('.tabs-with-content__items').css({ display: 'none' })
        $(this).closest('.tabs-with-content').find('.tabs-with-content__content .tab__body[data-tab-body=' + tabId + ']').css({ display: 'block' })
      } else {
        if (!$(this).closest('.tab').hasClass('tab--open')) {
          $('.tab').removeClass('tab--open')
          $tabsWithContent.find('.tab__body').stop(true, true).slideUp()
          $(this).closest('.tab').addClass('tab--open')
          $(this).closest('.tab').find('.tab__body').stop(true, true).slideDown()
        } else {
          $('.tab').removeClass('tab--open')
          $tabsWithContent.find('.tab__body').stop(true, true).slideUp()
        }
      }
    }
    var handleCloseButton = function (e) {
      $(this).closest('.tab__body').css({ display: 'none' })
      $(this).closest('.tabs-with-content').find('.tabs-with-content__items').css({ display: 'block' })
    }
    addIdOnInnerMenu($tabTitle, 'data-tab', 'tab-')
    addIdOnInnerMenu($tabBody, 'data-tab-body', 'tab-')
    $tabTitle.on('click', handleTabClick)
    $closeButton.on('click', handleCloseButton)
    $(window).on('resize', initTabs)
  }
})
