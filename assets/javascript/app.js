class TriviaQuestion {
    // new TriviaQuestion(string, array, number, string)
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
    // new TriviaGame(array, number)
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
        this.resolveQuestion(this.currentQuestion.isGuessCorrect(guess));
    }
    
    resolveQuestion(correct) {
        if(correct) {
            this.correctAnswers++;
            $("#results").text("Correct! The answer was: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        } 
        else if(correct === undefined) {
            this.unanswered++;
            $("#results").text("You ran out of time. The answer was: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
        }
        else {
            this.incorrectAnswers++;
            $("#results").text("Nope. The answer was: " + this.currentQuestion.answers[this.currentQuestion.indexOfAnswer]);
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
    }

    displayQuestion() {
        $("#question").text(this.currentQuestion.question);
        this.currentQuestion.answers.forEach((answer) => {
            var li = $("<li>");
            li.addClass("option");
            li.text(answer);
            $("#options").append(li);
            li.on("click", () => {
                this.guess(answer);
            });
        });
    }

    clearPreviousQuestion() {
        $("#question").text("");
        $("#options").empty();
    }

    startTimer() {
        $("#question-timer").text(this.timeRemaining); 
        this.timeRemaining--;
        this.intervalId = setInterval(() => {
            $("#question-timer").text(this.timeRemaining); 
            this.timeRemaining--;
            if(this.timeRemaining < 0) {
                this.resolveQuestion();
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
                          "https://media.giphy.com/media/b2RyjBa096Y6Y/giphy.gif"),
        new TriviaQuestion("Michael Scott organized a charity race to raise funds in order to cure which of the following diseases?", 
                          ["Lumbago", "Affluenza", "Tourette's Syndrome", "Rabies"], 
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

    game = new TriviaGame(questions, 15);
}

$(document).ready(function() {
    init();

    $("#start-btn").on("click", () => {
        game.start();
        $("#title-container").hide();
        $("#game-container").show();
    });

    $("#restart-btn").on("click", () => {
        init();
        $("#game-over-container").hide();
        game.start();
        $("#restart-btn").hide();
    });
});