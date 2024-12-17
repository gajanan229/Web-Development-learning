let numDrumBtns = document.querySelectorAll(".drum").length;
let soundList = ["sounds/crash.mp3", "sounds/kick-bass.mp3", "sounds/snare.mp3", "sounds/tom-1.mp3", "sounds/tom-2.mp3", "sounds/tom-3.mp3", "sounds/tom-4.mp3", ];
let keys =  ["w", "a", "s", "d", "j", "k", "l"];

//Detecting button press
for (let i = 0; i < numDrumBtns; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        let sound = new Audio(soundList[i]) ;
        sound.play();
        buttonAnimation(i)
    })
}

//Detecting key press
document.addEventListener("keydown", function (event){
    if (keys.includes(event["key"])) {
        document.querySelector("."+event["key"]).click();
    }
})

function buttonAnimation(i){
    document.querySelectorAll("button")[i].classList.add('pressed');
    setTimeout(function (){
        document.querySelectorAll("button")[i].classList.remove('pressed');
    }, 100)
}