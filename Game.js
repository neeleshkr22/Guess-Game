const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const words = ['javascript', 'node', 'hangman', 'programming', 'developer', 'project', 'fullstack'];
const randomWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attemptsLeft = 5;

function revealInitialLetters(word, numLettersToReveal = 2) {
    const uniqueLetters = Array.from(new Set(word.split('')));
    for (let i = 0; i < numLettersToReveal && i < uniqueLetters.length; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueLetters.length);
        guessedLetters.push(uniqueLetters[randomIndex]);
        uniqueLetters.splice(randomIndex, 1);
    }
}

function displayWord() {
    return randomWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function promptUser() {
    console.log(`\nWord: ${displayWord()}`);
    console.log(`Attempts Left: ${attemptsLeft}`);
    rl.question('Guess the letter: ', (input) => {
        const letter = input.toLowerCase();
        if (letter.length > 1) {
            console.log("Please enter only one letter at a time.");
            promptUser();
            return;
        }

        if (guessedLetters.includes(letter)) {
            console.log(`You already guessed the letter "${letter}".`);
        } else {
            guessedLetters.push(letter);
            if (randomWord.includes(letter)) {
                console.log(`Good guess! The letter "${letter}" is in the word.`);
            } else {
                attemptsLeft--;
                console.log(`Wrong guess! The letter "${letter}" is not in the word.`);
            }
        }
        checkGameStatus();
    });
}

function checkGameStatus() {
    if (attemptsLeft === 0) {
        console.log(`Game over! The word was "${randomWord}".`);
        rl.close();
    } else if (!displayWord().includes('_')) {
        console.log(`Congratulations! You guessed the word: "${randomWord}".`);
        rl.close();
    } else {
        promptUser();
    }
}

revealInitialLetters(randomWord, 2);

console.log("Welcome to Game! Start guessing the word:");
promptUser();
