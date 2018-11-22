/****************************************
Question object
-String for question
-Array of possible answers
-Correct answer, maybe represented as index of array
-String for image
    User clicks a choice, gets a string
    if option.indexOf(choice) === indexOfAnswer
*****************************************/
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
/****************************************
Timer
-Time, time remaining, interval ID
-Start, stop, reset
*****************************************/
class GameTimer {
    constructor(time) {
        this.time = time;
        this.timeRemaining = time;
        this.intervalId;
    }

    startTimer() {
        var self = this;
        self.intervalId = setInterval(function() {
            console.log(self.timeRemaining);
            self.timeRemaining--;
            if(self.timeRemaining < 0) {
                self.stopTimer();
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

/****************************************
TriviaGame
-Array of question objects
-Timer object
-Current question
-Correct and wrong answer count
*****************************************/
class TriviaGame {
    constructor(questions, timer) {
        this.questions = questions;
        this.timer = timer;
        this.currentQuestion = this.questions.shift();
        console.log(this.currentQuestion.question);
        this.correctAnswers = 0; 
        this.incorrectAnswers = 0;
    }

    nextQuestion() {
        if(this.questions.length > 0) {
            this.currentQuestion = this.questions.shift();
            console.log(this.currentQuestion.question);
        }
        else {
            this.win();
        }
    }

    win() {
        console.log("You won!");
        console.log("Correct answers", this.correctAnswers);
        console.log("Incorrect answers", this.incorrectAnswers);

    }


}

var game;

function init() {
    var questions = [
        new TriviaQuestion("Do you like cheese?", ["Yes", "Maybe", "No"], 0, "image"),
        new TriviaQuestion("Do you like bread?", ["Yes", "Maybe", "No"], 1, "image"),
        new TriviaQuestion("Do you like kale?", ["Yes", "Maybe", "No"], 2, "image"),
    ];
    var timer = new GameTimer(60);
    game = new TriviaGame(questions, timer);
}

$(document).ready(function() {
    init();
});