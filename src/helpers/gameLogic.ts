import { allWords, answerWords } from '../words';

export function getInitialSolution() {
    return answerWords[Math.floor(Math.random() * answerWords.length)];
}

export function isWordAllowed(word: string): boolean {
    if (allWords.includes(word.toLowerCase())) {
        return true;
    }
    return false;
}
