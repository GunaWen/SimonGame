var gameColours = ["red", "blue", "green", "yellow"];
var level = 0;
var randomChosenColour = gameColours[nextSequence()];
var userClickedPattern = []
var gamePattern = [];
var firstPress = false;
var clickNumCheck = 0;

$(".btn").click(function(event) {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  var buttonClicked = event.target.id;
  playSound(buttonClicked);
  animatePress(buttonClicked);
  // console.log(userChosenColour);
  // console.log(gamePattern);
  checkAnswer(userChosenColour, clickNumCheck);
})

// Generate random number from 0 to 3
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level = level + 1;
  randomChosenColour = gameColours[randomNumber];
  //console.log(firstPress);
  $(document).on("keypress", function() {

    // Game shows first colour on initial keyboard press
    if (!firstPress) {
      // Randomize buttons and keep record
      gamePattern.push(randomChosenColour);

      event.preventDefault();
      firstPress = true;
      playSound(gameColours[randomNumber]);
      $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
      $("h1").text("Level " + level);
    }
  })

  if (firstPress) {
    gamePattern.push(randomChosenColour);
    playSound(gameColours[randomNumber]);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    $("h1").text("Level " + level);
  }
  return randomNumber;
}

function playSound(name) {

  switch (name) {
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    default:
      console.log("unidentified button pressed");
  }

}

function animatePress(currentColour) {
  $("." + currentColour)
    .addClass("pressed")
    .delay(100)
    .queue(
      function(next) {
        $(this).removeClass("pressed");
        next();
      }
    )
}

function checkAnswer(currentLevel, numberToCheck) {

  // console.log("User " + currentLevel);
  // console.log("game " + gamePattern[numberToCheck]);

  if (currentLevel == gamePattern[numberToCheck]) {
    $("h1").text("Level " + level);
    clickNumCheck++;

    // console.log(gamePattern);
    // console.log(clickNumCheck)
    // console.log(gamePattern.length)
    // console.log(numberToCheck);
    if (clickNumCheck == gamePattern.length) {
      clickNumCheck = 0;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body")
      .addClass("game-over")
      .delay(200)
      .queue(
        function(next) {
          $(this).removeClass("game-over");
          next();
        }
      )
    $("h1").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver(){

  //reset
  firstPress = false;
  clickNumCheck = 0;
  userClickedPattern = [];
  gamePattern = [];
  clickNumCheck = 0;
  level = 0;
  randomChosenColour = gameColours[nextSequence()];

}
