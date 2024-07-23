import { enforceSingleCharacter, checkAnyWordFilled } from './utils.js';
import { addEventListeners } from './events.js';
import { sentence } from './main.js';

export function createElementsFromSentence(sentence) {
    const container = document.getElementById('textarea-container');
    container.innerHTML = '';

    sentence.split(' ').forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-span';
        wordSpan.dataset.wordIndex = wordIndex;

        word.split('').forEach((char, charIndex) => {
            const textarea = document.createElement('textarea');
            textarea.className = 'letter-textarea';
            textarea.dataset.charIndex = charIndex;
            textarea.dataset.wordIndex = wordIndex;
            textarea.maxLength = 1;
            textarea.addEventListener('input', enforceSingleCharacter);
            textarea.addEventListener('input', checkAnyWordFilled);
            textarea.addEventListener('keydown', checkAnyWordFilled);
            wordSpan.appendChild(textarea);
        });

        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'space';
        spaceSpan.innerHTML = '&nbsp;';
        container.appendChild(wordSpan);
        container.appendChild(spaceSpan);
    });
}

export function resetSentence() {
    createElementsFromSentence(sentence);
    addEventListeners();
}
