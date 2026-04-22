var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var player1 = new GameObject();
var player2 = new GameObject();  //player 2
var ball = new GameObject();     // ball varible
var keys = {};

//points
var p1Wins = 0;
var p2Wins = 0;




// ball thingy shows 
ball.x = 200;
ball.y = 200;
ball.radius = 10;
ball.color = "magenta";

// ball vecolity?
ball.vx = -6;
ball.vy = 0;



// console.log(document.getElementById("canvas"));

// player line thijngy shows
player1.x = 20;
player1.y = canvas.height / 2 - 50;
player1.width = 10;
player1.height = 100;
player1.color = "magenta";
player1.speed = 6;


//paddle 2
player2.width = 10;
player2.y = canvas.height / 2 - 50;
player2.x = canvas.width - player2.width - 20;
player2.height = 100;
player2.color = "purple";
player2.speed = 6;



// makes sure that when player presses a key, the system knows (dyslexia)
document.addEventListener("keydown", function(e) 
{
    keys[e.key] = true;
});

document.addEventListener("keyup", function(e) 
{
    keys[e.key] = false;
});


setInterval(animate, 1000 / 60);

function animate() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    
    // ball movement 
    ball.x += ball.vx; // keep messing up with putting x instead of v
    ball.y += ball.vy;


    //top bounding
    if (ball.y - ball.radius < 0)
    {
        ball.vy *= -1;
        ball.y = ball.radius;
    }

    //bottom bounding
    if (ball.y + ball.radius > canvas.height)
    {
        ball.vy *= -1;
        ball.y = canvas.height - ball.radius;
    }




    // lose condition || left wall
    if (ball.x - ball.radius < 0 && ball.vx < 0)
    {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx = 6
        ball.vy = 0;

        // the win condition
        p1Wins++;
        console.log("P1 Score:", p1Wins);
    }

    // lose condition || right wall
    if (ball.x + ball.radius > canvas.width && ball.vx > 0)
    {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx = -6; 
        ball.vy = 0;

        // the win condition
        p2Wins++;
        console.log("P2 Score:", p2Wins);
    }





    //keys up and down for player
    if (keys["w"] && player1.y > 0)
    {
        player1.y -= player1.speed;
    }

    if (keys["s"] && player1.y + player1.height < canvas.height)
    {
        player1.y += player1.speed;
    }

    //player bounding
    if (player1.y < 0)
    {
        player1.y = 0;
    }
    
    if (player1.y + player1.height > canvas.height)
    {
        player1.y = canvas.height - player1.height;
    }


    //player 2 bounding
    if (player2.y < 0) 
    {
    player2.y = 0;
    }

    if (player2.y + player2.height > canvas.height) 
    {
        player2.y = canvas.height - player2.height;
    }  



    // player 2 movemnet 
    if (keys["ArrowUp"] && player2.y > 0) 
    {
        player2.y -= player2.speed;
    }

    if (keys["ArrowDown"] && player2.y + player2.height < canvas.height) 
    {
        player2.y += player2.speed;
    }


    // player1 collision + angles
    if (
        ball.x - ball.radius < player1.right() && 
        ball.x > player1.x &&
        ball.y + ball.radius > player1.top() &&
        ball.y - ball.radius < player1.bottom() &&
        ball.vx < 0 
    )
    {
        var third = player1.height / 3;
        var topSection = player1.y + third;
        var bottomSection = player1.y + third * 2;


        if(ball.y < topSection)
        {
            ball.vx = 6;
            ball.vy = -6;
        }

        else if(ball.y < bottomSection)
        {
            ball.vx = 6;
            ball.vy = 0;
        }

        else
        {
            ball.vx = 6;
            ball.vy = 6;
        }

        ball.x = player1.right() + ball.radius;
    }



    // player 2 collision & angles
    if (
        ball.x + ball.radius > player2.left() && 
        ball.x < player2.right() &&
        ball.y + ball.radius > player2.top() &&
        ball.y - ball.radius < player2.bottom() &&
        ball.vx > 0
    )
    {
        var third = player2.height / 3;
        var topSection = player2.y + third;
        var bottomSection = player2.y + third * 2;

        if (ball.y < topSection)
        {
            ball.vx = -6;
            ball.vy = -6;
        }
        else if (ball.y < bottomSection)
        {
            ball.vx = -6;
            ball.vy = 0;
        }
        else
        {
            ball.vx = -6;
            ball.vy = 6;
        }
 
        ball.x = player2.left() - ball.radius;
    }


    // HUD player scores
    context.fillStyle = "black";
    context.textAlign = "center";

    // no joke i just realized i type like this. I thought this was only for html
    context.font = "20px Arial";
    context.fillText("Player 1  |  Player 2", canvas.width / 2, 40);

    context.font = "20px Arial";
    context.fillText(p1Wins + "  -  " + p2Wins, canvas.width / 2, 80);


    player1.drawRect(context);
    player2.drawRect(context);
    ball.drawCircle(context); 
}