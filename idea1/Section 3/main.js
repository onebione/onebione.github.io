import { createElementsFromSentence, resetSentence } from './elements.js';
import { addEventListeners } from './events.js';
import { initializeModal } from './modal.js';

const sentence = "A Colossal squid emerged from the ocean and wrapped its tentacles around a ship during a storm";

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
    initializeModal();

    // Initially disable the submit button
    const submitButton = document.querySelector('.SubmitButton');
    submitButton.disabled = true;
});

export { sentence };
