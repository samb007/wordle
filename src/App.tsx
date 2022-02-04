import './App.css';

import {
    LetterClue,
    getSolution,
    isWordAllowed,
    letterClueHandler,
} from './helpers/gameLogic';
import { SubmitHandler, useForm } from 'react-hook-form';

import React from 'react';
import classnames from 'classnames';

type Input = {
    attempt: string;
};

function App() {
    const { register, handleSubmit, reset } = useForm<Input>();
    const [solution, setSolution] = React.useState(getSolution());
    const [solutionAttempts, setSolutionAttempts] = React.useState<string[]>(
        []
    );
    const [errorState, setErrorState] = React.useState(false);

    const onSubmit: SubmitHandler<Input> = ({ attempt }) => {
        if (isWordAllowed(attempt)) {
            setErrorState(false);
            setSolutionAttempts([...solutionAttempts, attempt]);
        } else {
            setErrorState(true);
            console.log(attempt);
        }
    };

    React.useEffect(() => {
        reset();
        if (solutionAttempts[solutionAttempts.length - 1] === solution) {
            window.alert(
                `Aren't you clever! You got it in ${solutionAttempts.length} goes!`
            );
            setSolution(getSolution());
            setSolutionAttempts([]);
        }
    }, [reset, solution, solutionAttempts]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl">BURKLE</h1>
            {/* <h2 className="font-black">Solution: {solution}</h2> */}
            <div className="flex flex-col items-center justify-center">
                {solutionAttempts.map((solutionAttempt, i) => {
                    return (
                        <div className="flex flex-row m-2">
                            {solutionAttempt.split('').map((letter, j) => {
                                return (
                                    <div
                                        data-testid={`${solutionAttempt}-${i}-${letter}-${j}`}
                                        className={classnames(
                                            'w-10 h-10 p-4 m-1 border flex justify-center items-center',
                                            {
                                                'bg-gray-500 text-white':
                                                    letterClueHandler({
                                                        letter,
                                                        letterPosition: j,
                                                        solution,
                                                    }) === LetterClue.NotInWord,
                                                'bg-amber-400 text-white':
                                                    letterClueHandler({
                                                        letter,
                                                        letterPosition: j,
                                                        solution,
                                                    }) === LetterClue.InWord,
                                                'bg-lime-600 text-white':
                                                    letterClueHandler({
                                                        letter,
                                                        letterPosition: j,
                                                        solution,
                                                    }) ===
                                                    LetterClue.InWordAndCorrectPlace,
                                            }
                                        )}
                                    >
                                        {letter.toUpperCase()}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                {6 - solutionAttempts.length > -1 ? (
                    Array(6 - solutionAttempts.length)
                        .fill(' ')
                        .map(() => {
                            return (
                                <div className="flex flex-row m-2">
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                </div>
                            );
                        })
                ) : (
                    <div>
                        <p className="mb-2">
                            You are human garbage. The solution is:{' '}
                            {solution.toUpperCase()}
                        </p>
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center max-w-sm m-2"
            >
                <input
                    className="focus:shadow-outline w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none"
                    type="text"
                    {...register('attempt', { required: true })}
                    pattern="[A-Za-z]{5}"
                />
                {errorState && (
                    <p data-testid="error" className="mb-2 text-red-600">
                        Word is not in the list
                    </p>
                )}
                <input
                    data-testid="submit"
                    type="submit"
                    name="submit"
                    className="hover:bg-blue-700 focus:shadow-outline px-4 py-2 font-bold text-white bg-blue-500 rounded"
                />
            </form>
        </div>
    );
}

export default App;
