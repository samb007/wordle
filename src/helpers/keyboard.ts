import { LetterClue, SolutionAttemptsLetterClues } from './gameLogic';

export const qwertyKeyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

export type KeyboardLetterClue = Record<string, LetterClue | undefined>;

export const keyboardInitialState: KeyboardLetterClue = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
    g: undefined,
    h: undefined,
    i: undefined,
    j: undefined,
    k: undefined,
    l: undefined,
    m: undefined,
    n: undefined,
    o: undefined,
    p: undefined,
    q: undefined,
    r: undefined,
    s: undefined,
    t: undefined,
    u: undefined,
    v: undefined,
    w: undefined,
    x: undefined,
    y: undefined,
    z: undefined,
};

export const keyboardLetterClueHandler = (
    solutionAttemptsLetterClues: SolutionAttemptsLetterClues[]
) => {
    let keyboardLetterClue = keyboardInitialState;

    if (solutionAttemptsLetterClues.length <= 0) {
        return keyboardLetterClue;
    }

    Object.keys(keyboardLetterClue).forEach((letter) => {
        solutionAttemptsLetterClues.forEach((solutionAttemptsLetterClue) => {
            solutionAttemptsLetterClue.forEach((letterClue) => {
                if (letterClue[letter] === LetterClue.InWordAndCorrectPlace) {
                    keyboardLetterClue = {
                        ...keyboardLetterClue,
                        [letter]: letterClue[letter],
                    };
                    return;
                }

                if (
                    keyboardLetterClue[letter] === LetterClue.NotInWord &&
                    letterClue[letter] === LetterClue.InWord
                ) {
                    keyboardLetterClue = {
                        ...keyboardLetterClue,
                        [letter]: letterClue[letter],
                    };
                    return;
                }

                if (keyboardLetterClue[letter] === undefined) {
                    keyboardLetterClue = {
                        ...keyboardLetterClue,
                        [letter]: letterClue[letter],
                    };
                    return;
                }

                return;
            });
        });
    });

    return keyboardLetterClue;
};

export const letterBackgroundColourHandler = (
    letter: string,
    clueData: KeyboardLetterClue
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
