var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

function addToPattern(){
    let i = Math.floor(Math.random() * 4);
    gamePattern.push(colors[i]);
}

function eleFlash(col){
    let temp = "#" + col;
    $(temp).fadeOut(100).fadeIn(100)
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    addToPattern();
    eleFlash(gamePattern[level-1]);
    playSound(gamePattern[level-1]);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAns(index){
    if (gamePattern[index] === userPattern[index]){
        if (gamePattern.length === userPattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    eleFlash(userChosenColour);
    playSound(userChosenColour);
    checkAns(userPattern.length - 1);
})




