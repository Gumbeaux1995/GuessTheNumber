const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
//Timeout to guess number function
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//start of game
async function start() {
  //starting dialogue
  console.log(
    "Please think of a number between 1 and 100 (inclusive). I will try to guess it"
  );
  //low and high variables
  let lowNum = 1;
  let highNum = 100;
  //computer guess equation
  let guess = Math.round((highNum + lowNum) / 2);
  //timeout to guess number
  await timeout(5000);
  //Computer guess dialogue with user input
  let response = await ask("Is it... " + guess + "? (Y OR N) ");
  let answer = "Y";
  //correct reponse dialogue when user response = Y
  if (response === answer) {
    console.log("You Number was " + guess + "!");
    process.exit();
  }
  //higher or lower user input
  let range = await ask("Is it higher (H), or lower (L)? ");
  //while loop
  //while user input does not = Y
  while (response !== answer) {
    //If use user input does not = H
    if (range !== "H") {
      highNum = guess - 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask("Is it... " + guess + "? (Y OR N) ");
      range = await ask("Is it higher (H), or lower (L)? ");
      //if user input = H
    } else {
      lowNum = guess + 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask("Is it... " + guess + "? (Y OR N) ");
      if (response !== answer) {
      range = await ask("Is it higher (H), or lower (L)? ");
      }
      if (response === answer) {
        console.log("You Number was " + guess + "!");
      }
    }
  }
  //game end
  process.exit();
}
