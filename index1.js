let score = 0;
let questionNumber = 0;

function startQuiz() {
    $('.begin-quiz-button').on('click', function(event) {
        $('.begin-quiz-button').hide();
        $('.welcome').hide();
        makeQuestion(questionNumber);
        progressBar(score, questionNumber);
        questionNumber = 0;
        score = 0;
    });
};

function makeQuestion(questionNumber) {
    let currentQuestion = STORE.questions[questionNumber];
    let potentialAnswers = '';
    for (let i = 0; i < currentQuestion.answers.length; i++){
        let currentAnswer = currentQuestion.answers[i];
        let answerCode = `
        <label for="answer-${currentAnswer}" class='col'>
        <input type="radio" class="buttons" id="answer-${currentAnswer}" value="${currentAnswer}" name="answer"/>
        ${currentAnswer}</label>
        `
        potentialAnswers = potentialAnswers.concat(answerCode);
    }
    let answers = potentialAnswers;
    let questionCode = `
    <div>
        <form>
        <fieldset>
        <legend class="question-box">${currentQuestion.question}</legend>
        ${answers}
        <button type="submit" id="submitChoice">Submit</button>
        <button type="button" id="next">Next</button>
        </fieldset>
        </form>
    </div>
    `;
    $('.main-form').val(' ');
    $('.main-form').html(questionCode);
    $('#next').hide();
}

function progressBar(displayScore, questionNumber){
    let progressBar = `
    <p>${displayScore} / 5 - Question #${questionNumber + 1}</p>
    `;
    $('.score-and-question-number').html(progressBar);
    if (questionNumber > 5) {
        alert('you have reached end of quiz');
    };
}

function submitThing() {
    $('.main-form').on('click', '#submitChoice', function() {
        event.preventDefault();
        let itemSelection = $("input[name=answer]:checked").val();
        let question = STORE.questions[questionNumber]; 
        let correctAnswer = question.answer;
        let nextOption = '<button type="button" id="next-question">Next</button>';
        if (!itemSelection) {
            alert('pick an option');
            return;
        };
        if (correctAnswer === itemSelection){
            score++;
            $('.main-form').html(`
            <p class='correct'>You got it right!!</p>
            <button type="button" id="next-question">Next</button>
            `);
            progressBar(score, questionNumber);
        } else if (correctAnswer !== itemSelection){
            $('.main-form').html(`
            <p class='wrong'>You got it wrong!! The correct answer is ${correctAnswer}.</p>
            <button type="button" id="next-question">Next</button>
            `)
            progressBar(score, questionNumber);
        };
        $('#submitChoice').hide();
        questionNumber++;
        if (questionNumber >= 5) {
            $('#restart').show();
            $('#next-question').hide();
            let finalScore = `<p class="final">Your final score is ${score} / 5.</p>`;
            $('.main-form').append(finalScore);
        };
    });
}
function restartThing() {
    $('#restart').on('click', function() {
        startQuiz();
        score = 0;
        questionNumber = 0;
        $('#restart').hide();
        makeQuestion(0);
        progressBar(0, 0);
    });
}

function next() {
    $('.main-form').on('click', '#next-question', function() {
        makeQuestion(questionNumber);
        progressBar(score, questionNumber);
    });
}
function handler() {
    startQuiz();
    submitThing();
    restartThing();
    next();
}

$(handler);