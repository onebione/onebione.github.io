import { focusNextTextarea, focusPreviousTextarea, validateFilledWords } from './utils.js';
import { resetSentence } from './elements.js';
import { sentence } from './main.js';

export function addEventListeners() {
    const textareas = Array.from(document.querySelectorAll('.letter-textarea'));

    textareas.forEach((textarea) => {
        textarea.addEventListener('keydown', function(event) {
            const wordIndex = textarea.dataset.wordIndex;
            const charIndex = textarea.dataset.charIndex;

            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                return;
            }

            if (event.key === 'Backspace') {
                if (textarea.value.length === 0) {
                    focusPreviousTextarea(wordIndex, charIndex, true);
                } else {
                    textarea.value = '';
                }
                event.preventDefault();
            } else if (textarea.value.length === 1 && event.key !== 'Backspace') {
                textarea.value = event.key; // Replace the character with the new input
                focusNextTextarea(wordIndex, charIndex);
                event.preventDefault();
            }
        });

        textarea.addEventListener('input', function(event) {
            if (textarea.value.length > 1) {
                textarea.value = textarea.value.charAt(textarea.value.length - 1);
            }
            focusNextTextarea(textarea.dataset.wordIndex, textarea.dataset.charIndex);
        });
    });

    const form = document.getElementById('textarea-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateFilledWords();
    });

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        resetSentence();
    });

    const completeButton = document.getElementById('complete-button');
    completeButton.addEventListener('click', () => {
        completeSentence();
    });
}

function completeSentence() {
    const textareas = document.querySelectorAll('.letter-textarea');
    textareas.forEach((textarea) => {
        const wordIndex = textarea.dataset.wordIndex;
        const charIndex = textarea.dataset.charIndex;
        textarea.value = sentence.split(' ')[wordIndex][charIndex];
        textarea.classList.add('valid-input');
        textarea.disabled = true;
    });
}

export function handicapFreebie() {
    const textareas = document.querySelectorAll('.letter-textarea');
    textareas.forEach((textarea) => {
        const wordIndex = textarea.dataset.wordIndex;
        const charIndex = textarea.dataset.charIndex;
        const x = sentence.split(' ')[wordIndex][charIndex];
        const y = x.toUpperCase();
        if ( y == 'E' || y == 'A' || y == 'T' || y == 'V' || y == 'O')
        {
          textarea.value = x;
          textarea.classList.add('valid-input');
          textarea.disabled = true;
        }
    });
}