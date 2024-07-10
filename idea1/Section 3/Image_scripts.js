const sentence = "This is sentence";

function createElementsFromSentence(sentence) {
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
            wordSpan.appendChild(textarea);
        });

        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'space';
        spaceSpan.innerHTML = '&nbsp;';
        container.appendChild(wordSpan);
        container.appendChild(spaceSpan);
    });
}

function addEventListeners() {
    const textareas = Array.from(document.querySelectorAll('.letter-textarea'));
    
    textareas.forEach((textarea) => {
        textarea.addEventListener('keydown', function(event) {
            const wordIndex = textarea.dataset.wordIndex;
            const charIndex = textarea.dataset.charIndex;

            // Prevent spaces and enters
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
                focusNextTextarea(wordIndex, charIndex);
            }
        });
    });

    const form = document.getElementById('textarea-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateSentence();
    });
}

function validateSentence() {
    sentence.split(' ').forEach((word, wordIndex) => {
        const wordSpan = document.querySelector(`.word-span[data-word-index='${wordIndex}']`);
        const textareas = Array.from(wordSpan.querySelectorAll('.letter-textarea'));

        textareas.forEach((textarea, charIndex) => {
            const userChar = textarea.value;
            const originalChar = word[charIndex];

            if (userChar.toUpperCase() === originalChar.toUpperCase()) {
                textarea.classList.remove('invalid-input', 'shake');
                textarea.classList.add('valid-input');
                textarea.disabled = true; // Disable valid input
            } else {
                textarea.classList.add('invalid-input', 'shake');
                textarea.classList.remove('valid-input');
                textarea.addEventListener('animationend', () => {
                    textarea.classList.remove('shake');
                });
            }
        });
    });
}

function focusNextTextarea(wordIndex, charIndex) {
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

function focusPreviousTextarea(wordIndex, charIndex, backspace) {
    const prevCharIndex = parseInt(charIndex) - 1;
    const prevTextarea = document.querySelector(`.letter-textarea[data-word-index='${wordIndex}'][data-char-index='${prevCharIndex}']`);
    
    if (prevTextarea) {
        if (!prevTextarea.disabled) {
            prevTextarea.focus();
            if (backspace) prevTextarea.value = '';
        } else {
            focusPreviousTextarea(wordIndex, prevCharIndex, backspace); // Recursively focus previous
        }
    } else {
        const prevWordIndex = parseInt(wordIndex) - 1;
        const lastTextareaPrevWord = document.querySelector(`.letter-textarea[data-word-index='${prevWordIndex}']:last-of-type`);
        
        if (lastTextareaPrevWord && !lastTextareaPrevWord.disabled) {
            lastTextareaPrevWord.focus();
            if (backspace) lastTextareaPrevWord.value = '';
        } else if (lastTextareaPrevWord) {
            focusPreviousTextarea(prevWordIndex, lastTextareaPrevWord.dataset.charIndex, backspace); // Recursively focus previous
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
});
