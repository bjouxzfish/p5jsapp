var questions;
let question_text = "Q";
let answer_text = "ANS";
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
  displayQuestion();
  displayAnswer(answer_text);

  let buttonFontSize = '18px';

  button_reset = createButton('Next Question');
  button_reset.position(30, 100);
  button_reset.mousePressed(randomNewQuestion);
  button_reset.style('font-size', buttonFontSize);

  button_ans = createButton('Answer');
  button_ans.position(200, 100);
  button_ans.mousePressed(makeAnswerVisible);
  button_ans.style('font-size', buttonFontSize);

}

function draw() {
  background(220);
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
  // Display the question.
  text("TRIVIA", 20, 10, 700, 300);
}

// Create a function to display a question and the answer choices.
function displayQuestion() {
  textSize(20);
  // Display the question.
  text(question_text, 20, 150, 700, 300);
}

function displayAnswer() {
  textSize(20);
  // Display the answer.
  text(answer_text, 20, 300, 700, 500);
}

function makeAnswerVisible(){
  answer_text = current_answer;
}
