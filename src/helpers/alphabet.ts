import { LetterClue, SolutionAttemptsLetterClues } from './gameLogic';

export const qwertyAlphabet = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export const alphabetInitialState: Record<string, LetterClue | undefined> = {
    A: undefined,
    B: undefined,
    C: undefined,
    D: undefined,
    E: undefined,
    F: undefined,
    G: undefined,
    H: undefined,
    I: undefined,
    J: undefined,
    K: undefined,
    L: undefined,
    M: undefined,
    N: undefined,
    O: undefined,
    P: undefined,
    Q: undefined,
    R: undefined,
    S: undefined,
    T: undefined,
    U: undefined,
    V: undefined,
    W: undefined,
    X: undefined,
    Y: undefined,
    Z: undefined,
};

export const alphabetLetterClueHandler = (
    solutionAttemptsLetterClues: SolutionAttemptsLetterClues[]
) => {
    let alphabetLetterClue = alphabetInitialState;

    if (solutionAttemptsLetterClues.length <= 0) {
        return alphabetLetterClue;
    }

    Object.keys(alphabetLetterClue).forEach((letter) => {
        if (alphabetLetterClue[letter] === undefined) {
            solutionAttemptsLetterClues.forEach(
                (solutionAttemptsLetterClue) => {
                    solutionAttemptsLetterClue.forEach((letterClue) => {
                        if (letterClue[letter] !== undefined) {
                            alphabetLetterClue = {
                                ...alphabetLetterClue,
                                [letter]: letterClue[letter],
                            };
                        }
                    });
                }
            );
        }
    });

    return alphabetLetterClue;
};

export const letterBackgroundColourHandler = (
    letter: string,
    clueData: Record<string, LetterClue | undefined>
) => {
    if (clueData[letter] === LetterClue.InWordAndCorrectPlace) {
        return 'bg-lime-600 text-white';
    }

    if (clueData[letter] === LetterClue.InWord) {
        return 'bg-amber-400 text-white';
    }

    if (clueData[letter] === LetterClue.NotInWord) {
        return 'bg-gray-500 text-white';
    }

    return '';
};
