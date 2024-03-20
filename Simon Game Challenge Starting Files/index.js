let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let game = true

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    $("#" + name).fadeOut(100).fadeIn(100)
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');
    }, 50);
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
}

function playSequence() {
    for (let i = 0; i < gamePattern.length; i++){
        setTimeout(function() {
            playSound(gamePattern[i])
          }, 500 + (500 * i));
    }
    setTimeout(function() {
        nextSequence()
      }, 500 + (500 * gamePattern.length));
}

function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length -1] === gamePattern[userClickedPattern.length -1]) {
        game = true
    } else {
        game = false
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }
}

$(".btn").on("click", function() {
    let userChosenColour = this.id;
    playSound(this.id);
    animatePress(this.id);
    userClickedPattern.push(userChosenColour);
    if (game){
        checkAnswer()
    }
})


setInterval(function () {
    if (level === 0){
        $(document).on("keypress", function(){
            if (level === 0){    
                game = true;
                $("#level-title").text("Level " + level);
                nextSequence();
            }
        })
    } else {
        setInterval(function () {
            if (userClickedPattern.length === gamePattern.length && game) {
                $("#level-title").text("Level " + level);
                userClickedPattern = []
                playSequence()
            }
        }, 600);
    }
}, 1000);

