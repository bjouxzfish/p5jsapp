var default_fontsize = 18;
var max_slots = 30;
var button_reset;
var button_close_cover;
var button_open_cover;
var button_new_clue;
var button_opponent_less;
var button_opponent_more;
var slider;
let wordlist;

function preload() {
    // Get the worlist data.
    let url =
        'https://raw.githubusercontent.com/bjouxzfish/p5jsapp/' +
        'gh-pages/assets/wordlist.json';
    wordlist = loadJSON(url);
}

function setup() {

    var canvas = createCanvas(800, 580);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    slider = createSlider(-179, -1, -179);
    slider.position(300, 530);
    slider.style('width', '200px');

    resetGame();
    getNewClue();
    closeLid();

    // Set text characteristics
    textSize(default_fontsize);
    textAlign(CENTER, CENTER);

    let buttonFontSize = '18px';

    button_reset = createButton('New Game (n)');
    button_reset.position(30, 30);
    button_reset.mousePressed(resetGame);
    button_reset.style('font-size', buttonFontSize);

    button_close_cover = createButton('Close Lid (c)');
    button_close_cover.position(30, 80);
    button_close_cover.mousePressed(closeLid);
    button_close_cover.style('font-size', buttonFontSize);

    button_open_cover = createButton('Open Lid (a)');
    button_open_cover.position(30, 130);
    button_open_cover.mousePressed(openLid);
    button_open_cover.style('font-size', buttonFontSize);

    button_new_clue = createButton('New Clue (k)');
    button_new_clue.position(180, 30);
    button_new_clue.mousePressed(getNewClue);
    button_new_clue.style('font-size', buttonFontSize);


    button_opponent_less = createButton('Lower');
    var opponent_button_col = color(255, 105, 180, 50);
    button_opponent_less.position(610, 50);
    button_opponent_less.mousePressed(opponentPickLower);
    button_opponent_less.style('font-size', '19px');
    button_opponent_less.style('background-color', opponent_button_col);

    button_opponent_more = createButton('Higher');
    button_opponent_more.position(700, 50);
    button_opponent_more.mousePressed(opponentPickHigher);
    button_opponent_more.style('font-size', '19px');
    button_opponent_more.style('background-color', opponent_button_col);
}

function resetGame() {
    initial_indicator_position = Math.round(random(-1, max_slots - 1));
    slider.value(-179);
    less_alpha = 50;
    more_alpha = 50;
}

function opponentPickHigher() {
    less_alpha = 0;
    more_alpha = 255;
}

function opponentPickLower() {
    less_alpha = 255;
    more_alpha = 0;
}

function closeLid() {
    lid_alpha = 255;
}

function openLid() {
    lid_alpha = 0;
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
    text("Current team's choice", 400, 520);
    drawGameBoard();

    //drawIndicators(0);
    drawIndicators(initial_indicator_position);

    drawFrontCover(lid_alpha);
    drawGameBoardBottom();
    drawCards();
    drawWords(current_left_word, current_right_word);

    var dial_length = 280;
    var angle = slider.value();
    drawDial(dial_length, angle);
    drawOpponentsPick(less_alpha, more_alpha);

}

function drawGameBoard() {
    // Draw the back cover
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
    let target_slice_angle = 0.12;
    let mid_point = x * PI / max_slots;
    // Mid
    noStroke();
    fill(255, 127, 80);
    arc(400, 400, 600, 600,
        PI + mid_point,
        PI + mid_point + target_slice_angle,
        PIE);

    // Right green
    noStroke();
    fill(64, 224, 208);
    arc(400, 400, 600, 600,
        PI + mid_point + target_slice_angle,
        PI + mid_point + 2 * target_slice_angle,
        PIE);

    // Left green
    noStroke();
    fill(64, 224, 208);
    arc(400, 400, 600, 600,
        PI + mid_point - target_slice_angle,
        PI + mid_point,
        PIE);

    // Right orange
    noStroke();
    fill(255, 165, 0);
    arc(400, 400, 600, 600,
        PI + mid_point + 2 * target_slice_angle,
        PI + mid_point + 3 * target_slice_angle,
        PIE);

    // Left orange
    noStroke();
    fill(255, 165, 0);
    arc(400, 400, 600, 600,
        PI + mid_point - 2 * target_slice_angle,
        PI + mid_point - target_slice_angle,
        PIE);
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

function keyTyped() {
    if (key === 'a') {
        openLid();
    } else if (key === 'c') {
        closeLid();
    } else if (key === 'n') {
        resetGame();
    } else if (key === 'k') {
        getNewClue();
    }
    // uncomment to prevent any default behavior
    // return false;
}

function randomNewClue() {
    return wordlist[
        Math.floor(Math.random() * wordlist.length)];
}
