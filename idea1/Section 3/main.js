import { createElementsFromSentence, resetSentence } from './elements.js';
import { addEventListeners, handicapFreebie } from './events.js';
import { initializeModal } from './modal.js';

const sentence = "travellers have arrived at grand cathedral completing their pilgrimage";

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
    initializeModal();
    handicapFreebie();

    // Initially disable the submit button
    const submitButton = document.querySelector('.SubmitButton');
    submitButton.disabled = true;
});

export { sentence };
