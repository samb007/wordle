import { LetterClue, letterClueHandler } from '../gameLogic';

describe('letterClueHandler', () => {
    it.each`
        attempt    | solution   | expectedClue
        ${'awake'} | ${'apple'} | ${[LetterClue.InWordAndCorrectPlace, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.InWordAndCorrectPlace]}
        ${'Awake'} | ${'apple'} | ${[LetterClue.InWordAndCorrectPlace, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.InWordAndCorrectPlace]}
        ${'daddy'} | ${'death'} | ${[LetterClue.InWordAndCorrectPlace, LetterClue.InWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord]}
        ${'booby'} | ${'apple'} | ${[LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord]}
        ${'pound'} | ${'apple'} | ${[LetterClue.InWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord, LetterClue.NotInWord]}
        ${'booby'} | ${'spoon'} | ${[LetterClue.NotInWord, LetterClue.InWord, LetterClue.InWordAndCorrectPlace, LetterClue.NotInWord, LetterClue.NotInWord]}
        ${'booby'} | ${'robot'} | ${[LetterClue.InWord, LetterClue.InWordAndCorrectPlace, LetterClue.InWord, LetterClue.NotInWord, LetterClue.NotInWord]}
    `(
        'should return the correct clue given the attempt: $attempt and the solution: $solution',
        ({
            attempt,
            solution,
            expectedClue,
        }: {
            attempt: string;
            solution: string;
            expectedClue: LetterClue[];
        }) => {
            console.log({
                actual: letterClueHandler(attempt, solution),
                expectedClue,
            });
            expect(letterClueHandler(attempt, solution)).toEqual(expectedClue);
        }
    );
});
