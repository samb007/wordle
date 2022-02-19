import {
    KeyboardLetterClue,
    keyboardInitialState,
    keyboardLetterClueHandler,
} from '../keyboard';
import { LetterClue, SolutionAttemptsLetterClues } from '../gameLogic';

describe('keyboardLetterClueHandler', () => {
    const awakeLetterClue = [
        { a: LetterClue.InWordAndCorrectPlace },
        { w: LetterClue.NotInWord },
        { a: LetterClue.NotInWord },
        { k: LetterClue.NotInWord },
        { e: LetterClue.InWordAndCorrectPlace },
    ];
    const boobyLetterClue = [
        { b: LetterClue.InWord },
        { o: LetterClue.InWordAndCorrectPlace },
        { o: LetterClue.NotInWord },
        { b: LetterClue.InWordAndCorrectPlace },
        { y: LetterClue.InWordAndCorrectPlace },
    ];

    it.each`
        solutionAttemptsLetterClues           | expectedKeyboardLetterClue
        ${[]}                                 | ${{ ...keyboardInitialState }}
        ${[awakeLetterClue]}                  | ${{ ...keyboardInitialState, a: LetterClue.InWordAndCorrectPlace, w: LetterClue.NotInWord, k: LetterClue.NotInWord, e: LetterClue.InWordAndCorrectPlace }}
        ${[awakeLetterClue, boobyLetterClue]} | ${{ ...keyboardInitialState, a: LetterClue.InWordAndCorrectPlace, w: LetterClue.NotInWord, k: LetterClue.NotInWord, e: LetterClue.InWordAndCorrectPlace, b: LetterClue.InWordAndCorrectPlace, o: LetterClue.InWordAndCorrectPlace, y: LetterClue.InWordAndCorrectPlace }}
    `(
        'should return the correct alphabet letter clue given a SolutionAttemptsLetterClue',
        ({
            solutionAttemptsLetterClues,
            expectedKeyboardLetterClue,
        }: {
            solutionAttemptsLetterClues: SolutionAttemptsLetterClues[];
            expectedKeyboardLetterClue: KeyboardLetterClue;
        }) => {
            expect(
                keyboardLetterClueHandler(solutionAttemptsLetterClues)
            ).toEqual(expectedKeyboardLetterClue);
        }
    );
});
