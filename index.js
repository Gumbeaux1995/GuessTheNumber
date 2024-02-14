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
  let response = await ask("Is it... " + guess + "? (y OR n) ");
  let answer = "y";
  //correct reponse dialogue when user response = y
  if (response.toLowerCase() === answer) {
    console.log("You Number was " + guess + "!");
    process.exit();
  }
  //higher or lower user input
  let range = await ask("Is it higher (h), or lower (l)? ");
  //while loop
  //while user input does not = y
  while (response.toLowerCase() !== answer) {
    //If use user input does not = h
    if (range.toLowerCase() !== "h") {
      highNum = guess - 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask("Is it... " + guess + "? (y OR n) ");
      if (response.toLowerCase() !== answer) {
        range = await ask("Is it higher (h), or lower (l)? ");
      }
      if (response.toLowerCase() === answer) {
        console.log("You Number was " + guess + "!");
      }
      //if user input = h
    } else if (range.toLowerCase() === "h") {
      lowNum = guess + 1;
      guess = Math.round((highNum + lowNum) / 2);
      response = await ask("Is it... " + guess + "? (y OR n) ");
      if (response.toLowerCase() !== answer) {
        range = await ask("Is it higher (h), or lower (l)? ");
      }
      if (response.toLowerCase() === answer) {
        console.log("You Number was " + guess + "!");
      }
    }
  }
  //game end
  process.exit();
}
