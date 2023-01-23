window.onload = function init() {
    // console.log("init");
    var game = new GF();
    game.start();
}


var GF = function () {
  
    // entire game should be in here

    // vars relative to the canvas
    var canvas, ctx, w, h;
    var frameCount = 0;
    var lastTime, fpsContainer, fps;
    var buttonStatusDiv;
    var analogicValueProgressBar;
    var delta, oldTime = 0;
    var gamepad;
  var inputStates = {}; 
    buttonStatusDiv = document.querySelector("#buttonStatus");
   analogicValueProgressBar = document.querySelector("#buttonValue");
   directionDiv = document.querySelector("#direction");
    angleDiv = document.querySelector("#angle");
    let ball = new Ball(300, 400, 10, "FloralWhite");
  let paddle = new Paddle(300, 550, 100, 20, "FloralWhite", "FloralWhite");
  let brickArray = [];
  numberOfBricks = 56;
    // clear the canvas content
  function clearCanvas() {
    ctx.clearRect(0, 0, w, h);
       
    };

    function timer(currentTime) {
        var delta = currentTime - oldTime;
        oldTime = currentTime;
        return delta;
  }
  
  // create bricks
  function createBricks(numberOfBricks) {
    // gradient color pair list
    var colors = [
    { color1: '#ff0000 ', color2: '#8b0000' }, // red
    { color1: '#ffa500 ', color2: '#8b4500' }, // orange
      { color1: '#ffff00 ', color2: '#808000' }, // yellow
    { color1: '#008000', color2: '#006400' }, // green
      { color1: '#0000ff ', color2: '#00008b' }, // blue
      { color1: '#4b0082 ', color2: '#2f0057' }, // indigo
      { color1: '#ee82ee', color2: '#9400d3' }, // violet
      { color1: '#ee82ee', color2: '#9400d3' }, // violet
      { color1: '#4b0082 ', color2: '#2f0057' }, // indigo
      { color1: '#0000ff ', color2: '#00008b' }, // blue
    { color1: '#008000', color2: '#006400' }, // green
      { color1: '#ffff00 ', color2: '#808000' }, // yellow
    { color1: '#ffa500 ', color2: '#8b4500' }, // orange
    { color1: '#ff0000 ', color2: '#8b0000' }, // red
    
];

    var brickWidth = 800/14;  //800 pixels divided by 14 columns
    var brickHeight = 25; // change to desired height between 20-25 pixels
    rows = Math.floor(numberOfBricks/14);
    columns = 14;
    var xOffset = 0;
    var yOffset = 15;
    var startingX = (800/14)/2;
    var startingY = 50;

    for (var i = 0; i < rows; i++) {
      
      for (var j = 0; j < columns; j++) {
          
            var brick = new Brick((brickWidth*j) + startingX, (brickHeight*i) + startingY, brickWidth, brickHeight, colors[i].color1, colors[i].color2)

            brickArray.push(brick);
        }
    }
}
  function drawBricks(brickArray) {
        for (var i = 0; i < brickArray.length; i++) {
            var brick = brickArray[i];
            brick.draw(ctx);
        }
  }
  
  function drawGUI() {
    ctx.save();
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "FloralWhite";
    ctx.fillText("Bricks Left " + brickArray.length, 10, 25);
      ctx.fillText("Time: " + currentLevelTime.toFixed(2), 150, 25);
  }




    // end of drawing functions

    // update loop
    function update(inputStates, delta, w, h,) {
        paddle.update(inputStates, delta, ball);
        ball.update(delta, paddle, brickArray, w, h);
        // update the game state
    }

  function move(delta) {
      ball.move(delta, paddle);
        // move the game objects
    }

  function draw(ctx) {
      drawGUI();
      
        ball.draw(ctx);
      paddle.draw(ctx);
      drawBricks(brickArray);
      
        // draw the game objects
  }
  
  // gamestates
  var gameStates = {
    mainMenu: 0,
    gameRunning: 1,
    gameOver: 2
  };

  var currentGameState = gameStates.gameRunning;
  var currentLevelTime = 0;

  var mainLoop = function (time) {
        setFrameRateInFramesPerSecond(60);
        var newTime = performance.now();
    clearCanvas();
    
    // if no bricks left then game over
    if (brickArray.length == 0) {
      currentGameState = gameStates.gameOver = true;
      var timeEnd = currentLevelTime;
        delta = timer(newTime);
    }

    if (ball.pos.y > h) {
      currentGameState = gameStates.gameOver = true;
      var timeEnd = currentLevelTime;
        delta = timer(newTime);
    }

    switch (currentGameState) {
      case gameStates.gameRunning:
        // Main function called Each frame
        // measure FPS
        measureFPS(newTime);
        delta = timer(newTime);
        currentLevelTime += delta / 1000;
        // Handle Input
        scangamepads();
        checkButtons(gamepad);
        checkAxes(gamepad);
        // Update
        update(inputStates, delta, w, h);
        // Move
        move(delta);
        // clear canvas
        
        // draw objects DONT FORGET TO DRAW THE OBJECTS

        draw(ctx);
        break;
      case gameStates.gameOver:
        
        checkButtons(gamepad);
        checkAxes(gamepad);
        if (brickArray.length == 0 ){
          ctx.fillText("You Win", 300, 300);
        } else {
          ctx.fillText("Game Over", 300, 300);
        }
        ctx.fillText("Time: " + timeEnd.toFixed(2), 300, 350);
        if (inputStates.key_space || inputStates.button9Pressed) {
          if (brickArray.length == 0) {
            numberOfBricks += 14;
            startNewGame();
          }
          else {
            startNewGame();
          }
        } else if (inputStates.mouseButton == 2 || inputStates.mouseButton == 1) {
          if (brickArray.length == 0) {
            numberOfBricks += 14;
            startNewGame();
          }
          else {
            startNewGame();
          }
       }
       break;

    }
        
        



        // end of drawing objects

        // call the animation loop every 1/60th of second
        requestAnimationFrame(mainLoop);
        
  };
  
  function startNewGame() {

    
    brickArray = [];
    createBricks(numberOfBricks);
    ball = new Ball(300, 400, 10, "white");
    paddle = new Paddle(300, 550, 100, 20, "white", "white");
    currentLevelTime = 0;
    ball.velocity = new Vector(0, 0);
    ball.acceleration = new Vector(0, 0);
    ball.lockedToPaddle = true;
    delta = 0;
    currentGameState = gameStates.gameRunning;
    
  }

    //----------------------------------
// gamepad utility code
//----------------------------------
window.addEventListener("gamepadconnected", function(e) {
   // now as a global var
   gamepad = e.gamepad;
   var index = gamepad.index;
   var id = gamepad.id;
   var nbButtons = gamepad.buttons.length;
   var nbAxes = gamepad.axes.length;
   
  //  console.log("Gamepad No " + index +
  //              ", with id " + id + " is connected. It has " +
  //              nbButtons + " buttons and " +
  //              nbAxes + " axes");
});

window.addEventListener("gamepaddisconnected", function(e) {
   var gamepad = e.gamepad;
   var index = gamepad.index;
  //  console.log("Gamepad No " + index + " has been disconnected");
});

// detect axis (joystick states)
function checkAxes(gamepad) {
  if(gamepad === undefined) return;
  if(!gamepad.connected) return;
 
  var axisValueProgressBars = document.querySelectorAll(".axe");
  
    // update progress bar values
    for (var i=0; i<gamepad.axes.length; i++) {
      var progressBar = axisValueProgressBars[i];
      progressBar.innerHTML = i + ": " + gamepad.axes[i].toFixed(4);
      progressBar.setAttribute("value", gamepad.axes[i] + 1);
    }
  
  // Set inputStates.left, right, up, down
  inputStates.left = inputStates.right = inputStates.up = inputStates.down = false;
  
  // all values between [-1 and 1]
  // Horizontal detection
  if(gamepad.axes[0] > 0.5) {
    inputStates.right=true;
    inputStates.left=false;
  } else if(gamepad.axes[0] < -0.5) {
    inputStates.left=true;
    inputStates.right=false;
  } 
 
  // vertical detection
  if(gamepad.axes[1] > 0.5) {
    inputStates.down=true;
    inputStates.up=false;
  } else if(gamepad.axes[1] < -0.5) {
    inputStates.up=true;
    inputStates.down=false;
  } 

  // compute the angle. gamepad.axes[1] is the 
  // sin of the angle (values between [-1, 1]),
  // gamepad.axes[0] is the cos of the angle
  // we display the value in degree as in a regular
  // trigonometric circle, with the x axis to the right
  // and the y axis that goes up
  // The angle = arcTan(sin/cos); We inverse the sign of
  // the sin in order to have the angle in standard
  // x and y axis (y going up)
    inputStates.angle = Math.atan2(-gamepad.axes[1], gamepad.axes[0]);
    inputStates.leftThumb = new Vector(gamepad.axes[0], 0);
  
}
// Detect button states
function checkButtons(gamepad) {
  if(gamepad === undefined) return;
  if (!gamepad.connected) return;  
  //console.log("t");
  var atLeastOneButtonPressed = false;
 for (var i = 0; i < gamepad.buttons.length; i++) {  
   var b = gamepad.buttons[i];
 
   if(b.pressed) {
     atLeastOneButtonPressed = true;
     buttonStatusDiv.innerHTML = 
      "Button " + i + " is pressed<br>";
     if(b.value !== undefined)
      analogicValueProgressBar.value = b.value;
     }
     
     if(i == 6 && b.pressed) {
        inputStates.button6Pressed = true;
    } else if(i == 6 && !b.pressed) {
        inputStates.button6Pressed = false;
     }
     if(i == 0 && b.pressed) {
        inputStates.button0Pressed = true;
     } else if (i == 0 && !b.pressed) {
        inputStates.button0Pressed = false;
   }
   if(i == 9 && b.pressed) {
        inputStates.button9Pressed = true;
     } else if (i == 9 && !b.pressed) {
        inputStates.button9Pressed = false;
    }
 }
  
  if(!atLeastOneButtonPressed) {
    buttonStatusDiv.innerHTML = "";
    analogicValueProgressBar.value = 0;
    }


    
}

function scangamepads() {
  var gamepads = navigator.getGamepads();
  
  for (var i = 0; i < gamepads.length; i++) {
    if(gamepads[i])
        gamepad = gamepads[i]; 
  }
}

    var start = function () {
      initFPSCounter();
      currentLevelTime = 0;
        canvas = document.getElementById('breakout');
        w = canvas.width;
        h = canvas.height;
        ctx = canvas.getContext('2d');
      addListeners(inputStates, canvas);
      createBricks(numberOfBricks);

        


        requestAnimationFrame(mainLoop);
    };

    return {
        start: start
    };
};