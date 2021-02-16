import './style.scss';
import $ from 'jquery';

// Data
var maxTime = 30;
var time = maxTime - 1;

var lastId = 0;
var randomIndex = 0;

var score = 0;

var colorCharacter = ['Pink', 'Blue', 'Red', 'Green', 'Orange', 'White'];
var audio = new Audio('sounds/among-us-kill-sound.mp3');

// Create elements
// Entete
var entete = '<div class="entete"></div>';
var result = '<h2 class="result"></h2>';
var textScore = `<p>Score : <span id="score">${score}</span></p>`;
var timer = `<p>Time : <span id="timer">${time}</span></p>`;

// Function to generate random index
function generateRandomIndex(list) {
  return Math.round(Math.random() * (list.length - 1));
}

function render() {
  // Add elements to html
  $('main').prepend(entete);
  $('.entete').prepend(textScore);
  $('.entete').append(result);
  $('.entete').append(timer);

  var holes = $('div.hole');
  // Interval of the appearance of characters
  var characterInterval = setInterval(function () {
    $('#timer').text(`${(time -= 1)}`);
    // Img
    var randomColorIndex = generateRandomIndex(colorCharacter);
    var perso = `<img src="perso${colorCharacter[randomColorIndex]}.png" alt="Personnage du jeu Among Us" class="perso"/>`;

    while (randomIndex === lastId) {
      randomIndex = generateRandomIndex(holes);
    }
    lastId = randomIndex;

    $(holes[randomIndex]).html(perso);

    // Disappearing
    setTimeout(function () {
      $(holes[randomIndex]).empty();
    }, 1000 * 2);
  }, 1000);

  // Event
  $('div').on('click', function () {
    var child = $(this).children();

    // Add 1 to score
    if (child.length === 1) {
      audio.fastSeek(0);
      audio.play();
      $('#score').text(`${(score += 1)}`);
      $(this).empty();
    }
  });

  // End of the game
  setTimeout(function () {
    clearInterval(characterInterval);

    if ($('#score').text() === toString(maxTime)) {
      $('.result').text('perfect');
    } else if (Number($('#score').text()) > (maxTime / 2)) {
      $('.result').text('bravo');
    } else {
      $('.result').text('game over');
    }
  }, 1000 * maxTime);
}

render();
