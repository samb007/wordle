import * as React from 'react';

import {
    alphabetInitialState,
    alphabetLetterClueHandler,
    letterBackgroundColourHandler,
    qwertyAlphabet,
} from '../helpers/alphabet';

import Letter from './Letter';
import { SolutionAttemptsLetterClues } from '../helpers/gameLogic';

interface AlphabetProps {
    onClick: () => void;
    solutionAttemptsLetterClues: SolutionAttemptsLetterClues[];
}

const Alphabet: React.FC<
    AlphabetProps & React.HTMLProps<HTMLButtonElement>
> = ({ onClick, solutionAttemptsLetterClues }) => {
    const [alphabet, setAlphabet] = React.useState(alphabetInitialState);

    React.useEffect(() => {
        setAlphabet(alphabetLetterClueHandler(solutionAttemptsLetterClues));
        console.log({ alphabet });
    }, [alphabet, solutionAttemptsLetterClues]);

    return (
        <div className="flex flex-col justify-center items-center">
            {qwertyAlphabet.map((row) => {
                return (
                    <div className="flex flex-row justify-center items-center">
                        {row.map((letter) => {
                            console.log(
                                letterBackgroundColourHandler(letter, alphabet),
                                { alphabet }
                            );
                            return (
                                <Letter
                                    letter={letter}
                                    onClick={onClick}
                                    backgroundColour={letterBackgroundColourHandler(
                                        letter,
                                        alphabet
                                    )}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Alphabet;
