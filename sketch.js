let default_fontsize = 18;
let max_slots = 30;
let button_reset;
let button_close_cover;
let button_open_cover;
let button_new_clue;
let button_opponent_less;
let button_opponent_more;
var wordlist;


function setup() {

  createCanvas(800, 520);
  resetGame();
  getNewClue();
  closeLid();

  // Set text characteristics
  textSize(default_fontsize);
  textAlign(CENTER, CENTER);

  slider = createSlider(-179, -1, -90);
  slider.position(300, 520);
  slider.style('width', '200px');

  var button_reset = createButton('New Game');
  button_reset.position(30, 30);
  button_reset.mousePressed(resetGame);

  var button_close_cover = createButton('Close Lid');
  button_close_cover.position(30, 80);
  button_close_cover.mousePressed(closeLid);

  var button_open_cover = createButton('Open Lid');
  button_open_cover.position(30, 130);
  button_open_cover.mousePressed(openLid);

  var button_new_clue = createButton('New Clue');
  button_new_clue.position(140, 30);
  button_new_clue.mousePressed(getNewClue);


  var button_opponent_less = createButton('Lower');
  button_opponent_less.position(620, 50);
  button_opponent_less.mousePressed(opponentPickLower);

  var button_opponent_more = createButton('Higher');
  button_opponent_more.position(700, 50);
  button_opponent_more.mousePressed(opponentPickHigher);
}

function resetGame() {
  print("randomizeTargetPosition");
  initial_indicator_position = Math.round(random(-1, max_slots));
  less_alpha = 50;
  more_alpha = 50;
}

function opponentPickHigher() {
  print("opponentPickHigher");
  less_alpha = 0;
  more_alpha = 255;
}

function opponentPickLower() {
  print("opponentPickLower");
  less_alpha = 255;
  more_alpha = 0;
}

function closeLid() {
  lid_alpha = 255;
  print("closeLid");
}

function openLid() {
  lid_alpha = 0;
  print("openLid");
}

function getNewClue() {

  var wordPair = randomNewClue();
  current_left_word = wordPair.left;
  current_right_word = wordPair.right;
}


function draw() {
  background(220);

  fill('black');
  noStroke();
  text("Opponent's choice", 680, 30);
  text("Current team's choice", 400, 512);
  drawGameBoard();

  //drawIndicators(0);
  drawIndicators(initial_indicator_position);

  drawFrontCover(lid_alpha);
  drawGameBoardBottom();
  drawCards();
  drawWords(current_left_word, current_right_word);

  var dial_length = 280;
  let angle = slider.value();
  drawDial(dial_length, angle);
  drawOpponentsPick(less_alpha, more_alpha);

}


function drawGameBoard() {
  // Draw the back cover600
  strokeWeight(4);
  stroke('black');
  fill(255, 255, 255);
  arc(400, 400, 600, 600, PI, TWO_PI, CHORD);
}

function drawGameBoardBottom() {
  // Draw bottom board
  fill(0, 0, 128);
  rect(0, 400, 800, 100, 30, 30, 10, 10);
}

function drawFrontCover(lid_alpha) {
  // Draw the front cover
  strokeWeight(4);
  stroke('black');
  fill(93, 211, 191, lid_alpha);
  arc(400, 400, 600, 600, PI, TWO_PI, CHORD);
  
}

function drawDial(dial_length, angle) {
  //Draw dial knob
  strokeWeight(4);
  stroke('black');
  fill('red');
  circle(400, 400, 20);

  //Draw dial
  strokeWeight(3);
  stroke('red');
  line(400,
    400,
    400 + (cos(angle * PI / 180) * dial_length),
    400 + (sin(angle * PI / 180) * dial_length));

}

function drawCards() {
  // Draw left card
  fill(135, 206, 250);
  rect(180, 401, 220, 98, 30, 10, 10, 10);

  let v0 = createVector(350, 420);
  let v1 = createVector(-100, 0);
  drawArrow(v0, v1, 'black');

  // Draw right card
  fill(255, 215, 0);
  rect(400, 401, 220, 98, 10, 30, 10, 10);

  let v2 = createVector(450, 420);
  let v3 = createVector(100, 0);
  drawArrow(v2, v3, 'black');
}

function drawWords(left_word, right_word) {
  fill('black');
  noStroke();
  text(left_word, 180, 401, 220, 90);
  text(right_word, 400, 401, 220, 90);
}

function drawOpponentsPick(less_alpha, more_alpha) {

  stroke('black');
  strokeWeight(2);
  fill(255, 105, 180, less_alpha);
  triangle(40, 340, 80, 320, 80, 360);

  stroke('black');
  strokeWeight(2);
  fill(255, 105, 180, more_alpha);
  triangle(760, 340, 720, 320, 720, 360);

}

function drawIndicators(x) {
  let mid_point = x * PI / max_slots;
  // Mid
  noStroke();
  fill(255, 127, 80);
  arc(400, 400, 600, 600, PI + mid_point, PI + mid_point + 0.1, PIE);

  // Right green
  noStroke();
  fill(64, 224, 208);
  arc(400, 400, 600, 600, PI + mid_point + 0.1, PI + mid_point + 0.2, PIE);

  // Left green
  noStroke();
  fill(64, 224, 208);
  arc(400, 400, 600, 600, PI + mid_point - 0.1, PI + mid_point, PIE);

  // Right orange
  noStroke();
  fill(255, 165, 0);
  arc(400, 400, 600, 600, PI + mid_point + 0.2, PI + mid_point + 0.3, PIE);

  // Left orange
  noStroke();
  fill(255, 165, 0);
  arc(400, 400, 600, 600, PI + mid_point - 0.2, PI + mid_point - 0.1, PIE);
}


function drawArrow(base, vec, myColor) {
  // draw an arrow for a vector at a given base position
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function randomNewClue() {
  var wordlist = [
    {
        "left": "cheap",
        "right": "expensive"
    },
    {
        "left": "art house film",
        "right": "blockbuster"
    },
    {
        "left": "casual",
        "right": "formal"
    },
    {
        "left": "cold",
        "right": "hot"
    },
    {
        "left": "light",
        "right": "heavy"
    },
    {
        "left": "lazy",
        "right": "active"
    },
    {
        "left": "amateur",
        "right": "professional"
    },
    {
        "left": "boring activity",
        "right": "exciting activity"
    },
    {
        "left": "artificial",
        "right": "natural"
    },
    {
        "left": "awful",
        "right": "pleasant"
    },
    {
        "left": "dictatorship",
        "right": "democracy"
    },
    {
        "left": "easy",
        "right": "difficult"
    },
    {
        "left": "clean",
        "right": "dirty"
    },
    {
        "left": "foreign",
        "right": "domestic"
    },
    {
        "left": "little",
        "right": "big"
    },
    {
        "left": "drama",
        "right": "comedy"
    },
    {
        "left": "safe",
        "right": "dangerous"
    },
    {
        "left": "moderate",
        "right": "extreme"
    },
    {
        "left": "few",
        "right": "many"
    },
    {
        "left": "occasionally",
        "right": "frequently"
    },
    {
        "left": "stale",
        "right": "fresh"
    },
    {
        "left": "serious",
        "right": "funny"
    },
    {
        "left": "empty",
        "right": "full"
    },
    {
        "left": "fiction",
        "right": "fact"
    },
    {
        "left": "rough",
        "right": "smooth"
    },
    {
        "left": "repulsive",
        "right": "attractive"
    },
    {
        "left": "rare gift",
        "right": "common gift"
    },
    {
        "left": "pessimist",
        "right": "optimist"
    },
    {
        "left": "opaque",
        "right": "clear"
    },
    {
        "left": "dinner",
        "right": "breakfast"
    },
    {
        "left": "a cat's name",
        "right": "a dog's name"
    },
    {
        "left": "slow",
        "right": "fast"
    },
    {
        "left": "seldom consumed",
        "right": "frequently consumed"
    },
    {
        "left": "trivial",
        "right": "important"
    },
    {
        "left": "illegal",
        "right": "lawful"
    },
    {
        "left": "quiet",
        "right": "noisy"
    },
    {
        "left": "messy",
        "right": "neat"
    },
    {
        "left": "one-hit wonder",
        "right": "world best-seller"
    },
    {
        "left": "scarce",
        "right": "plentiful"
    },
    {
        "left": "private",
        "right": "public"
    },
    {
        "left": "crooked",
        "right": "straight"
    },
    {
        "left": "failure",
        "right": "success"
    },
    {
        "left": "a voluntary act",
        "right": "a compulsory act"
    },
    {
        "left": "80s",
        "right": "90s"
    },
    {
        "left": "Danger job",
        "right": "Safe job"
    },
    {
        "left": "smells bad",
        "right": "smells good"
    },
    {
        "left": "bad habit",
        "right": "good habit"
    },
    {
        "left": "historically unimportant",
        "right": "historically important"
    },
    {
        "left": "guilty pleasure",
        "right": "openly love"
    },
    {
        "left": "round",
        "right": "pointy"
    },
    {
        "left": "dark",
        "right": "light"
    },
    {
        "left": "inflexible",
        "right": "flexible"
    },
    {
        "left": "useless invention",
        "right": "useful invention"
    },
    {
        "left": "ugly man",
        "right": "beautiful man"
    },
    {
        "left": "low quality",
        "right": "high quality"
    },
    {
        "left": "underrated skill",
        "right": "overrated skill"
    },
    {
        "left": "bad person",
        "right": "good person"
    },
    {
        "left": "normal thing to own",
        "right": "weird thing to own"
    },
    {
        "left": "requires luck",
        "right": "requires skill"
    },
    {
        "left": "underrated",
        "right": "overrated"
    },
    {
        "left": "unpopular",
        "right": "popular"
    },
    {
        "left": "bad ice-cream toppings",
        "right": "good ice-cream toppings"
    },
    {
        "left": "bad pizza toppings",
        "right": "good pizza toppings"
    },
    {
        "left": "old-fashion",
        "right": "contemporary"
    },
    {
        "left": "salty",
        "right": "sweet"
    },
    {
        "left": "unacceptable reason to be late",
        "right": "acceptable reason to be late"
    },
    {
        "left": "summer",
        "right": "winter"
    },
    {
        "left": "unhealthy food",
        "right": "healthy food"
    },
    {
        "left": "uncommon hobby",
        "right": "common hobby"
    },
    {
        "left": "religious",
        "right": "secular"
    },
    {
        "left": "useless major",
        "right": "practical major"
    },
    {
        "left": "easy activity",
        "right": "strenous activity"
    },
    {
        "left": "weak",
        "right": "strong"
    },
    {
        "left": "TV show with bad ending",
        "right": "TV show with good ending"
    },
    {
        "left": "bad children's book",
        "right": "good children's book"
    },
    {
        "left": "divided",
        "right": "whole"
    },
    {
        "left": "wet",
        "right": "dry"
    },
    {
        "left": "romantic movie",
        "right": "adventure movie"
    },
    {
        "left": "unforgivable",
        "right": "forgivable"
    },
    {
        "left": "stupid",
        "right": "brilliant"
    },
    {
        "left": "geek",
        "right": "dork"
    },
    {
        "left": "poorly made",
        "right": "well made"
    },
    {
        "left": "unknown park",
        "right": "famous park"
    },
    {
        "left": "forbidden",
        "right": "encouraged"
    },
    {
        "left": "nature",
        "right": "nurture"
    },
    {
        "left": "least evil company",
        "right": "most evil company"
    },
    {
        "left": "low calorie",
        "right": "high calorie"
    },
    {
        "left": "out of control",
        "right": "in control"
    },
    {
        "left": "easy subject",
        "right": "hard subject"
    },
    {
        "left": "apolotical",
        "right": "political"
    },
    {
        "left": "hard to clean",
        "right": "easy to clean"
    },
    {
        "left": "bad actor",
        "right": "good actor"
    },
    {
        "left": "unpopular opinion",
        "right": "popular opinion"
    }
  ];
  return wordlist[
    Math.floor(Math.random() * wordlist.length)];
}
