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
        ${'taken'} | ${'acute'} | ${[LetterClue.InWord, LetterClue.InWord, LetterClue.NotInWord, LetterClue.InWord, LetterClue.NotInWord]}
        ${'hutch'} | ${'dutch'} | ${[LetterClue.NotInWord, LetterClue.InWordAndCorrectPlace, LetterClue.InWordAndCorrectPlace, LetterClue.InWordAndCorrectPlace, LetterClue.InWordAndCorrectPlace]}
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
            expect(letterClueHandler(attempt, solution)).toEqual(expectedClue);
        }
    );
});
