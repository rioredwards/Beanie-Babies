/* Imports */

import { getBeanieBabies } from './fetch-utuls.js';
import { renderBeanieBaby } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const beanieBabiesList = document.getElementById('beanie-babies-list');

/* State */
let beanieBabies = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    findBeanieBabies();
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
        // > Part A: render and append to list
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
