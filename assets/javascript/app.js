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
        }, 5 * 1000);
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
        new TriviaQuestion("Pam Beesly received a lifetime ban from which of the following restaurants?", 
                          ["Applebee's", "Chili's", "Chipotle", "McDonald's"], 
                          1, 
                          "https://media.giphy.com/media/yoJC2oCKxTLNrr30Jy/giphy.gif"),
        new TriviaQuestion("Michael Scott organized a charity race to raise funds in order to cure which of the following diseases?", 
                          ["Polio", "Affluenza", "Tourette's Syndrome", "Rabies"], 
                          3, 
                          "https://media.giphy.com/media/p5tWDtmnHZyY8/giphy.gif"),
        new TriviaQuestion("Kevin Malone is the lead singer and drummer of which local band?", 
                          ["Scrantonicity", "Kevin and the Heartbreakers", "The Bacon Brothers", "Maloneum"], 
                          0, 
                          "https://media.giphy.com/media/yaQ8O1vftVWb6/giphy.gif"),
        new TriviaQuestion("What is Creed Bratton's position at Dunder Mifflin?", 
                          ["Accountant", "He doesn't actually work there", "Quality Assurance", "Salesman"], 
                          2, 
                          "https://media.giphy.com/media/JLnJ99KsV4Nq0/giphy.gif"),
        new TriviaQuestion("What substance does Jim Halpert put office supplies into as a prank?", 
                          ["Pudding", "Jello", "Super Glue", "Butter"], 
                          1, 
                          "https://media.giphy.com/media/I2mwW3cPptosg/giphy.gif"),
        new TriviaQuestion("What is Ryan Howard's nickname?", 
                          ["Big Tuna", "Ry Ry", "Fire Guy", "Bat Boy"], 
                          2, 
                          "https://media.giphy.com/media/jA4T01RxBv77W/giphy.gif"),
        new TriviaQuestion("What does Stanley Hudson love more than anything else in this world?", 
                          ["His job", "His dog", "Red wine", "Pretzel Day"], 
                          3, 
                          "https://media.giphy.com/media/vgUFOWBwBkziE/giphy.gif"),
        new TriviaQuestion("Dwight Schrute is the owner of Schrute Farms, where he grows which crop?", 
                          ["Carrots", "Potatoes", "Beans", "Beets"], 
                          3, 
                          "https://media.giphy.com/media/134DVXcD94sOWI/giphy.gif"),
        new TriviaQuestion("Which of the following is NOT the name of one of Angela Martin's cats?", 
                          ["Lady Aragorn", "Veronica", "Mr. Ash", "Pawlick Baggins"], 
                          1, 
                          "https://media.giphy.com/media/ibULBaRu6iq1a/giphy.gif")
    ];

    game = new TriviaGame(questions, 10);
}

$(document).ready(function() {
    init();

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