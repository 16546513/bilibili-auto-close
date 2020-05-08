// ==UserScript==
// @name         bilibili自动关弹幕
// @namespace    http://tampermonkey.net/
// @version      0.1
// @match        https://www.bilibili.com/bangumi/*
// @match        https://www.bilibili.com/video/*
// @exclude      https://www.bilibili.com/video/online.html*
// ==/UserScript==

;(function () {
  const selector = '.bilibili-player-video-danmaku-switch .bui-checkbox'
  const gap = 100

  const pushState = history.pushState
  const replaceState = history.replaceState
  history.pushState = function (...args) {
    pushState.apply(history, args)
    close()
  }
  history.replaceState = function (...args) {
    replaceState.apply(history, args)
    close()
  }
  window.addEventListener('popstate', close)

  function onLoad() {
    window.removeEventListener('load', onLoad)
    close()
  }
  window.addEventListener('load', onLoad)

  function close() {
    setTimeout(_close, gap)
  }
  function _close() {
    let checkbox = document.querySelector(selector)
    if (!checkbox) {
      return close()
    }
    if (checkbox.checked) {
      checkbox.click()
    }
  }
})()
