import * as React from 'react';

import classnames from 'classnames';

export interface LetterProps {
    letter: string;
    onClick: () => void;
    backgroundColour: string;
}

const Letter: React.FC<LetterProps & React.HTMLProps<HTMLButtonElement>> = ({
    letter,
    onClick,
    backgroundColour,
}) => {
    return (
        <button
            className={classnames('m-1 p-1', backgroundColour)}
            onClick={onClick}
        >
            {letter}
        </button>
    );
};

export default Letter;
