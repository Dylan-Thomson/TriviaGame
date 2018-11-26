class TriviaQuestion {
    // String, array, number, string
    constructor(question, answers, indexOfAnswer, imagePath) {
        this.question = question;
        this.answers = answers;
        this.indexOfAnswer = indexOfAnswer;
        this.imagePath = imagePath;
    }

    isGuessCorrect(guess) {
        return this.answers.indexOf(guess) === this.indexOfAnswer;
    }
}

class TriviaGame {
    constructor(questions, time) {
        this.questions = questions;
        this.time = time;
        this.timeRemaining = time;
        this.correctAnswers = 0; 
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.intervalId;
    }

    // Begin the game by getting the first question and starting the timer
    start() {
        this.startTimer();
        this.nextQuestion();
    }

    guess(guess) {
        if(this.currentQuestion.answers.indexOf(guess) === this.currentQuestion.indexOfAnswer) {
            this.resolveAnswer(true);
        }
        else {
            this.resolveAnswer(false);
        }
    }
    
    resolveAnswer(correct) {
        if(correct) {
            this.correctAnswers++;
            console.log("Correct! The answer was " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
            $("#results").text("Correct! The answer was " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        } 
        else if(correct === undefined) {
            this.unanswered++;
            console.log("You ran out of time. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
            $("#results").text("You ran out of time. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        }
        else {
            this.incorrectAnswers++;
            console.log("Nope. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
            $("#results").text("Nope. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        }
    

        $("#results-img").attr("src", this.currentQuestion.imagePath);
        $("#results-container").show();
        $("#question-container").hide();
        this.stopTimer();
        setTimeout(() => {
            if(this.nextQuestion()) {
                this.resetTimer();
                this.startTimer();
            }
        }, 3 * 1000);
    }
    
    nextQuestion() {
        if(this.questions.length > 0) {
            $("#question-container").show();
            $("#results-container").hide();
            this.currentQuestion = this.questions.shift();
            console.log(this.currentQuestion.question);
            this.clearPreviousQuestion();
            this.displayQuestion();
            return this.currentQuestion;
        }
        else {
            this.gameOver();
            return null;
        }
    }
    
    gameOver() {
        $("#question-container").hide();
        $("#results-container").hide();
        $("#game-over-container").show();
        $("#restart-btn").show();
        $("#correct-answers").text(this.correctAnswers);
        $("#incorrect-answers").text(this.incorrectAnswers);
        $("#unanswered").text(this.unanswered);
        console.log("Game Over!");
        console.log("Correct answers", this.correctAnswers);
        console.log("Incorrect answers", this.incorrectAnswers);
        console.log("Unanswered", this.unanswered);
    }

    displayQuestion() {
        $("#question").text(this.currentQuestion.question);
        this.currentQuestion.answers.forEach((answer) => {
            var li = $("<li>");
            li.addClass("option");
            li.text(answer);
            $("#options").append(li);
            li.on("click", () => {
                console.log(answer);
                this.guess(answer);
            });
        });
    }

    clearPreviousQuestion() {
        $("#question").text("");
        $("#options").empty();
    }

    // TODO: figue out why decrementing time remaining before setinterval makes the clock work
    startTimer() {
        $("#question-timer").text(this.timeRemaining); 
        console.log(this.timeRemaining);
        this.timeRemaining--;
        console.log(this.timeRemaining);
        this.intervalId = setInterval(() => {
            console.log(this.timeRemaining);
            $("#question-timer").text(this.timeRemaining); 
            this.timeRemaining--;
            if(this.timeRemaining < 0) {
                this.resolveAnswer();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }

    resetTimer() {
        this.timeRemaining = this.time;
    }

}

var game;

function init() {
    var questions = [
        new TriviaQuestion("Do you like cheese?", ["Yes", "Maybe", "No"], 0, "https://amp.businessinsider.com/images/5b8592ba89c8a1d6218b4a36-750-563.jpg"),
        new TriviaQuestion("Do you like bread?", ["Yes", "Maybe", "No"], 1, "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps32480_MRR153791D09_18_6b-2-696x696.jpg"),
        new TriviaQuestion("Do you like kale?", ["Yes", "Maybe", "No"], 2, "https://i0.wp.com/www.healthline.com/hlcmsresource/images/AN_images/benefits-of-kale-1296x728-feature.jpg?w=1155&h=1528"),
    ];
    // var timer = new GameTimer(60);
    game = new TriviaGame(questions, 3);
}

$(document).ready(function() {
    init();
    // game.start();

    $("#start-btn").on("click", () => {
        game.start();
        $("#start-btn").hide();
    });

    $("#restart-btn").on("click", () => {
        init();
        $("#game-over-container").hide();
        game.start();
        $("#restart-btn").hide();
    });
});