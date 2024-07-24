import { sentence } from './main.js';

export function focusNextTextarea(wordIndex, charIndex) {
    const nextCharIndex = parseInt(charIndex) + 1;
    const nextTextarea = document.querySelector(`.letter-textarea[data-word-index='${wordIndex}'][data-char-index='${nextCharIndex}']`);

    if (nextTextarea) {
        nextTextarea.focus();
    } else {
        const nextWordIndex = parseInt(wordIndex) + 1;
        const firstTextareaNextWord = document.querySelector(`.letter-textarea[data-word-index='${nextWordIndex}'][data-char-index='0']`);

        if (firstTextareaNextWord) {
            firstTextareaNextWord.focus();
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
                }
            });
        }
    });
}
