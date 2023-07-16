// Constants for all sizes.
const canvasWidth = 800;
const canvasHeight = 500;

const categoryDivWidth = 180;
const headerY = 10;
const qaButtonY = 100;
const questionY = 150;
const answerY = 350;

// Variables for category.
// This is the default category when the game starts.
let current_category = 'geography';
let category_buttons;
const categories = ['geography', 'history', 'mathematics', 'people_and_places', 'religion_and_mythology', 'science_and_nature'];
let questions_by_category;

// Initialize variables for questions and answers.
let questions;
let question_text = "Click Next Question";
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

  let buttonFontSize = '18px';

  button_reset = createButton('Next Question');
  button_reset.position(categoryDivWidth + 200, qaButtonY);
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
        .position(10, 30 * i)
        .style('background-color', "#FFFFFF")
        .mousePressed(createCategoryButtonMousePressedFunc(category)));
  }
  // Color the default category button during game initial setup.
  colorSelectedCategoryButton(current_category);

}


function draw() {
  background('#222222');
  displayHeader();
  drawCategoryDiv();
  displayQuestion();
  displayAnswer();
}

// SETTING CATEGORIES

function drawCategoryDiv() {

  fill("#FAFAFA");
  rect(0, 0, categoryDivWidth, canvasHeight);
  fill("#000000");
  textSize(20);
  textAlign(LEFT);
  text("Category", 10, 20);
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
}

function colorSelectedCategoryButton(value) {
  for (let [key, button] of category_buttons) {
    if (key == value) {
      button.style('background-color', "#FFFF00");
    } else {
      button.style('background-color', "#FFFFFF")
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
  current_answer = current_question.answers[0];
}

function displayHeader() {
  textSize(40);
  textAlign(CENTER);
  fill("#D3D3D3");
  text("TRIVIA", categoryDivWidth, headerY, 700, 300);
}

function displayQuestion() {
  textSize(30);
  textAlign(CENTER);
  fill("#D3D3D3");
  // Display the question.
  text(question_text, categoryDivWidth, questionY, canvasWidth - categoryDivWidth, 300);
}

function displayAnswer() {
  textSize(30);
  textAlign(CENTER);
  fill("#D3D3D3");
  // Display the answer.
  text(answer_text, categoryDivWidth, answerY, canvasWidth - categoryDivWidth, 500);
}

function makeAnswerVisible() {
  answer_text = current_answer;
}
