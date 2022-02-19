import * as React from 'react';

import {
    keyboardInitialState,
    keyboardLetterClueHandler,
    letterBackgroundColourHandler,
    qwertyKeyboard,
} from '../helpers/keyboard';

import Letter from './Letter';
import { SolutionAttemptsLetterClues } from '../helpers/gameLogic';

interface KeyboardProps {
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    solutionAttemptsLetterClues: SolutionAttemptsLetterClues[];
}

const Keyboard: React.FC<
    KeyboardProps & React.HTMLProps<HTMLButtonElement>
> = ({ onClick, solutionAttemptsLetterClues }) => {
    const [keyboard, setKeyboard] = React.useState(keyboardInitialState);

    React.useEffect(() => {
        setKeyboard(keyboardLetterClueHandler(solutionAttemptsLetterClues));
    }, [solutionAttemptsLetterClues]);

    return (
        <div className="flex flex-col justify-center items-center w-64">
            {qwertyKeyboard.map((row) => {
                return (
                    <div className="flex flex-row justify-center items-center flex-1 ">
                        {row.map((letter) => {
                            return (
                                <Letter
                                    letter={letter}
                                    onClick={(evt) => onClick(evt)}
                                    backgroundColour={letterBackgroundColourHandler(
                                        letter,
                                        keyboard
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

export default Keyboard;
