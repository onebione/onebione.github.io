document.getElementById('single-letter-textarea').addEventListener('input', function(event) {
    const textarea = event.target;
    if (textarea.value.length > 1) {
        textarea.value = textarea.value.charAt(0);
    }
});

const numberOfDuplicates = 100;
let sentence = "The cat";

function duplicateTextarea(count) {
    const container = document.getElementById('textarea-container');
    const textarea = document.getElementById('single-letter-textarea');

    for (let i = 0; i < count; i++) {
        const newTextarea = textarea.cloneNode(true);
        newTextarea.id = `single-letter-textarea-${i + 1}`;
        container.appendChild(newTextarea);
    }
}

// Call the function to duplicate the textarea on page load
document.addEventListener('DOMContentLoaded', () => {
    duplicateTextarea(numberOfDuplicates);
});