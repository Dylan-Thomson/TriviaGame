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

// TODO change to object
class GameTimer {
    constructor(time) {
        this.time = time;
        this.intervalId;
    }

    startTimer() {
        this.intervalId = setInterval(this.runTimer, 1000);
    }

    runTimer() {
        console.log(GameTimer.time);
        GameTimer.time--;
        if(GameTimer.time <= 0) {
            this.stopTimer();
        }
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }
}

function test_isGuessCorrect() {
    var testQuestion = new TriviaQuestion("Is cheese good", ["Yes", "Maybe", "No"], 0, "");
    console.log(testQuestion.isGuessCorrect("Yes"));
    console.log(testQuestion.isGuessCorrect("No"));
}
