// Constants for all sizes.
const canvasWidth = 800;
const canvasHeight = 500;

const categoryDivWidth = 200;
const categoryX = 10;
const headerY = 10;
const qaButtonY = 100;
const questionY = 150;
const answerY = 350;
const buttonFontSize = '20px';

const appBGColor = "#1A1A1D";
const textColor = "#D3D3D3";

// Varia#1A1A1Dbles for category.
// This is the default category when the game starts.
let current_category = 'geography';
let num_questions = 0;
let category_buttons;
const categories = ['geography', 'food_and_drink', 'history', 'mathematics', 'entertainment', 'people_and_places', 'religion_and_mythology', 'science_and_nature'];
let questions_by_category;
const categoryDivBGColor = "#313136";
const uncheckedCategoryButtonColor = "";
const checkedCategoryButtonColor = "#396dd3";

// Initialize variables for questions and answers.
let questions;
let question_text = "Click Next Question to Begin";
let answer_text = "";
let current_answer;


function preload() {
  // Load the list of questions from a file.
  let base_url = 'https://raw.githubusercontent.com/bjouxzfish/p5jsapp/gh-pages/assets/trivia/'
  questions_by_category = new Map();
  for (let category of categories) {
    url = base_url + category + '.json';
    questions_by_category.set(category, loadJSON(url));
  }
  // Set the current questions to the default category.
  questions = questions_by_category.get(current_category);
}


function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  textAlign(CENTER);
  displayQuestion();
  displayAnswer(answer_text);

  button_reset = createButton('Next Question');
  button_reset.position(categoryDivWidth + 100, qaButtonY);
  button_reset.mousePressed(randomNewQuestion);
  button_reset.style('font-size', buttonFontSize);

  button_ans = createButton('Answer');
  button_ans.position(categoryDivWidth + 400, qaButtonY);
  button_ans.mousePressed(makeAnswerVisible);
  button_ans.style('font-size', buttonFontSize);

  // Place a div for category selection.
  drawCategoryDiv();

  // Create a button for each category.
  category_buttons = new Map();
  for (let i = 1; i <= categories.length; i++) {
    category = categories[i - 1]
    category_buttons.set(category,
      createButton(category)
        .position(categoryX, 40 * i + 10)
        .style('background-color', "#FFFFFF")
        .style('font-size', "16px")
        .mousePressed(createCategoryButtonMousePressedFunc(category)));
  }
  // Color the default category button during game initial setup.
  colorSelectedCategoryButton(current_category);

}


function draw() {
  background(appBGColor);
  displayHeader();
  drawCategoryDiv();
  num_questions = Object.keys(questions).length;
  displayCategoryStat();
  displayQuestion();
  displayAnswer();
}


// SETTING CATEGORIES
function drawCategoryDiv() {

  fill(categoryDivBGColor);
  rect(0, 0, categoryDivWidth, canvasHeight);
  fill(textColor);
  textSize(20);
  textAlign(LEFT);
  text("Category", categoryX, 30);
}


function createCategoryButtonMousePressedFunc(category_name) {
  return function () {
    setCurrentCategory(category_name);
    colorSelectedCategoryButton(category_name);
  }
}


function setCurrentCategory(value) {
  // console.log(value)
  current_category = value;
  questions = questions_by_category.get(current_category);
  num_questions = Object.keys(questions).length;
}


function colorSelectedCategoryButton(value) {
  for (let [key, button] of category_buttons) {
    if (key == value) {
      button.style('background-color', checkedCategoryButtonColor);
    } else {
      button.style('background-color', uncheckedCategoryButtonColor)
    };
  };
}


// SETTING Q&A
function randomNewQuestion() {
  var q_length = Object.keys(questions).length;
  var current_question = questions[
    Math.floor(Math.random() * q_length)];
  question_text = current_question.question;
  answer_text = "";
  current_answer = current_question.answers.join(", ");
}


function displayHeader() {
  textSize(40);
  textAlign(CENTER);
  fill("#FEFFFF");
  textStyle(BOLD);
  text("TRIVIA", categoryDivWidth, headerY, canvasWidth - categoryDivWidth, 300);
}


function displayQuestion() {
  textSize(30);
  textAlign(CENTER);
  fill(textColor);
  textStyle(NORMAL);
  // Display the question.
  text(question_text, categoryDivWidth, questionY, canvasWidth - categoryDivWidth, 300);
}


function displayAnswer() {
  textSize(30);
  textAlign(CENTER);
  fill(textColor);
  textStyle(NORMAL);
  // Display the answer.
  text(answer_text, categoryDivWidth, answerY, canvasWidth - categoryDivWidth, 500);
}


function makeAnswerVisible() {
  answer_text = current_answer;
}

function displayCategoryStat() {
  textSize(15);
  textAlign(CENTER);
  fill(textColor);
  textStyle(NORMAL);
  // Display the question.
  let stats = ["Category:", current_category, ";", "# of Questions:", num_questions.toString()]
  text(stats.join(" "), categoryDivWidth, headerY + 60, canvasWidth - categoryDivWidth, 100);

}
