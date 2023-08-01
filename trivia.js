var questions;
let question_text = "Click Next Question";
let answer_text = "";
var current_answer;

function preload() {
  // Load the list of questions from a file.
  let url =
    'https://raw.githubusercontent.com/bjouxzfish/p5jsapp/' +
    'gh-pages/assets/trivia/geography.json';
  questions = loadJSON(url);
}

function setup() {
  var canvas = createCanvas(800, 500);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  textAlign(CENTER);
  displayQuestion();
  displayAnswer(answer_text);

  let buttonFontSize = '18px';

  button_reset = createButton('Next Question');
  button_reset.position(200, 100);
  button_reset.mousePressed(randomNewQuestion);
  button_reset.style('font-size', buttonFontSize);

  button_ans = createButton('Answer');
  button_ans.position(400, 100);
  button_ans.mousePressed(makeAnswerVisible);
  button_ans.style('font-size', buttonFontSize);

}

function draw() {
  background('#222222');
  displayHeader();
  displayQuestion();
  displayAnswer();
}

function randomNewQuestion() {
  var q_length = Object.keys(questions).length;
  var current_question = questions[
    Math.floor(Math.random() * q_length)];
  question_text = current_question.question;
  answer_text  = "";
  current_answer = current_question.answers[0];
}

function displayHeader() {
  textSize(40);
  fill("#D3D3D3");
  text("TRIVIA", 20, 10, 700, 300);
}

function displayQuestion() {
  textSize(30);
  // Display the question.
  text(question_text, 20, 150, 700, 300);
}

function displayAnswer() {
  textSize(30);
  // Display the answer.
  text(answer_text, 20, 300, 700, 500);
}

function makeAnswerVisible(){
  answer_text = current_answer;
}
