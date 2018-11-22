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

function test_isGuessCorrect() {
    var testQuestion = new TriviaQuestion("Is cheese good", ["Yes", "Maybe", "No"], 0, "");
    console.log(testQuestion.isGuessCorrect("Yes"));
    console.log(testQuestion.isGuessCorrect("No"));
}

function test_GameTimer() {
    var timer = new GameTimer(10);
    console.log("Starting timer");
    timer.startTimer();
    setTimeout(() => {
        console.log("Pausing timer at " + timer.time);
        timer.stopTimer();
        setTimeout(() => {
            console.log("Unpausing timer");
            timer.startTimer();
        }, 2000);
    }, 2000);

}