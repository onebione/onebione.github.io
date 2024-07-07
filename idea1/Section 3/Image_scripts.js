const sentence = "OOOOOO";

function createElementsFromSentence(sentence) {
    const container = document.getElementById('textarea-container');
    container.innerHTML = ''; // Clear the container

    sentence.split('').forEach((char, index) => {
        if (char === ' ') {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'space';
            spaceSpan.innerHTML = '&nbsp;'; // Non-breaking space for visibility
            container.appendChild(spaceSpan);
        } else {
            const textarea = document.createElement('textarea');
            textarea.className = 'letter-textarea';
            textarea.id = `single-letter-textarea-${index}`;
            container.appendChild(textarea);
        }
    });
}

function addEventListeners() {
    const textareas = Array.from(document.querySelectorAll('.letter-textarea'));
    textareas.forEach((textarea, index) => {
        textarea.addEventListener('input', function() {
            if (textarea.value.length > 1) {
                textarea.value = textarea.value.charAt(0);
            }
            if (textarea.value.length === 1 && index < textareas.length - 1) {
                textareas[index + 1].focus();
            }
        });

        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace' && textarea.value.length === 0 && index > 0) {
                textareas[index - 1].focus();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
});

document.getElementById('textarea-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const textareas = document.querySelectorAll('.letter-textarea');
    let textareaValues = '';
    textareas.forEach((textarea) => {
        textareaValues += textarea.value || ' ';
    });

    if (textareaValues === sentence) {
        alert('Success! The input matches the sentence.');
    } else {
        alert('The input does not match the sentence.');
    }
});