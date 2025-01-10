window.MoveShipAlert = function () {
    alert('Move ship alert');
}
window.MoveShip = function (shipId, shipWidth, shipHeight, targetX, targetY, LastX, LastY,TimeToArriveInSec) {
   
    //console.log("MoveShip function called");
    //console.log('ShipId:',shipId, 'Width:', shipWidth, 'Height:', shipHeight);
    //console.log('targetX:', targetX, 'targetY:', targetY, 'LastX:', LastX, 'LastY:', LastY);
    //console.log('TimeToArriveInSec', TimeToArriveInSec);

    var shipGroup = document.getElementById(shipId+'_Group');
    var shipAxis = document.getElementById(shipId+'_Axis');
    var shipFlameEffect = document.getElementById(shipId+'_FlameEffect');

    //check if shipGroup is null, alert the user
    if (shipGroup == null || shipAxis == null || shipFlameEffect == null) {
        alert('MoveShip:Cant find ship ' + shipId);
        return;
    } 

    var clickX = targetX - (shipWidth/2);
    var clickY = targetY - (shipHeight/2);

    var deltaX =  -(LastX - targetX);
    var deltaY = (LastY - targetY);

    var angle = Math.atan2(deltaX ,  deltaY ) * (180 / Math.PI); // Angle in degrees

    // Set the rotation origin to center of the ship
    shipAxis.style.transformOrigin = (shipWidth / 2) + 'px ' + (shipHeight / 2) +'px'; // Correct the center of rotation

    // Set up rotation animation (ship faces the destination)
    var timeToRotate = (TimeToArriveInSec * .2).toFixed(2);// 20% of the total time
    var timeToMove = (TimeToArriveInSec * .8).toFixed(2); // 80% of the total time

    console.log('timeToRotate:', timeToRotate, 'timeToMove:', timeToMove);
    shipGroup.style.transition = 'transform ' + timeToMove +'s ease-in-out'; // Enable smooth transition
    shipAxis.style.transition = 'transform ' + timeToRotate +'s ease-in-out'; // Enable smooth transition
    shipAxis.style.transform = 'rotate(' + angle + 'deg)';

    // Trigger flame animation
    shipFlameEffect.style.transition = 'all ' + TimeToArriveInSec +'s ease-in-out'; // including time to rotate and move
    shipFlameEffect.style.opacity = 1; // Show flame

    // Move the ship to the clicked position after rotating
    // Wait for rotation to finish before translating
    setTimeout(function () { { shipGroup.style.transform = 'translate(' + clickX + 'px, ' + clickY + 'px)'; } }, timeToRotate*1000);  

    // Hide flame after movement
    setTimeout(function () { { shipFlameEffect.style.opacity = 0; } }, TimeToArriveInSec*1000); // Hide flame after 2 seconds
}

window.DockShip = function (shipId, dureation) {
    var shipGroup = document.getElementById(shipId + '_Group');

    //check if shipGroup is null, alert the user
    if (shipGroup == null) alert('cant find ship group ' + shipId);

    shipGroup.style.transition = 'transform ' + dureation + 's ease-in-out'; // Enable smooth transition
    const currentTransform = shipGroup.style.transform;
    shipGroup.style.transform = currentTransform + ' scale(.4)';
}

window.UnDockShip = function (shipId, dureation) {
    var shipGroup = document.getElementById(shipId + '_Group');

    //check if shipGroup is null, alert the user
    if (shipGroup == null) alert('cant find ship group ' + shipId);

    const currentTransform = shipGroup.style.transform;

    // Remove the scale part of the transformation (if it exists)
    // This is a simple approach and works if the scale is always at the end of the transform string
    const transformed = currentTransform.split('scale')[0];

    shipGroup.style.transition = 'transform ' + dureation + 's ease-in-out'; // Enable smooth transition
    // Set the transform back to its original state without the scale
    shipGroup.style.transform = transformed;
}

window.ShowShip = function (shipId, show) {
    var shipGroup = document.getElementById(shipId + '_Group');

    // Check if shipGroup is null, alert the user
    if (shipGroup == null) {
        alert('Can\'t find ship group ' + shipId);
        return;
    }

    if (show) {
        // Show the ship: set opacity to 1 and ensure it's displayed
        shipGroup.style.opacity = 1;
        shipGroup.style.display = 'block'; // Ensure the ship is displayed
    } else {
        // Hide the ship: set opacity to 0 and hide it
        shipGroup.style.opacity = 0;
        shipGroup.style.display = 'none'; // Remove the ship from layout
    }
}

window.getBoundingBox = (elementId) => {
    var element = document.getElementById(elementId);
    return element.getBoundingClientRect();
};
window.getSvgViewBox = (elementId) => {
    var element = document.getElementById(elementId);
    var viewBox = element.getAttribute("viewBox");
    var parts = viewBox.split(' ');

    // Return an object with numeric properties
    return {
        X: parseFloat(parts[0]),
        Y: parseFloat(parts[1]),
        Width: parseFloat(parts[2]),
        Height: parseFloat(parts[3])
    };
};

window.dragDrop = {
    init: function (elementId, dotNetHelper) {
        var element = document.getElementById(elementId);

        element.addEventListener('pointerdown', function (event) {
            event.preventDefault();
            dotNetHelper.invokeMethodAsync('OnPointerDown', event.clientX, event.clientY);
        });

        element.addEventListener('pointermove', function (event) {
            event.preventDefault();
            dotNetHelper.invokeMethodAsync('OnPointerMove', event.clientX, event.clientY);
        });

        element.addEventListener('pointerup', function (event) {
            event.preventDefault();
            dotNetHelper.invokeMethodAsync('OnPointerUp', event.clientX, event.clientY);
        });

        // Optional: If you want to handle pointercancel, in case the pointer is lost (e.g., touch moves offscreen)
        element.addEventListener('pointercancel', function (event) {
            event.preventDefault();
            dotNetHelper.invokeMethodAsync('OnPointerCancel', event.clientX, event.clientY);
        });
    },
}