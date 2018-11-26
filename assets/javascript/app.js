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
        this.missedAnswers = 0;
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
        else {
            this.missedAnswer++;
            if(correct === undefined) {
                console.log("You ran out of time. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
                $("#results").text("You ran out of time. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
            }
            else {
                console.log("Nope. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
                $("#results").text("Nope. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
            }
        }

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
        $("#missed-answers").text(this.missedAnswers);
        console.log("Game Over!");
        console.log("Correct answers", this.correctAnswers);
        console.log("Missed answers", this.missedAnswers);
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
        new TriviaQuestion("Do you like cheese?", ["Yes", "Maybe", "No"], 0, "image"),
        new TriviaQuestion("Do you like bread?", ["Yes", "Maybe", "No"], 1, "image"),
        new TriviaQuestion("Do you like kale?", ["Yes", "Maybe", "No"], 2, "image"),
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