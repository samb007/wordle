import { allWords, answerWords } from '../words';

export function getSolution() {
    return answerWords[Math.floor(Math.random() * answerWords.length)];
}

export function isWordAllowed(word: string): boolean {
    if (allWords.includes(word.toLowerCase())) {
        return true;
    }
    return false;
}

export enum LetterClue {
    NotInWord,
    InWord,
    InWordAndCorrectPlace,
}

export function letterClueHandler(
    attempt: string,
    solution: string
): (LetterClue | undefined)[] {
    const lowerCaseAttempt = attempt.toLowerCase();
    let letterClue: (LetterClue | undefined)[] = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ];
    const attemptLetters = lowerCaseAttempt.split('');
    let solutionLetters = solution.split('');

    // replace InWordAndCorrectPlace letters from both arrays with 'qx' to retain the leftover letter's possitions
    // then search for InWord and do the same the letters left in attempt array. the remaining letters are NotInWord
    attemptLetters.forEach((letter, i) => {
        if (letter === solution[i]) {
            attemptLetters.splice(i, 1, 'qx');
            solutionLetters.splice(i, 1, 'qx');
            letterClue[i] = LetterClue.InWordAndCorrectPlace;

            return;
        }

        if (solutionLetters.indexOf(letter) > -1) {
            letterClue[i] = LetterClue.InWord;
            attemptLetters.splice(i, 1, 'qx');
            solutionLetters.splice(i, 1, 'qx');
            return;
        }

        letterClue[i] = LetterClue.NotInWord;
    });

    return letterClue;
}
