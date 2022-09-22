/* Imports */

import { getAstroSigns, getBeanieBabies } from './fetch-utils.js';
import { renderAstroSignOption, renderBeanieBaby } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const beanieBabiesList = document.getElementById('beanie-babies-list');
const astroSelect = document.getElementById('astro-sign-select');
const searchForm = document.getElementById('search-form');
const modal = document.getElementById('modal');

/* State */
let beanieBabies = [];
let astroSigns = [];
let error = null;
let count = 0;
let focusCard = null;

/* Events */
window.addEventListener('load', async () => {
    // findBeanieBabies();
    const response = await getAstroSigns();
    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

async function findBeanieBabies(name, astroSign) {
    const response = await getBeanieBabies(name, astroSign);

    error = response.error;
    beanieBabies = response.data;
    count = response.count;

    displayNotifications();
    if (!error) {
        displayBeanieBabies();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);

    const name = formData.get('name');
    const astroSign = formData.get('astroSign');

    findBeanieBabies(name, astroSign);
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
function displayBeanieBabies() {
    beanieBabiesList.innerHTML = '';

    for (const beanieBaby of beanieBabies) {
        const beanieBabyEl = renderBeanieBaby(beanieBaby);
        beanieBabiesList.append(beanieBabyEl);
        beanieBabyEl.addEventListener('click', cardFocus);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${beanieBabies.length} of ${count} found beanies`;
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        astroSelect.append(option);
    }
}
