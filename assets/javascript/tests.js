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
        console.log("Pausing timer at " + timer.timeRemaining);
        timer.stopTimer();
        setTimeout(() => {
            console.log("Unpausing timer");
            timer.startTimer();
            setTimeout(() => {
                console.log("Resetting timer at " + timer.timeRemaining);
                timer.resetTimer();
            }, 2000);
        }, 2000);
    }, 2000);
}