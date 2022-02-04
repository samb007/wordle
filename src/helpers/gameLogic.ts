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

export function letterClueHandler({
    letter,
    letterPosition,
    solution,
}: {
    letter: string;
    letterPosition: number;
    solution: string;
}): LetterClue {
    const lowerCaseLetter = letter.toLowerCase();

    if (lowerCaseLetter === solution[letterPosition]) {
        return LetterClue.InWordAndCorrectPlace;
    }

    if (solution.indexOf(lowerCaseLetter) > -1) {
        return LetterClue.InWord;
    }

    return LetterClue.NotInWord;
}
