'use strict'

console.log('Banner.js Content Script Loaded')

const consts = require('./consts.es6')
const utils = require('./utils.es6')
const bannerHTML = require('./bannerTemplate.es6')
const modalHTML = require('./modalTemplate.es6')
const banner = utils.htmlToElement(bannerHTML)
const modal = utils.htmlToElement(modalHTML)

// Banner & Modal Elements
const bannerClose = banner.querySelector('.js-ddgb-close')
const bannerMore = banner.querySelector('.js-ddgb-more')
const modalClose = modal.querySelector('.js-ddgm-close')
const body = document.body

// EVENT HANDLERS
// Banner Close Click
bannerClose.addEventListener('click', (event) => {
    banner.remove()
    body.classList.remove(consts.HAS_MODAL_CLASS)
})

// Banner Learn More Click
bannerMore.addEventListener('click', (event) => {
    body.classList.add(consts.BLUR_CLASS)
    modal.classList.remove(consts.HIDDEN_CLASS)
})

// Modal Close Click
modalClose.addEventListener('click', (event) => {
    body.classList.remove(consts.BLUR_CLASS)
    modal.classList.add(consts.HIDDEN_CLASS)
})

function updateDOM () {
    // DOM INJECTION
    // Insert content and update styles accordingly
    if (utils.isGoogleSerp()) {
        console.log('Google SERP Detected!')
        body.classList.add('is-serp')

        const searchform = document.getElementById('searchform')

        if (searchform) {
            searchform.insertAdjacentElement('afterbegin', banner)
            searchform.classList.add('ddg-searchform')
        } else {
            body.insertAdjacentElement('afterbegin', banner)
            body.classList.add('no-padding')
        }

        // On Google Homepage
    } else {
        console.log('Google Homepage Detected!')

        const viewport = document.getElementById('viewport')
        viewport.classList.add('ddg-viewport')

        body.insertAdjacentElement('afterbegin', banner)
    }

    // Insert Modal
    body.insertAdjacentElement('beforeend', modal)
    body.classList.add(consts.HAS_MODAL_CLASS)
}

// Skip if DDG banner already in DOM
if (!(document.getElementById('ddgb') || document.getElementById('ddgm'))) {
    updateDOM()
} else {
    console.log('DDG Banner already exists')
}
