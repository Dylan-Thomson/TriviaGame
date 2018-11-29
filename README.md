# TriviaGame
Player answers a series of timed "The Office" themed trivia questions and is given a score at the end of the game. In between questions, the game displays the correct answer and an image for a few seconds.

This project was created as a homework assignment for the Case Western Web Development Bootcamp.

## TriviaQuestion class
This class represents our trivia questions. A question is created by calling the constructor `new TriviaQuestion(question, answers, indexOfAnswer, imagePath)`.

The `question` paramater is a String representing the question itself "How are you today?"

The `answers` paramater is an array containing Strings that represent the possible answers to the question ["good", "okay", "bad"]

`indexOfAnswer` is a number matching the index of the correct answer to the question.

`imagePath` is a String containing the path to the image that is displayed after the question is answered or the user runs out of time.

The class contains only one method `isGuessCorrect(guess)`. This function gets the index of `guess` in `answers` and sees if it matches `indexOfAnswer`.

## TriviaGame Class
This class handles all of the game logic. It is created by calling the constructor like `new TriviaGame(questions, time)`.

The `questions` parameter is an array of `TriviaQuestion` objects, and `time` is the number of seconds the user has to answer each question.

Calling the `start()` method will start running the timer and the TriviaGame instance handles all of the logic and DOM manipulation from there. Note that when the game is finished, a new TriviaGame object will have to be created in order to play again.

`start()` begins the timer and calls `nextQuestion()` to get the first question.

`guess()` is called by event listeners attached to the multiple choice answers on the page. It determines if the given guess is correct, and passes that boolean value to `resolveQuestion()`. 

`resolveQuestion()` updates counts for correct, incorrect, and unanswered questions and displays the screen in between questions for a few seconds. It then restarts the timer and calls `nextQuestion()`.

`nextQuestion()` will try to get the next question, and call `displayQuestion()`. If there are no more questions it calls `gameOver()`.

`gameOver()` simply displays the player's statistics for the game and a button to restart the game.

`displayQuestion()` displays the current question on the screen, as well as the possible answers. It attaches event listeners to these answers which call `guess()` when clicked.

`startTimer()` uses `setInterval()` to update and display the time remaining to answer each question. If the player runs out of time, it calls `resolveQuestion()` without passing a parameter.

`stopTimer()` uses `clearInterval()` to stop the current timer and is called by `resolveQuestion()`.

`resetTimer()` simply sets `timeRemaining` to the original `time`. It is also called by `resolveQuestion()`.