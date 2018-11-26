function test_isGuessCorrect() {
    var testQuestion = new TriviaQuestion("Is cheese good", ["Yes", "Maybe", "No"], 0, "");
    console.log(testQuestion.isGuessCorrect("Yes"));
    console.log(testQuestion.isGuessCorrect("No"));
}

function test_nextQuestion() {
    var game;
    var questions = [
        new TriviaQuestion("Do you like cheese?", ["Yes", "Maybe", "No"], 0, "https://amp.businessinsider.com/images/5b8592ba89c8a1d6218b4a36-750-563.jpg"),
        new TriviaQuestion("Do you like bread?", ["Yes", "Maybe", "No"], 1, "image"),
        new TriviaQuestion("Do you like kale?", ["Yes", "Maybe", "No"], 2, "image"),
    ];
    game = new TriviaGame(questions, 3);
    while(game.nextQuestion());
}