if (window.performance.navigation.type === 1) {    
    let p1 = Math.floor(Math.random() * 6) + 1;
    let p2 = Math.floor(Math.random() * 6) + 1;
    console.log(p1)

    let p1String = "images/dice" + p1 + ".png";
    let p2String = "images/dice" + p2 + ".png";

    let win
    if (p1 > p2){
        win = "🚩Player 1 Wins!"
    }
    if (p1 < p2){
        win = "Player 2 Wins!🚩"
    }
    if (p1 === p2){
        win = "Draw!"
    }

    document.querySelector(".img1").setAttribute("src", p1String);
    document.querySelector(".img2").setAttribute("src", p2String);
    document.querySelector("h1").innerHTML = win;
}
