import * as React from 'react';

import Letter from './Letter';
import { qwertyAlphabet } from '../helpers/alphabet';

interface AlphabetProps {
    onClick: () => void;
}

const Alphabet: React.FC<
    AlphabetProps & React.HTMLProps<HTMLButtonElement>
> = ({ onClick }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {qwertyAlphabet.map((row) => {
                return (
                    <div className="flex flex-row justify-center items-center">
                        {row.map((letter) => {
                            return (
                                <Letter
                                    letter={letter}
                                    onClick={onClick}
                                    backgroundColour=""
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
