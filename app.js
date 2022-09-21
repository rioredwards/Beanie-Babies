/* Imports */

import { getAstroSigns, getBeanieBabies } from './fetch-utils.js';
import { renderAstroSignOption, renderBeanieBaby } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const beanieBabiesList = document.getElementById('beanie-babies-list');
const astroSelect = document.getElementById('astro-sign-select');

/* State */
let beanieBabies = [];
let astroSigns = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    findBeanieBabies();
    const response = await getAstroSigns();
    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

async function findBeanieBabies() {
    const response = await getBeanieBabies();

    error = response.error;
    beanieBabies = response.data;

    displayNotifications();
    if (!error) {
        displayBeanieBabies();
    }
}

/* Display Functions */
function displayBeanieBabies() {
    beanieBabiesList.innerHTML = '';

    for (const beanieBaby of beanieBabies) {
        const beanieBabyEl = renderBeanieBaby(beanieBaby);
        beanieBabiesList.append(beanieBabyEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        astroSelect.append(option);
    }
}
