const BALLOBJ = document.getElementById("ball");
const PLAYERPADDLEOBJ = document.getElementById("player-paddle");
const BOTPADDLEOBJ = document.getElementById("bot-paddle");
const PlAYAREAOBJ = document.getElementById("play-area");
const MARKER = document.getElementById("marker");

var playAreaWidth = PlAYAREAOBJ.clientWidth;
var playAreaHeight = PlAYAREAOBJ.clientHeight;
console.log("playAreaWidth: " + playAreaWidth + " playAreaHeight: " + playAreaHeight )

var playAreaWidthPercent = playAreaWidth / 100;
var playAreaHeightPercent = playAreaHeight / 100;

//current mouse position
var mouseX;

var playerPaddleX = (42 * playAreaWidthPercent); 
PLAYERPADDLEOBJ.style.left = playerPaddleX;

var botPaddleX = (42 * playAreaWidthPercent);
BOTPADDLEOBJ.style.left = botPaddleX;


// 5 still loses sometimes (but really the half of the botPaddleSpeed)
var botPaddleSpeed = 2.5;

var playerPaddleSpeed = 6;

// hypotenuse 
var initSpeed= 3.5;

//initial angle of the ball
var initAngle = Math.floor(Math.random() * -131) - 20 ; 

// change in X and Y of the ball to achieve proper trajectory
var deltaY = Math.sin(Math.PI * initAngle / 180) * initSpeed;
var deltaX = Math.cos(Math.PI * initAngle / 180) * initSpeed;

// curent X and Y postion of the ball 
var ballXPosition = Math.abs(49 * playAreaWidthPercent);
var ballYPosition = Math.abs(70 * playAreaHeightPercent);

// the interval timer that moves the ball
var myIntervalTimer;

var playerPaddleMovementTimer;

// was an arrow key pressed
var pressed = false;

// has the game reset
var gameReset = true;

BALLOBJ.addEventListener("click", startBall);
window.addEventListener("keydown", startMovement);
window.addEventListener("keyup", stopMovement);

        // starts the game and handles player paddel movement 
function startMovement(event){
    if(event.code === "Space" && gameReset == true){
        startBall();
        gameReset = false;
    }

    if (!event.repeat && playerPaddleMovementTimer == 0) {
        if(pressed == true){
            clearInterval(playerPaddleMovementTimer);
        }  
            // Move the playerPaddle right
        if(event.code === "KeyD" || event.code === "ArrowRight" && gameReset == false){
            playerPaddleMovementTimer = setInterval(function(){
                playerPaddleX = playerPaddleX + playerPaddleSpeed;
                PLAYERPADDLEOBJ.style.left = playerPaddleX;
                if (playerPaddleX > (playAreaWidthPercent * 82.5)){clearInterval(playerPaddleMovementTimer);}
            }, 10)
        }
                // Move the playerPaddle left
        if(event.code === "KeyA" || event.code === "ArrowLeft" && gameReset == false){
            playerPaddleMovementTimer = setInterval(function(){
                playerPaddleX = playerPaddleX - playerPaddleSpeed;
                PLAYERPADDLEOBJ.style.left = playerPaddleX;
                if (playerPaddleX < (playAreaWidthPercent * 1.4)){clearInterval(playerPaddleMovementTimer);}
            }, 10)
        }
        pressed = true;
    };
}

function stopMovement(event){
    clearInterval(playerPaddleMovementTimer); 
    playerPaddleMovementTimer = 0; 
    pressed = false;
}

function startBall(){
    PlAYAREAOBJ.style.cursor = "none";
    myIntervalTimer = setInterval(startBallMovement, 10);
};

                                            // ***    bounces the ball   *** 
function bounceTheBall(){
    //when the ball hits the player's paddle
            // top of paddle
    if(ballYPosition <  (7 * playAreaHeightPercent) 
    && ballYPosition > (6 * playAreaHeightPercent)
            // left edge of paddle
    && ballXPosition > (playerPaddleX - (playAreaWidthPercent * 1.5)) 
            // right edge of paddle
    && ballXPosition < playerPaddleX + (playAreaWidthPercent * 17)){
                // left edge boost
        if(ballXPosition < playerPaddleX + (playAreaWidthPercent * 6 && deltaX > - 6)){
            deltaX = deltaX - 1;
        };
                // right edge boost
        if(ballXPosition > playerPaddleX + (playAreaWidthPercent * 9.5) && deltaX < 6){
            deltaX = deltaX + 1;
        };
        deltaY = -deltaY;
    };

    //when the ball hits the bots's paddle
            // top of paddle
    if(ballYPosition <  (89 * playAreaHeightPercent) 
    && ballYPosition > (88 * playAreaHeightPercent)
            // left edge of paddle
    && ballXPosition > (botPaddleX - (playAreaWidthPercent * 1.5)) 
            // right edge of paddle
    && ballXPosition < botPaddleX + (playAreaWidthPercent * 17)){
        deltaY = -deltaY;
    };

    //when ball touches sides
    if(ballXPosition > playAreaWidth - 2 * playAreaWidthPercent 
    || ballXPosition < (0.75 * playAreaWidthPercent)){
        deltaX = -deltaX;
    }

    //when the ball hits the top
    if(ballYPosition > playAreaHeight - 15){
        deltaY = -deltaY;
    } 

    // when the player loses
    if(ballYPosition < 0 ){
        resetTheGame();
    }
}


function startBallMovement(){
    BALLOBJ.style.bottom = ballYPosition;
    BALLOBJ.style.left = ballXPosition;
    ballXPosition = ballXPosition + (deltaX * playAreaWidth/1000);
    ballYPosition = ballYPosition  + (deltaY * playAreaWidth/1000);
    BALLOBJ.style.bottom = ballYPosition;
    BALLOBJ.style.left = ballXPosition;
    ballXPosition = ballXPosition + (deltaX * playAreaWidth/1000);
    ballYPosition = ballYPosition  + (deltaY * playAreaWidth/1000);
            //      sets the test marker's position (just for testing)
            setMarkerPosition(botPaddleX - (playAreaWidthPercent * 1.5), 91 * playAreaHeightPercent)
            console.log("x: " + ballXPosition + "  y: " + ballYPosition + "  playHeight: " 
            + playAreaHeight  + "  playWidth: " + playAreaWidth + "  paddleLocation: " + playerPaddleX 
            + " deltaX: " + deltaX);
    moveBotPaddle();
    bounceTheBall();
};


function resetTheGame(){
    gameReset = true;
        // reset the ball
    ballXPosition = Math.abs(49 * playAreaWidthPercent);
    ballYPosition = Math.abs(70 * playAreaHeightPercent);
    BALLOBJ.style.bottom = ballYPosition;
    BALLOBJ.style.left = ballXPosition;
        // reset the player paddle
    var playerPaddleX = (42 * playAreaWidthPercent); 
    PLAYERPADDLEOBJ.style.left = playerPaddleX;
        // reset the bot paddle
    var botPaddleX = (42 * playAreaWidthPercent);
    BOTPADDLEOBJ.style.left = botPaddleX;
    PlAYAREAOBJ.style.cursor = "auto";
    clearInterval(myIntervalTimer);
}

function moveBotPaddle(){
//doubles the speed
    for(let i = 0; i < 2; i++ ){
        //if the ball is to the right of the paddle
        if(ballXPosition > (botPaddleX + (8 * playAreaWidthPercent))){
            botPaddleX = botPaddleX + botPaddleSpeed;
        };
        //if the ball is to the left of the paddle
        if(ballXPosition < (botPaddleX+ (8 * playAreaWidthPercent))){
            botPaddleX = botPaddleX - botPaddleSpeed;
        };
        BOTPADDLEOBJ.style.left = botPaddleX;
    }
}

  
function setMarkerPosition(x, y){
    MARKER.style.bottom = y;
    MARKER.style.left = x;
}

// make the player paddle move based on buttons
// make the score board
// make the speeds increase
// add mobile paddle functionality
// add a color change 
// add score
// add sound
