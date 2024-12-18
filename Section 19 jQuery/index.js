$("h1").css("color", "red");

$("h1").addClass("big-title margin-50");

$("h1").text("bye");

$("button").html("<em>don't click me</em>");

$("a").attr("href", "http://www.bing.com");

$("h1").click(function(){
    $("h1").css("color", "purple");
    $("h1").css("font-family", "cursive");
});

$("button").click(function(){
    $("h1").css("color", "red");
});

$("input").keypress(function(event){
    console.log(event.key);
});

$(document).keypress(function(event){
    $("h1").text(event.key);
});

$("h1").on("mouseover", function(){
    $("h1").css("font-family", "Arial");
});

$("a").after("<button>click me</button>");

$("button:first").on("click", function(){
    $("h1").slideToggle();
});