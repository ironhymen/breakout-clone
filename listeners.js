function addListeners(inputStates, canvas) {
    console.log("addListeners");
    var mouseMovementTimeout;
    // add the listener to the main window object and update the states0
    // add the listener to the main window object and update the states

        canvas.addEventListener('touchmove', function (evt) {
    inputStates.touchPos = getTouchPos(evt, canvas);
}, false);

function getTouchPos(evt, canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.touches[0].clientX - rect.left,
        y: evt.touches[0].clientY - rect.top
    };
}
        window.addEventListener('keydown', function (event) {
            if (event.keyCode === 37) {
                inputStates.key_left = true;
            } else if (event.keyCode === 38) {
                inputStates.up = true;
            } else if (event.keyCode === 39) {
                inputStates.key_right = true;
            } else if (event.keyCode === 40) {
                inputStates.down = true;
            } else if (event.keyCode === 32) {
                inputStates.key_space = true;
            } else if (event.keyCode === 16) {
                inputStates.key_shift = true;
            }
        }, false);

        window.addEventListener('keyup', function (event) {
            if (event.keyCode === 37) {
                inputStates.key_left = false;
            } else if (event.keyCode === 38) {
                inputStates.up = false;
            } else if (event.keyCode === 39) {
                inputStates.key_right = false;
            } else if (event.keyCode === 40) {
                inputStates.down = false;
            } else if (event.keyCode === 32) {
                inputStates.key_space = false;
            } else if (event.keyCode === 16) {
                inputStates.key_shift = false; 
            }
        });

        // Mouse event listeners
        canvas.addEventListener('mousemove', function (evt) {
            inputStates.mousePos = getMousePos(evt, canvas);
            // If isMouseUsed is false, set it to true and start the timeout
            if (!inputStates.isMouseUsed) {
                inputStates.isMouseUsed = true;
                startMouseMovementTimeout();
            } else {
                // If isMouseUsed is true, reset the timeout
                resetMouseMovementTimeout();
            }
        }, false);
        function startMouseMovementTimeout() {
            mouseMovementTimeout = setTimeout(function() {
                inputStates.isMouseUsed = false;
            }, 500);
        }

        function resetMouseMovementTimeout() {
            clearTimeout(mouseMovementTimeout);
            startMouseMovementTimeout();
        }

        canvas.addEventListener('mousedown', function (evt) {
                inputStates.mousedown = true;
                inputStates.mouseButton = evt.button;
        }, false);

        canvas.addEventListener('mouseup', function (evt) {
            inputStates.mousedown = false;
        }, false);
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 37) {
            event.preventDefault();
            inputStates.key_left = true;
        } else if (event.keyCode === 38) {
            event.preventDefault();
            inputStates.up = true;
        } else if (event.keyCode === 39) {
            event.preventDefault();
            inputStates.key_right = true;
        } else if (event.keyCode === 40) {
            event.preventDefault();
            inputStates.down = true;
        } else if (event.keyCode === 32) {
            event.preventDefault();
            inputStates.key_space = true;
        } else if (event.keyCode === 16) {
            event.preventDefault();
            inputStates.key_shift = true;
        }
    }, false);

    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 37) {
            inputStates.key_left = false;
        } else if (event.keyCode === 38) {
            inputStates.up = false;
        } else if (event.keyCode === 39) {
            inputStates.key_right = false;
        } else if (event.keyCode === 40) {
            inputStates.down = false;
        } else if (event.keyCode === 32) {
            inputStates.key_space = false;
        } else if (event.keyCode === 16) {
            inputStates.key_shift = false;
        }
    });




    
    canvas.addEventListener('mousemove', function (evt) {
        inputStates.mousePos = getMousePos(evt, canvas);
        // If isMouseUsed is false, set it to true and start the timeout
        if (!inputStates.isMouseUsed) {
            inputStates.isMouseUsed = true;
            startMouseMovementTimeout();
        } else {
            // If isMouseUsed is true, reset the timeout
            resetMouseMovementTimeout();
        }
    }, false);
    function startMouseMovementTimeout() {
        mouseMovementTimeout = setTimeout(function () {
            inputStates.isMouseUsed = false;
        }, 500);
    }

    function resetMouseMovementTimeout() {
        clearTimeout(mouseMovementTimeout);
        startMouseMovementTimeout();
    }

    canvas.addEventListener('mousedown', function (evt) {
        inputStates.mousedown = true;
        inputStates.mouseButton = evt.button;
        
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
        inputStates.mousedown = false;
    }, false);

    
}


// Mouse event listeners
    function getMousePos(evt, canvas) {        
        // necessary to take into account CSS boudaries

        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
