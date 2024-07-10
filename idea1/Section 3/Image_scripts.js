const sentence = "This is sentence";

function createElementsFromSentence(sentence) {
    const container = document.getElementById('textarea-container');
    container.innerHTML = ''; // Clear the container

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
        spaceSpan.innerHTML = '&nbsp;'; // Non-breaking space for visibility
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

            if (event.key === 'Backspace' && textarea.value.length === 0) {
                focusPreviousTextarea(wordIndex, charIndex);
            } else if (textarea.value.length === 1) {
                focusNextTextarea(wordIndex, charIndex);
            }
        });
    });

    const form = document.getElementById('textarea-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
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

function focusPreviousTextarea(wordIndex, charIndex) {
    const prevCharIndex = parseInt(charIndex) - 1;
    const prevTextarea = document.querySelector(`.letter-textarea[data-word-index='${wordIndex}'][data-char-index='${prevCharIndex}']`);
    
    if (prevTextarea) {
        prevTextarea.focus();
    } else {
        const prevWordIndex = parseInt(wordIndex) - 1;
        const lastTextareaPrevWord = document.querySelector(`.letter-textarea[data-word-index='${prevWordIndex}']:last-of-type`);
        
        if (lastTextareaPrevWord) {
            lastTextareaPrevWord.focus();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
});
