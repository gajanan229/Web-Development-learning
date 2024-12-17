//generate random number 1-6
var player1 = Math.floor(Math.random() * 6) + 1;
var player2 = Math.floor(Math.random() * 6) + 1;

//change dice image to match random number 
var p1Img = "images/dice" + player1 + ".png";
var p2Img = "images/dice" + player2 + ".png";
console.log(p1Img);
document.querySelector(".img1").setAttribute("src", p1Img);
document.querySelector(".img2").setAttribute("src", p2Img);

//check which player wins, change h1 to show it
if (player1 > player2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins!";
}
else if (player1 < player2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!";
}
else {
    document.querySelector("h1").innerHTML = "Tie !";
}
