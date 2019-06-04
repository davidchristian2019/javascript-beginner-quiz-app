/* Quiz app design checklist
-----------------------------------------------------
1. Use strict code to check coding errors
2. Write a function that could show quiz score
3. Write a basic description of quiz app
4. Write a function to generate questions
5. Write a function to generate answers
6. Write a function to generate feedback after answering each question
7. Write a function to generate final message after completing quiz
8. Write a function to generate notice after completing quiz
9. Write a function to render start page
10.Write a function to render final page
11.Write a function to render feedback page
12.Write a function to get current question from store
13.Write a function to render current question
14.Write a function to render current question page number
15.Write a function to start quiz
16.Write a function to find correct answer
17.Write a function to get current question and answers when submit form
18.Write a function to calculate score
19.Write a function to check whether it is the last question
20.Write a function to render questions after clicking "next Question" button
21.Write a function to show current score
22.Write a function to restart quiz
23.Write a function to restart quiz when click "Restart quiz" button
24.Write a function to set up event handlers
25.Write a function to initialize quiz
-----------------------------------------------------
 */

//1. Use strict mode
'use strict';

//2. Write a function to update quiz score
function updateScore(score) {
  $('#score').text(score);
}

//3. Write a basic description of quiz app
function generateStartHTML() {
  return `
  <div class="container">
  <p>
    For Javascript developers who are just starting learning the language, or have only recently started.
  </p> 
  <p>Take the quiz and test your basic javascript knowledge!</p>
  <button id="startQuizButton">Start</button>
  </div>
  `;
}

//4. Write a function to generate questions
function generateQuestionHTML(question, questionNumber) {
  return `
      <h2>Question ${questionNumber + 1}</h2>    
      <form role="form" class="quiz">
        <fieldset>
          <legend>
            ${question.text}
           </legend>
              <ol type="A">
                ${question.answers.map(generateAnswerHTML).join("\n")}
              </ol>
                    <button id="submitAnswer">Submit</button>
        </fieldset> 
      </form>
  `;
}

//5. Write a function to generate answers
function generateAnswerHTML(answer, index) {
  return `<li><input type="radio" id="answer${index}" name="answer" value="${index}" required><label for="answer${index}">${answer.text}</label></li>`;
}

//6.Write a function to generate feedback after answering each question
function generateFeedBackHTML(selectedAnswer, correctAnswer) {
    const message = selectedAnswer.isCorrect ? "Awesome, that's the correct answer!" : "Sorry, that's not the correct answer...";
    const correctAnswerMessage = selectedAnswer.isCorrect ? "": `<p>The correct answer is: ${correctAnswer.text}.</p>`;
    const buttonText = isLastQuestion(1) ? "Quiz Score" : "Next Question"
    return `
      <h2>${message}</h2>
      ${correctAnswerMessage}
      <button id="nextQuestionButton">${buttonText}</button>
      `;
}

//7.Write a function to generate final message after completing quiz
function generateFinalMessage(score) {
  let message = "";
  switch (score) {
    case 0:
      message = "Don't give up! Keep learning Javascript and try it again!";
      break;  
    case 1:
      message = "Do more practice and you will get more scores next time";
      break;   
    case 2:
      message = "Almost there, eat with Javascript and you will pass the quiz!";
      break;   
    case 3:
      message = "Almost pass the quiz, read Javascript book after dinner and you will know more basic knowledge!!!!"
      break;
    default:   
      message = "It is a great start! You pass the quiz! Keep reading Javascript handbook and doing more coding practice. You will become a Javascript expert in the future!!!"
      break;
  }
  return message;
}

//8.Write a function to generate notice after completing quiz
function generateFinalHTML(score, maxScore) {
      return `
      <h2>Congratulations! You've reached the end of your journey!</h2>
      <p>You scored ${score} out of ${maxScore} questions correctly!</p>
      <p>${generateFinalMessage(score)}<p>
      <button id="restartQuizButton">Restart Quiz</button>
      `;
}

//9.Write a function to render start page
function renderStartPage() {
  $('section').html(generateStartHTML());
}

//10.Write a function to render final page
function renderFinalPage(score, maxScore) {
  $('section').html(generateFinalHTML(score, maxScore));
}

//11.Write a function to render feedback page
function renderFeedBackPage(selectedAnswer, correctAnswer) {
  $('section').html(generateFeedBackHTML(selectedAnswer, correctAnswer));
}

//12.Write a function to get current question from store
function getCurrentQuestion() {
  return QUIZ.questions[QUIZ.answers.length];  
}

//13.Write a function to render current question
function renderCurrentQuestion() {
  renderQuestionPage(getCurrentQuestion(), QUIZ.answers.length);
}

//14.Write a function to render current question page number
function renderQuestionPage (question, questionNumber) {
  $('section').html(generateQuestionHTML(question, questionNumber));
}

//15.Write a function to start quiz
function handleStartQuiz() {
  $('section').on('click','#startQuizButton', function(event) {
    renderCurrentQuestion();
  });
}

//16.Write a function to find correct answer
function findCorrectAnswer(question) {
  return question.answers.find(function(answer) {
    return answer.isCorrect;
  })
}

//17.Write a function to get current question and answers when submit form
function handleQuestionFormSubmit() {
  $('section').on('submit', 'form', function(event) {   
    event.preventDefault();
    const selectedAnswerIndex = parseInt($("input[name='answer']:checked").val());
    const selectedAnswer = getCurrentQuestion().answers[selectedAnswerIndex]
    renderFeedBackPage(selectedAnswer, findCorrectAnswer(getCurrentQuestion()));
    QUIZ.answers.push(selectedAnswer);
    showCurrentScore();  
  });
}
// 18.Write a function to calculate score
function calculateScore() {
  return QUIZ.answers.filter(function(answer) {
    return answer.isCorrect;
  }).length;
}

// 19.Write a function to check whether it is the last question
function isLastQuestion(offset=0) {
  return !(QUIZ.answers.length + offset < QUIZ.questions.length);
}
// 20.Write a function to render questions after clicking "next Question" button
function handleNextQuestion() {
  $('section').on('click', '#nextQuestionButton', function(event) {
    if (!isLastQuestion()) {
        renderCurrentQuestion();
    } else {
        renderFinalPage(calculateScore(), QUIZ.questions.length);
    }
  });
}
// 21.Write a function to show current score
function showCurrentScore() {
  updateScore(calculateScore());   
}
// 22.Write a function to restart quiz
function restartQuiz() {
  QUIZ.answers = [];
  showCurrentScore();
  renderStartPage();
}
// 23.Write a function to restart quiz when click "Restart quiz" button
function handleRestartQuiz() {
  $('section').on('click', '#restartQuizButton', function(event) {
    restartQuiz();
  });
}
// 24.Write a function to set up event handlers
function setUpEventHandlers() {
  handleStartQuiz();
  handleQuestionFormSubmit();
  handleNextQuestion();
  handleRestartQuiz();
}
// 25.Write a function to initialize quiz
function initializeQuiz() {
  setUpEventHandlers();
  renderStartPage();
}
  
$(initializeQuiz);
