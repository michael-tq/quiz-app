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
    console.log(questionNumber)
    for (let i = 0; i < currentQuestion.answers.length; i++){
        let currentAnswer = currentQuestion.answers[i];
        let answerCode = `
        <input type="radio" class="buttons" id="answer-${currentAnswer}" value="${currentAnswer}" name="answer"/>
        <label for="answer-${currentAnswer}">${currentAnswer}</label>
        `;
        potentialAnswers = potentialAnswers.concat(answerCode);
        // console.log(currentAnswer);
    }
    let answers = ${potentialAnswers};
    let questionCode = `
    <div>
        <form>
        <h2>${currentQuestion.question}</h2>
        ${answers}
        <button type="submit" id="submitChoice">Submit</button>
        <button type="button" id="restart">Next</button>
        </form>
    </div>
    `;
    $('.main-form').val(' ');
    $('.main-form').html(questionCode);
}
function progressBar(displayScore, questionNumber){
    let progressBar = `
    <p>${displayScore} / 5 - Question #${questionNumber + 1}</p>
    `;
    $('.score-and-question-number').html(progressBar);
    if (questionNumber > 5) {
        alert('you have reached end of quiz');
    }
    console.log(`questionNumber ${questionNumber} score ${score}`)
    
}

function handler() {
    startQuiz();
    $('.main-form').on('click', '#submitChoice', function() {
        event.preventDefault();
        let itemSelection = $("input[name=answer]:checked").val();
        let question = STORE.questions[questionNumber]; //[questionNumber - 1]
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
        };
    });
    $('#restart').on('click', function() {
        startQuiz();
        console.log('fsdf');
        score = 0;
        questionNumber = 0;
        console.log(`${score} questionNumber ${questionNumber}`)
        $('#restart').hide();
        makeQuestion(0);
        progressBar(0, 0);
    });
    $('.main-form').on('click', '#next-question', function() {
        makeQuestion(questionNumber);
        progressBar(score, questionNumber);
    });
}

$(handler);