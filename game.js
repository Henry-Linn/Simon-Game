var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var counter = 0;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColor = this.getAttribute("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
    if (gamePattern[counter] === userChosenColor){
      counter++;
      if (counter === level){
        counter = 0;
        setTimeout(nextSequence(), 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
});

function nextSequence() {
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed"); }, 100)
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
  counter = 0;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
