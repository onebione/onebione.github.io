document.getElementById('single-letter-textarea').addEventListener('input', function(event) {
    const textarea = event.target;
    if (textarea.value.length > 1) {
        textarea.value = textarea.value.charAt(0);
    }
});


