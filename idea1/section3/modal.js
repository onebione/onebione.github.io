export function initializeModal() {
    const helpmodal = document.getElementById("Help-Page");

    // Get the button that opens the modal
    const btn = document.getElementById("HelpBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("closeBtn")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        helpmodal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        helpmodal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == helpmodal) {
            helpmodal.style.display = "none";
        }
    }
}

const GOmodal = document.getElementById('game-over-modal');
const GOspan = GOmodal.querySelector('.closeBtn');
GOspan.onclick = function() {
    GOmodal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target == GOmodal) {
        GOmodal.style.display = 'none';
    }
};
