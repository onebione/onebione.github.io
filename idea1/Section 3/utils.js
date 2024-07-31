import { sentence } from './main.js';

export function focusNextTextarea(wordIndex, charIndex) {
    let nextCharIndex = parseInt(charIndex) + 1;
    let nextWordIndex = parseInt(wordIndex);

    while (true) {
        const nextTextarea = document.querySelector(`.letter-textarea[data-word-index='${nextWordIndex}'][data-char-index='${nextCharIndex}']`);

        if (nextTextarea) {
            if (!nextTextarea.disabled) {
                nextTextarea.focus();
                return;
            } else {
                nextCharIndex++;
            }
        } else {
            nextWordIndex++;
            nextCharIndex = 0;
        }

        // Break condition if no more textareas are found to avoid infinite loop
        if (!document.querySelector(`.letter-textarea[data-word-index='${nextWordIndex}']`)) {
            break;
        }
    }
}

export function focusPreviousTextarea(wordIndex, charIndex, backspace) {
    const prevCharIndex = parseInt(charIndex) - 1;
    const prevTextarea = document.querySelector(`.letter-textarea[data-word-index='${wordIndex}'][data-char-index='${prevCharIndex}']`);

    if (prevTextarea) {
        if (!prevTextarea.disabled) {
            prevTextarea.focus();
            if (backspace) prevTextarea.value = '';
        } else {
            focusPreviousTextarea(wordIndex, prevCharIndex, backspace);
        }
    } else {
        const prevWordIndex = parseInt(wordIndex) - 1;
        const lastTextareaPrevWord = document.querySelector(`.letter-textarea[data-word-index='${prevWordIndex}']:last-of-type`);

        if (lastTextareaPrevWord && !lastTextareaPrevWord.disabled) {
            lastTextareaPrevWord.focus();
            if (backspace) lastTextareaPrevWord.value = '';
        } else if (lastTextareaPrevWord) {
            focusPreviousTextarea(prevWordIndex, lastTextareaPrevWord.dataset.charIndex, backspace);
        }
    }
}

export function enforceSingleCharacter(event) {
    const textarea = event.target;
    if (textarea.value.length > 1) {
        textarea.value = textarea.value.charAt(0);
    }
}

export function checkAnyWordFilled() {
    const submitButton = document.querySelector('.SubmitButton');
    const wordSpans = Array.from(document.querySelectorAll('.word-span'));

    let anyWordFilled = false;

    wordSpans.forEach(wordSpan => {
        const textareas = Array.from(wordSpan.querySelectorAll('.letter-textarea'));
        const enabledTextareas = textareas.filter(ta => !ta.disabled);
        const allFilled = enabledTextareas.every(ta => ta.value.length === 1);

        if (enabledTextareas.length != 0 && allFilled) {
            anyWordFilled = true;
        }
    });

    submitButton.disabled = !anyWordFilled;
}

export function validateFilledWords() {
    const wordSpans = Array.from(document.querySelectorAll('.word-span'));
    let invalidInputCount = 0;  // Track the number of invalid inputs

    wordSpans.forEach((wordSpan) => {
        const textareas = Array.from(wordSpan.querySelectorAll('.letter-textarea'));
        const enabledTextareas = textareas.filter(ta => !ta.disabled);
        const allFilled = enabledTextareas.every(ta => ta.value.length === 1);

        if (enabledTextareas.length != 0 && allFilled) {
            const wordIndex = wordSpan.dataset.wordIndex;
            const word = sentence.split(' ')[wordIndex];
            
            textareas.forEach((textarea, charIndex) => {
                const userChar = textarea.value;
                const originalChar = word[charIndex];

                if (userChar.toUpperCase() === originalChar.toUpperCase()) {
                    textarea.classList.remove('invalid-input', 'shake');
                    textarea.classList.add('valid-input');
                    textarea.disabled = true;
                } else {
                    textarea.classList.add('invalid-input', 'shake');
                    textarea.classList.remove('valid-input');
                    textarea.addEventListener('animationend', () => {
                        textarea.classList.remove('shake');
                    });
                    invalidInputCount++;  // Increment invalid input count
                }
            });
        }
    });

    if (invalidInputCount > 0) {
        updateLivesCounter(invalidInputCount);
    }
}

function updateLivesCounter(invalidInputCount) {
    const livesCounter = document.getElementById('lives-counter');
    const hearts = Array.from(livesCounter.getElementsByClassName('fas fa-heart'));

    // for (let i = 0; i < invalidInputCount && hearts.length > 0; i++) {
        const heart = hearts.pop();  // Remove a heart from the end
        heart.classList.remove('fa-heart');
        heart.classList.add('fa-heart-broken');
        checkLives()
    }
// }

export function checkLives() {
    const hearts = document.querySelectorAll('#lives-counter .fa-heart');
    if (hearts.length === 0) {
        setTimeout(() => {
            showGOModal();
        }, 500);
    }
}

function showGOModal() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'block';
}