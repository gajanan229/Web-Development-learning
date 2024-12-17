
$("h1").addClass("big-title margin-50");

$("h1").text("bye");

$("button").html("<em>click me</em>");

$("a").attr("href", "https://www.yahoo.com");

$("h1").click(function(){
    $("h1").removeClass("big-title margin-50");
});

$("button").click(function() {
    $("h1").css("color", "purple")
});

$("input").keypress(function(event) {
    $("h1").text(event.key)
});

$("h1").on("mouseover", function() {
    $("h1").css("color", "green")
})