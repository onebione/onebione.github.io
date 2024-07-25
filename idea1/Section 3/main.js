import { createElementsFromSentence, resetSentence } from './elements.js';
import { addEventListeners } from './events.js';
import { initializeModal } from './modal.js';

const sentence = "twin dragons blew fire all over a city";

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
    initializeModal();

    // Initially disable the submit button
    const submitButton = document.querySelector('.SubmitButton');
    submitButton.disabled = true;
});

export { sentence };
