const sentence = "Huge juicy balls"; // Replace with your actual sentence

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

// Function to add event listeners to textareas
function addEventListeners() {
    const textareas = Array.from(document.querySelectorAll('.letter-textarea'));
    textareas.forEach((textarea, index) => {
        // Event listener for input
        textarea.addEventListener('input', function(event) {
            if (textarea.value.length > 1) {
                textarea.value = textarea.value.charAt(0);
            }
            if (textarea.value.length === 1 && index < textareas.length - 1) {
                textareas[index + 1].focus();
            }
        });

        // Event listener for keydown
        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace' && textarea.value.length === 0 && index > 0) {
                textareas[index - 1].focus();
            }
        });
    });
}

// Call the function to create elements and add event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    createElementsFromSentence(sentence);
    addEventListeners();
});

// JavaScript to restrict input -- doesn't work tho
const textarea = document.getElementById('single-letter-textarea');

textarea.addEventListener('input', function(event) {
            // Remove any non-alphanumeric characters
    const cleanValue = this.value.replace(/[^a-zA-Z0-9]/g, '');
    if (this.value !== cleanValue) {
        this.value = cleanValue;
    }
});