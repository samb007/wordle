import {
    LetterClue,
    SolutionAttemptsLetterClues,
    letterClueHandler2,
} from '../gameLogic';

describe('letterClueHandler', () => {
    it.each`
        attempt    | solution   | expectedClue
        ${'awake'} | ${'apple'} | ${[{ a: LetterClue.InWordAndCorrectPlace }, { w: LetterClue.NotInWord }, { a: LetterClue.NotInWord }, { k: LetterClue.NotInWord }, { e: LetterClue.InWordAndCorrectPlace }]}
        ${'Awake'} | ${'apple'} | ${[{ a: LetterClue.InWordAndCorrectPlace }, { w: LetterClue.NotInWord }, { a: LetterClue.NotInWord }, { k: LetterClue.NotInWord }, { e: LetterClue.InWordAndCorrectPlace }]}
        ${'daddy'} | ${'death'} | ${[{ d: LetterClue.InWordAndCorrectPlace }, { a: LetterClue.InWord }, { d: LetterClue.NotInWord }, { d: LetterClue.NotInWord }, { y: LetterClue.NotInWord }]}
        ${'booby'} | ${'apple'} | ${[{ b: LetterClue.NotInWord }, { o: LetterClue.NotInWord }, { o: LetterClue.NotInWord }, { b: LetterClue.NotInWord }, { y: LetterClue.NotInWord }]}
        ${'pound'} | ${'apple'} | ${[{ p: LetterClue.InWord }, { o: LetterClue.NotInWord }, { u: LetterClue.NotInWord }, { n: LetterClue.NotInWord }, { d: LetterClue.NotInWord }]}
        ${'booby'} | ${'spoon'} | ${[{ b: LetterClue.NotInWord }, { o: LetterClue.InWord }, { o: LetterClue.InWordAndCorrectPlace }, { b: LetterClue.NotInWord }, { y: LetterClue.NotInWord }]}
        ${'booby'} | ${'robot'} | ${[{ b: LetterClue.InWord }, { o: LetterClue.InWordAndCorrectPlace }, { o: LetterClue.InWord }, { b: LetterClue.NotInWord }, { y: LetterClue.NotInWord }]}
        ${'taken'} | ${'acute'} | ${[{ t: LetterClue.InWord }, { a: LetterClue.InWord }, { k: LetterClue.NotInWord }, { e: LetterClue.InWord }, { n: LetterClue.NotInWord }]}
        ${'hutch'} | ${'dutch'} | ${[{ h: LetterClue.NotInWord }, { u: LetterClue.InWordAndCorrectPlace }, { t: LetterClue.InWordAndCorrectPlace }, { c: LetterClue.InWordAndCorrectPlace }, { h: LetterClue.InWordAndCorrectPlace }]}
    `(
        'should return the correct clue given the attempt: $attempt and the solution: $solution',
        ({
            attempt,
            solution,
            expectedClue,
        }: {
            attempt: string;
            solution: string;
            expectedClue: SolutionAttemptsLetterClues;
        }) => {
            expect(letterClueHandler2(attempt, solution)).toEqual(expectedClue);
        }
    );
});
