const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you I make up a number and you try to guess it.")
  let secretNumber = Math.floor(Math.random() * 100);
  // Now try and complete the program.
  let guess = await ask("Guess a number! ")
  console.log("GUESS: ", guess)
  while(secretNumber !== guess) {
    if(guess < secretNumber) {
    guess = await ask("Sorry too low. Guess higher. ")
    } else if(guess > secretNumber) {
        guess = await ask("Sorry too high. Guess lower. ")
    } else {
        console.log("Congratulations! You guessed it!")
        process.exit();
    }
}
  process.exit();
}