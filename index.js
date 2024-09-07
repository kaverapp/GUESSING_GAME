const readline = require("readline");

import chalk from "chalk";

let { red: danger, green: succ, yellow: warning, cyan: prompt } = chalk;

//to read user prompts
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//attempts
const MAX_ATTEMPTS_EASY = 10;
const MAX_ATTEMPTS_MID = 5;
const MAX_ATTEMPTS_HARD = 3;

//random number generator-- the main engine
let generateRandomNumber = () => {
    return Math.floor(Math.random() * 50) + 1;
}

//logical part
let getEasy = (attempt) => {
    let rn = generateRandomNumber();

    const askQuestion = (remainingAttempts) => {
        if (remainingAttempts > 0) {
            rl.question(prompt("guess the number:"), (guess) => {
                let pG = parseInt(guess);
                if (pG === rn) {
                    console.log(succ("yay u won"));
                    startGame();
                } else if (pG > rn) {
                    console.log(warning("too high"));
                    askQuestion(remainingAttempts - 1);

                } else if (pG < rn) {
                    console.log(warning("too low"));
                    askQuestion(remainingAttempts - 1);

                }

            })

        } else {
            console.log(danger(`Sorry, you've used all your attempts. The number was: ${rn}`));
            rl.question("do u wanna continue in s or no", (answer) => {
                if (answer == "s") {
                    startGame();
                } else if (answer == "n") {
                    rl.close();

                }
            })
        }
    }
    askQuestion(attempt);
}

//the main starter
function startGame() {
    console.log(("levels easy,mid,hard\n"));

    rl.question(prompt("enter the lvl : "), (answer) => {
        let attempt;


        if (answer == "easy") {
            attempt = MAX_ATTEMPTS_EASY;
            getEasy(attempt)
        } else if (answer == "mid") {
            attempt = MAX_ATTEMPTS_MID;
            getEasy(attempt)
        }
        else if (answer == "hard") {
            attempt = MAX_ATTEMPTS_HARD;
            getEasy(attempt)
        }
        else {
            console.log(danger("Invalid level. Please choose easy, mid, or hard."));
            rl.question("do u wanna continue in s or no", (answer) => {
                if (answer == "s") {
                    startGame();
                } else if (answer == "n") {
                    rl.close();
                }
            })

        }
    });
};

startGame()
