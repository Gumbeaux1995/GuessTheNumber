const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function start() {
  console.log("Lets play a number guessing game!");
  let whoGuesses = await ask(
    "Who should be guessing the number? Type (h) for human or (c) for computer "
  );
  while (whoGuesses !== "h" || "c") {
    if (whoGuesses === "h" || "c") break;
    whoGuesses = await ask(
      "Please type a valid response, (h) for human or (c) for computer "
    );
  }
  if (whoGuesses === "c") {
    computerGuessing();
  } else {
    humanGuessing();
  }
}

start();

//Timeout to guess number function
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//start of computer guessing game
async function computerGuessing() {
  //starting dialogue
  console.log(
    "Please think of a whole number (No decimals or fractions) between 1 and 100 (inclusive). I will try to guess it"
  );
  //low and high variables
  let lowNum = 1;
  let highNum = 99;
  //computer guess equation
  let guess = Math.round((highNum + lowNum) / 2);
  //timeout to guess number
  await timeout(5000);
  //Computer guess dialogue with user input
  let response = await ask(
    "Is it... " + guess + "? Type (y) for yes, OR (n) for no "
  );
  let answer = "y";
  //correct reponse dialogue when user response = y
  if (response.toLowerCase() === answer) {
    console.log("You Number was " + guess + "!");
    let restartGame = await ask(
      " Would you like to play again? Type (y) for yes, or Type (n) for no. "
    );
    if (restartGame.toLowerCase() === "n") {
      process.exit();
    } else {
      start();
    }
  }
  //higher or lower user input
  let range = await ask("Is it higher? Type (h). Or lower? Type (l)? ");
  //while loop
  //while user input does not = y
  while (response.toLowerCase() !== answer) {
    //If use user input does not = h
    if (range.toLowerCase() !== "h") {
      highNum = guess - 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask(
        "Is it... " + guess + "? Type (y) for yes, OR Type (n) for no "
      );
      if (response.toLowerCase() !== answer) {
        range = await ask("Is it higher? Type (h). Or lower? Type (l). ");
      }
      //did not use else because of .toLowercase method to reduce bad user input such as caps lock
      if (response.toLowerCase() === answer) {
        console.log("You Number was " + guess + "!");
      }
      //if user input = h
    } else if (range.toLowerCase() === "h") {
      lowNum = guess + 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask(
        "Is it... " + guess + "? Type (y) for yes, OR Type n for (no) "
      );
      if (response.toLowerCase() !== answer) {
        range = await ask("Is it higher? Type (h). Or lower? Type (l). ");
      }
      if (response.toLowerCase() === answer) {
        console.log("You Number was " + guess + "!");
        let restartGame = await ask(
          " Would you like to play again? Type (y) for yes, or Type (n) for no. "
        );
        if (restartGame.toLowerCase() === "n") {
          process.exit();
        } else {
          start();
        }
      }
    }
  }
}
//start of human gueesing game
async function humanGuessing() {
  console.log(
    "Let's play a game where you I make up a random number between a range you define (inclusive. No decimals or fractions.) and you try to guess it."
  );
  //user determines min and max numbers of range
  let max = await ask("What should the highest number possible be? ");
  let min = await ask("What should the lowest number possible be? ");
  //computer decides random number within range
  let secretNumber = Math.floor(Math.random() * (max - min + 1) + min);
  //user guesses number
  let guess = await ask("Guess my number! ");
  //computer shows user guess
  console.log("GUESS: ", guess);
  //while loop
  while (secretNumber !== guess) {
    if (guess < secretNumber) {
      guess = await ask("Sorry too low. Guess higher. ");
    } else if (guess > secretNumber) {
      guess = await ask("Sorry too high. Guess lower. ");
    } else {
      console.log("Congratulations! You guessed it!");
      let restartGame = await ask(
        " Would you like to play again? Type (y) for yes, or Type (n) for no. "
      );
      if (restartGame.toLowerCase() === "n") {
        process.exit();
      } else {
        start();
      }
    }
  }
  //game end
  process.exit();
}
