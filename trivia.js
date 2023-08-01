// Initialize variables for questions and answers.
let questions;
let question_text = "Click Next Question";
let answer_text = "";
let current_answer;

// Variables for category.
let radio_category;
const categories = ['geography', 'history', 'mathematics', 'people_and_places', 'religion_and_mythology', 'science_and_nature'];
let questions_by_category;

// Constants for all sizes.
const canvasWidth = 800;
const canvasHeight = 500;
const radioX = 160;
const radioY = 70;
const radioWidth = canvasWidth - 2 * radioX;
const buttonY = 150;


function preload() {
  // Load the list of questions from a file.
  let base_url = 'https://raw.githubusercontent.com/bjouxzfish/p5jsapp/gh-pages/assets/trivia/'
  questions_by_category = new Map();
  for (let category of categories) {
    url = base_url + category + '.json';
    questions_by_category.set(category, loadJSON(url));
  }

}

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  textAlign(CENTER);
  displayQuestion();
  displayAnswer(answer_text);

  let buttonFontSize = '18px';

  button_reset = createButton('Next Question');
  button_reset.position(200, buttonY);
  button_reset.mousePressed(randomNewQuestion);
  button_reset.style('font-size', buttonFontSize);

  button_ans = createButton('Answer');
  button_ans.position(400, buttonY);
  button_ans.mousePressed(makeAnswerVisible);
  button_ans.style('font-size', buttonFontSize);

  drawRadioDiv();

  // Category selection using a radio.
  radio_category = createRadio();
  for (let i = 1; i <= categories.length; i++) {
    radio_category.option(i, categories[i - 1]);
  }
  // Set init value
  radio_category.value("1");
  // Set the width
  radio_category.style("width", radioWidth.toString() + "px");
  // Set the font size of the radio button
  radio_category.style("font-size", "20px");

  // Position the radio-button object
  radio_category.position(radioX, radioY);

  setCategory();
}


function draw() {
  background('#222222');
  displayHeader();
  drawRadioDiv();
  setCategory();
  displayQuestion();
  displayAnswer();
}

function drawRadioDiv() {
  // Draw bottom board
  fill("#FAFAFA");
  rect(radioX, radioY, radioWidth, 50);
}

function setCategory() {
  let radio_val;

  if (radio_category.value().length === 0) {
    // If no category selected, use the first category.
    radio_val = 0;
  } else {
    radio_val = int(radio_category.value()) - 1;
  }

  let current_category = categories[radio_val];
  questions = questions_by_category.get(current_category);
}

function randomNewQuestion() {
  var q_length = Object.keys(questions).length;
  var current_question = questions[
    Math.floor(Math.random() * q_length)];
  question_text = current_question.question;
  answer_text = "";
  current_answer = current_question.answers[0];
}

function displayHeader() {
  textSize(40);
  fill("#D3D3D3");
  text("TRIVIA", 20, 10, 700, 300);
}

function displayCategories() {
  textSize(30);
  // Display the question.
  text(question_text, 20, 150, 700, 300);
}

function displayQuestion() {
  textSize(30);
  // Display the question.
  text(question_text, 20, 200, 700, 300);
}

function displayAnswer() {
  textSize(30);
  // Display the answer.
  text(answer_text, 20, 350, 700, 500);
}

function makeAnswerVisible() {
  answer_text = current_answer;
}
