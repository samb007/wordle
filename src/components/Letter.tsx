import * as React from 'react';

import classnames from 'classnames';

export interface LetterProps {
    letter?: string;
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    backgroundColour?: string;
}

// TODO: responsive letter sizes
const Letter: React.FC<LetterProps & React.HTMLProps<HTMLButtonElement>> = ({
    letter,
    onClick,
    backgroundColour,
}) => {
    return (
        <button
            className={classnames(
                'mx-1 my-2 py-3 border uppercase rounded w-7 px-2 flex justify-center sm:w-10',
                backgroundColour
            )}
            onClick={(evt) => onClick(evt)}
        >
            {letter}
        </button>
    );
};

export default Letter;
