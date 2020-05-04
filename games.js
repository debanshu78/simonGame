var buttonColor=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var startResponse=false;
var level=1;
$("#restart").hide();

alert();
var user=prompt("Firstly, the game shows the first colour in the sequence (e.g blue).you have to click on the blue button. Next, the game shows the next colour (e.g red),You have to remember the sequence is blue, red(click the both) and so on and so forth.    ENTER YOUR NAME:");
$("h3").text("Welcome to game "+user);


function nextSequence(level)
{
    $("h3").text("level "+level);
   
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".button").on("click",handler);
function handler()
{
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    if(gamePattern.length===userClickedPattern.length && startResponse)
    {
        level++;
        userClickedPattern=[];
        setTimeout(nextSequence(level),1000);
    }
}
function checkAnswer(i)
{
    if(gamePattern[i]===userClickedPattern[i] && startResponse)
    {
    }
    else
    {
        startResponse=false;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100
        );
        $("#play").show();
        $("#restart").hide();
        var c=level-1;
        $("h3").html("Game Over "+user+" <br>Press to play again......Score:"+c);
        startOver();
    }
}

function startOver()
{
    gamePattern=[];
    userClickedPattern=[];
    startResponse=false;
    level=1;
}


function playSound(colour)
{
    var colorSound=new Audio("sounds/"+colour+".mp3");
    colorSound.play();
}

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        document.querySelector("."+currentColour).classList.remove("pressed");
    },100);
}


$("#play").click(function()
{
    if(!startResponse)
    {
        level=1;
        nextSequence(level);
        startResponse=true;
        $("#play").hide();
        $("#restart").show();  
    }
});
$("#restart").click(function()
{
    startOver();
    $("#play").show();
    $("#restart").hide();
});