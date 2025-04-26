//Initialize the canvas
let board
let boardHeight = 720;
let boardWidth = 1080;
let context
let player1Score = 0;
let player2Score = 0;
//Player Attributes
let playerHeight = 150;
let playerWidth = 20;
let playerOffset = 30
let playerVelocityY = 0;
let playerVelocityX = 0;
let ballSpeed = 6;
let paddleSpeed = 10;
//Player and Ball Classes
let player1 = {
    x : playerOffset,
    y : boardHeight/2 - playerHeight/2,
    velocityY : playerVelocityY,
    velocityX : playerVelocityX,
    height : playerHeight,
    width : playerWidth
}
let player2 = {
    x : boardWidth - playerOffset*2,
    y : boardHeight/2 - playerHeight/2,
    velocityY : playerVelocityY,
    velocityX : playerVelocityX,
    height : playerHeight,
    width : playerWidth
}
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    velocityY : ballSpeed*2,
    velocityX : ballSpeed,
    height : 20,
    width : 20
}
//Initialize Board
window.onload = function() {
    
    board = document.getElementById("board"); //Link the HTML canvas to the JS canvas
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") //Set the board to 2D
    context.fillStyle = "white";
    context.fillRect(player1.x, player1.y+player2.velocityY, player1.width, player1.height)
    requestAnimationFrame(update)
    document.addEventListener("keydown", movePlayer);

   
}
//Game Loop
function update(){
    score1 = document.getElementById("score1").innerText = player1Score;
    score2 = document.getElementById("score2").innerHTML = player2Score;
    requestAnimationFrame(update)
    context.clearRect(0,0,board.width, board.height)
    borderDetection();
    context.fillStyle = "white";
    player1.yNext = player1.y + player1.velocityY
    player2.yNext = player2.y + player2.velocityY
    if (borderDetection(player1.yNext)!=true){
        player1.y = player1.yNext;
    }
    if (borderDetection(player2.yNext)!=true){
        player2.y = player2.yNext;
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    //Border Detection
    if (ball.y + ball.height > boardHeight || ball.y < 0){
        ball.velocityY *=-1;
    }
    //Score detection
    if (ball.x > boardWidth - playerOffset){
        player1Score += 1;
        ball.x = boardWidth/2;
        ball.y = boardHeight/2;
        console.log(player1Score, player2Score);
    } else if (ball.x + ball.width < playerOffset){
        player2Score += 1;
        ball.x = boardWidth/2;
        ball.y = boardHeight/2;
        console.log(player1Score, player2Score);
    }
    //Paddle Detection
    if (ball.x + ball.width > player2.x && ball.y + ball.height > player2.y && ball.y < player2.y +player2.height){
        ball.velocityX *=-1;
    } else if (ball.x < player1.x + player1.width && ball.y + ball.height > player1.y && ball.y < player1.y +player1.height){
        ball.velocityX *=-1;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height)
    context.fillRect(player2.x, player2.y, player2.width, player2.height)
    context.fillRect(ball.x, ball.y, ball.height, ball.width);
}

function movePlayer(e){
    if (e.code == "ArrowUp" ){
        player2.velocityY = paddleSpeed *-1
    } else if (e.code == "ArrowDown"){
        player2.velocityY = paddleSpeed
    }
    if (e.code == "KeyW"){
        player1.velocityY = paddleSpeed *-1
    } else if (e.code == "KeyS"){
        player1.velocityY = paddleSpeed
    }
}

function borderDetection(yPosition){
    return (yPosition + playerHeight > boardHeight || yPosition < 0)
}