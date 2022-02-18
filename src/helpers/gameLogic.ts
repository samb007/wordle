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
): LetterClue[] {
    const lowerCaseAttempt = attempt.toLowerCase();
    let letterClue: LetterClue[] = [];
    let attemptLetters = lowerCaseAttempt.split('');
    let solutionLetters = solution.split('');

    // replace InWordAndCorrectPlace letters from both arrays with 'placeholder' to retain the leftover letter's possitions
    // then search for InWord and do the same the letters left in attempt array. the remaining letters are NotInWord
    attemptLetters.forEach((letter, i) => {
        if (letter === solution[i]) {
            letterClue[i] = LetterClue.InWordAndCorrectPlace;
            attemptLetters.splice(i, 1, 'placeholder');
            solutionLetters.splice(i, 1, 'placeholder');
        }
    });

    attemptLetters.forEach((letter, i) => {
        if (letterClue[i] !== LetterClue.InWordAndCorrectPlace) {
            if (solutionLetters.indexOf(letter) > -1) {
                letterClue[i] = LetterClue.InWord;
                attemptLetters.splice(i, 1, 'placeholder');
                solutionLetters.splice(
                    solutionLetters.indexOf(letter),
                    1,
                    'placeholder'
                );
                return;
            }

            letterClue[i] = LetterClue.NotInWord;
        }
    });

    return letterClue;
}

export type SolutionAttemptsLetterClues = Record<string, LetterClue>[];

export function letterClueHandler2(
    attempt: string,
    solution: string
): SolutionAttemptsLetterClues {
    const lowerCaseAttempt = attempt.toLowerCase();
    let letterClue: SolutionAttemptsLetterClues = [];
    let attemptLetters = lowerCaseAttempt.split('');
    let solutionLetters = solution.split('');

    // replace InWordAndCorrectPlace letters from both arrays with 'placeholder' to retain the leftover letter's possitions
    // then search for InWord and do the same the letters left in attempt array. the remaining letters are NotInWord
    attemptLetters.forEach((letter, i) => {
        if (letter === solution[i]) {
            letterClue[i] = { [letter]: LetterClue.InWordAndCorrectPlace };
            attemptLetters.splice(i, 1, 'placeholder');
            solutionLetters.splice(i, 1, 'placeholder');
        }
    });

    attemptLetters.forEach((letter, i) => {
        if (!letterClue[i]) {
            if (solutionLetters.indexOf(letter) > -1) {
                letterClue[i] = { [letter]: LetterClue.InWord };
                attemptLetters.splice(i, 1, 'placeholder');
                solutionLetters.splice(
                    solutionLetters.indexOf(letter),
                    1,
                    'placeholder'
                );
                return;
            }

            letterClue[i] = { [letter]: LetterClue.NotInWord };
        }
    });

    return letterClue;
}
