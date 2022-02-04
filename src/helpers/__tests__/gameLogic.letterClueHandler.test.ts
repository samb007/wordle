import { LetterClue, letterClueHandler } from '../gameLogic';

describe('letterClueHandler', () => {
    it.each`
        letter | letterPosition | solution   | expectedClue
        ${'a'} | ${0}           | ${'apple'} | ${LetterClue.InWordAndCorrectPlace}
        ${'A'} | ${0}           | ${'apple'} | ${LetterClue.InWordAndCorrectPlace}
        ${'b'} | ${0}           | ${'apple'} | ${LetterClue.NotInWord}
        ${'p'} | ${0}           | ${'apple'} | ${LetterClue.InWord}
        ${'p'} | ${0}           | ${'apple'} | ${LetterClue.InWord}
    `(
        'should return the correct clue',
        ({
            letter,
            letterPosition,
            solution,
            expectedClue,
        }: {
            letter: string;
            letterPosition: number;
            solution: string;
            expectedClue: LetterClue;
        }) => {
            expect(
                letterClueHandler({ letter, letterPosition, solution })
            ).toEqual(expectedClue);
        }
    );
});
