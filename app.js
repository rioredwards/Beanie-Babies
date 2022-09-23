/* Imports */

import { getAstroSigns, getBeanies } from './fetch-utils.js';
import { renderAstroSignOption, renderBeanieBaby } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const beaniesList = document.getElementById('beanie-babies-list');
const astroSelect = document.getElementById('astro-sign-select');
const searchForm = document.getElementById('search-form');
const modal = document.getElementById('modal');

/* State */
let beanies = [];
let astroSigns = [];
let error = null;
let count = 0;
let focusCard = null;

let filter = {
    name: '',
    astroSign: '',
};

let paging = {
    page: 1,
    pageSize: 25,
};

/* Events */
window.addEventListener('load', async () => {
    // findBeanies();
    const response = await getAstroSigns();
    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            console.log(entry.target);
            findMoreBeanies();
        }
    }
});

async function findMoreBeanies() {
    paging.page++;
    const response = await getBeanies(filter, paging);
    console.log(response);
    error = response.error;
    const moreBeanies = response.data;
    beanies = beanies.concat(moreBeanies);
    displayMoreBeanies(moreBeanies);
    displayNotifications();
}

async function findBeanies() {
    const response = await getBeanies(filter, paging);

    error = response.error;
    beanies = response.data;
    count = response.count;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);

    filter.name = formData.get('name');
    filter.astroSign = formData.get('astroSign');

    // new search: reset page to 1
    paging.page = 1;
    findBeanies();
});

function cardFocus() {
    this.classList.add('focus', 'not-clickable');
    modal.classList.remove('hidden', 'not-clickable');
    focusCard = this;
    modal.addEventListener('click', cardUnFocus);
}

function cardUnFocus() {
    focusCard.classList.remove('focus', 'not-clickable');
    modal.classList.add('hidden', 'not-clickable');
    focusCard = null;
}

/* Display Functions */
function displayBeanies() {
    beaniesList.innerHTML = '';
    displayMoreBeanies(beanies);
}

function displayMoreBeanies(beanies) {
    let lastEl = null;
    for (const beanieBaby of beanies) {
        const beanieBabyEl = renderBeanieBaby(beanieBaby);
        beaniesList.append(beanieBabyEl);
        beanieBabyEl.addEventListener('click', cardFocus);
        lastEl = beanieBabyEl;
    }
    console.log(lastEl);
    observer.observe(lastEl);
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${beanies.length} of ${count} found beanies`;
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        astroSelect.append(option);
    }
}
