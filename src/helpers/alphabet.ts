import { LetterClue } from './gameLogic';

export const qwertyAlphabet = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const alphabetInitialState = {
    A: LetterClue.NotInWord,
    B: LetterClue.NotInWord,
    C: LetterClue.NotInWord,
    D: LetterClue.NotInWord,
    E: LetterClue.NotInWord,
    F: LetterClue.NotInWord,
    G: LetterClue.NotInWord,
    H: LetterClue.NotInWord,
    I: LetterClue.NotInWord,
    J: LetterClue.NotInWord,
    K: LetterClue.NotInWord,
    L: LetterClue.NotInWord,
    M: LetterClue.NotInWord,
    N: LetterClue.NotInWord,
    O: LetterClue.NotInWord,
    P: LetterClue.NotInWord,
    Q: LetterClue.NotInWord,
    R: LetterClue.NotInWord,
    S: LetterClue.NotInWord,
    T: LetterClue.NotInWord,
    U: LetterClue.NotInWord,
    V: LetterClue.NotInWord,
    W: LetterClue.NotInWord,
    X: LetterClue.NotInWord,
    Y: LetterClue.NotInWord,
    Z: LetterClue.NotInWord,
};

export const mapSolutionAttemptLettersToLetterClue = (
    solutionAttempts: string[]
) => {};
