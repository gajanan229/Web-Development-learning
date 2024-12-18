var soundfiles = new Map([
    ["w", "sounds/crash.mp3"],
    ["a", "sounds/kick-bass.mp3"],
    ["s", "sounds/snare.mp3"],
    ["d", "sounds/tom-1.mp3"],
    ["j", "sounds/tom-2.mp3"],
    ["k", "sounds/tom-3.mp3"],
    ["l", "sounds/tom-4.mp3"]
]);

const soundAudio = new Map();
soundfiles.forEach((values, keys) => {
    var audio = new Audio(values);
    soundAudio.set(keys, audio);
});

function handleClick(letter) {
    soundAudio.get(letter[0]).play();
    document.querySelector("." + letter[0]).classList.add("pressed");
    setTimeout(function(){
        document.querySelector("." + letter[0]).classList.remove("pressed")
    }, 100)
}

document.querySelectorAll(".drum").forEach(btn => {
    btn.addEventListener("click", function(){handleClick(this.className)});
})

document.addEventListener('keydown', function(event) {
    if (soundfiles.has(event.key)) {
        document.querySelector("." + event.key).click()
    }
    });