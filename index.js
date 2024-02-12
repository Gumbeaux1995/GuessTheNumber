const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function start() {
  console.log(
    "Please think of a number between 1 and 100 (inclusive). I will try to guess it"
  );
  let guess = Math.floor(Math.random() * 100);
  await timeout(5000);

  let response = await ask("Is it... " + guess + "? (Y OR N) ");
  let answer = "Y";

  if (response === answer) {
    console.log("You Number was " + guess + "!");
    process.exit();
  }

  let range = await ask("Is it higher (H), or lower (L)? ");
  while (response !== answer) {
    if (range !== "H") {
      var highNum = Math.floor(guess);
    } else if (range !== "L") {
      var lowNum = Math.ceil(guess);
    } else {
      console.log("You Number was " + guess + "!");
    }
  }

  process.exit();
}
