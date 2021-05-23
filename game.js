var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function(){
    if(level == 0)
    {
        nextSequence();
    }
});

$(".btn").click(handler);
function handler(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    var audio = new Audio(userChosenColor+".mp3");
    audio.play();
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var audio = new Audio(randomChosenColor+".mp3");
    $("#"+randomChosenColor).fadeOut(100).fadeIn(function(){audio.play();});
    level++;
    $("#level-title").html("level "+level);
}
 function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
 }

 function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else{
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("#level-title").html("Game over, press any key to start");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            level=0;
            userClickedPattern=[];
            gamePattern = [];
        },200);
    }
 }
