window.checkOrientation = function () {
    const orientationMessage = document.getElementById('orientation-message');
    if (window.innerHeight > window.innerWidth) {
        // Show the message when in portrait mode
        orientationMessage.style.display = "block";
    } else {
        // Hide the message when in landscape mode
        orientationMessage.style.display = "none";
    }
}

window.addResizeListener = function () {
    window.addEventListener('resize', function () {
        window.checkOrientation();
    });
}
