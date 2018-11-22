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
// class GameTimer {
//     constructor(time) {
//         this.time = time;
//         this.timeRemaining = time;
//         this.intervalId;
//     }

//     startTimer() {
//         var self = this;
//         self.intervalId = setInterval(function() {
//             console.log(self.timeRemaining);
//             self.timeRemaining--;
//             if(self.timeRemaining < 0) {
//                 self.stopTimer();
//             }
//         }, 1000);
//     }
    
//     stopTimer() {
//         clearInterval(this.intervalId);
//     }

//     resetTimer() {
//         this.timeRemaining = this.time;
//     }
// }

/****************************************
TriviaGame
-Array of question objects
-Timer object
-Current question
-Correct and wrong answer count
*****************************************/
class TriviaGame {
    constructor(questions, time) {
        this.questions = questions;
        this.time = time;
        this.timeRemaining = time;
        this.currentQuestion = this.questions.shift();
        console.log(this.currentQuestion.question);
        this.correctAnswers = 0; 
        this.missedAnswers = 0;
        this.intervalId;
    }

    nextQuestion() {
        if(this.questions.length > 0) {
            this.currentQuestion = this.questions.shift();
            console.log(this.currentQuestion.question);
            return this.currentQuestion;
        }
        else {
            this.gameOver();
            return null;
        }
    }

    gameOver() {
        console.log("Game Over!");
        console.log("Correct answers", this.correctAnswers);
        console.log("Missed answers", this.missedAnswers);
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            console.log(this.timeRemaining);
            this.timeRemaining--;
            if(this.timeRemaining < 0) {
                this.missedAnswer();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }

    resetTimer() {
        this.timeRemaining = this.time;
    }

    missedAnswer() {
        this.stopTimer();
        this.missedAnswers++;
        console.log("Nope. The correct answer is: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        setTimeout(() => {
            if(this.nextQuestion()) {
                this.resetTimer();
                this.startTimer();
            }
        }, 5 * 1000);
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
});