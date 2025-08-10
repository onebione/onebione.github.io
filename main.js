import { createElementsFromSentence, resetSentence } from './elements.js';
import { addEventListeners, handicapFreebie } from './events.js';
import { initializeModal } from './modal.js';

const sentence = "In the quiet heart of the forest, the Hobbits stood close together, their smiles warm and unguarded, as dappled sunlight danced through the leaves above";

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
