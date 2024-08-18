import { createElementsFromSentence, resetSentence } from './elements.js';
import { addEventListeners } from './events.js';
import { initializeModal } from './modal.js';

const sentence = "Deep in the forest a seedling of evil grows";

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
    initializeModal();

    // Initially disable the submit button
    const submitButton = document.querySelector('.SubmitButton');
    submitButton.disabled = true;
});

export { sentence };
