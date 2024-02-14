const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you I make up a number between 1-100 (inclusive) and you try to guess it."
  );
  //computer decides random number
  let secretNumber = Math.floor(Math.random() * 100) + 1;
  //user guesses number
  let guess = await ask("Guess a number! ");
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
      process.exit();
    }
  }
  //game end
  process.exit();
}
