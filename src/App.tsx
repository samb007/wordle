import './App.css';

import {
    LetterClue,
    SolutionAttemptsLetterClues,
    getSolution,
    isWordAllowed,
    letterClueHandler,
    letterClueHandler2,
} from './helpers/gameLogic';
import { SubmitHandler, useForm } from 'react-hook-form';

import Keyboard from './components/Keyboard';
import React from 'react';
import classnames from 'classnames';

type Input = {
    attempt: string;
};

type PageState = 'error' | 'success' | 'fail' | 'idle';

function App() {
    const { register, handleSubmit, reset, setValue, getValues, watch } =
        useForm<Input>();
    const [solution, setSolution] = React.useState(getSolution());
    const [solutionAttempts, setSolutionAttempts] = React.useState<string[]>(
        []
    );
    const [solutionAttemptsLetterClues, setSolutionAttemptsLetterClues] =
        React.useState<SolutionAttemptsLetterClues[]>([]);
    const [pageState, setPageState] = React.useState<PageState>('idle');

    const onLetterClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const attempt = getValues('attempt');

        if (attempt.length < 5) {
            setValue('attempt', `${attempt}${evt.currentTarget.innerText}`);
        }
    };

    const backspaceClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        const attempt = getValues('attempt');
        setValue('attempt', attempt.substring(0, attempt.length - 1));
    };

    const onSubmit: SubmitHandler<Input> = ({ attempt }) => {
        console.log({ attempt });
        const lowerCaseAttempt = attempt.toLowerCase();
        if (isWordAllowed(lowerCaseAttempt)) {
            setPageState('idle');
            setSolutionAttempts([...solutionAttempts, lowerCaseAttempt]);
        } else {
            console.log('error');
            setPageState('error');
        }
    };

    const resetGame = () => {
        setSolution(getSolution());
        setSolutionAttempts([]);
        setSolutionAttemptsLetterClues([]);
        setPageState('idle');
    };

    React.useEffect(() => {
        reset();
        if (solutionAttempts[solutionAttempts.length - 1] === solution) {
            setPageState('success');
        }

        if (solutionAttempts.length === 6 && solutionAttempts[5] !== solution) {
            setPageState('fail');
        }

        if (solutionAttempts.length > 0) {
            setSolutionAttemptsLetterClues([
                ...solutionAttemptsLetterClues,
                letterClueHandler2(
                    solutionAttempts[solutionAttempts.length - 1],
                    solution
                ),
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset, solution, solutionAttempts]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl">BURKLE</h1>
            {/* <h2 className="font-black">Solution: {solution}</h2> */}
            <div className="flex flex-col items-center justify-center">
                {solutionAttempts.map((solutionAttempt, i) => {
                    return (
                        <div
                            data-testid={`${solutionAttempt}-${i}`}
                            className="flex flex-row m-2"
                        >
                            {solutionAttempt.split('').map((letter, j) => {
                                return (
                                    <div
                                        data-testid={`${solutionAttempt}-${i}-${letter}-${j}`}
                                        className={classnames(
                                            'w-10 h-10 p-4 m-1 border flex justify-center items-center',
                                            {
                                                'bg-gray-500 text-white':
                                                    letterClueHandler(
                                                        solutionAttempt,
                                                        solution
                                                    )[j] ===
                                                    LetterClue.NotInWord,
                                                'bg-amber-400 text-white':
                                                    letterClueHandler(
                                                        solutionAttempt,
                                                        solution
                                                    )[j] === LetterClue.InWord,
                                                'bg-lime-600 text-white':
                                                    letterClueHandler(
                                                        solutionAttempt,
                                                        solution
                                                    )[j] ===
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

                <div className="flex flex-row m-2">
                    {watch('attempt') ? (
                        watch('attempt')
                            .split('')
                            .map((letter) => {
                                return (
                                    <div className="w-10 h-10 p-4 m-1 border flex justify-center items-center">
                                        {letter}
                                    </div>
                                );
                            })
                    ) : (
                        <React.Fragment>
                            <div className="w-10 h-10 p-4 m-1 border"></div>
                            <div className="w-10 h-10 p-4 m-1 border"></div>
                            <div className="w-10 h-10 p-4 m-1 border"></div>
                            <div className="w-10 h-10 p-4 m-1 border"></div>
                            <div className="w-10 h-10 p-4 m-1 border"></div>
                        </React.Fragment>
                    )}
                    {watch('attempt') &&
                        Array(5 - watch('attempt').length)
                            .fill(' ')
                            .map(() => {
                                return (
                                    <div className="w-10 h-10 p-4 m-1 border"></div>
                                );
                            })}
                </div>

                {6 - solutionAttempts.length > 0 &&
                    Array(5 - solutionAttempts.length)
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
                        })}
            </div>

            {pageState === 'idle' || pageState === 'error' ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center max-w-sm m-2"
                    autoComplete="off"
                >
                    <Keyboard
                        onClick={onLetterClick}
                        solutionAttemptsLetterClues={
                            solutionAttemptsLetterClues
                        }
                    />
                    <input
                        className="hidden"
                        aria-hidden="true"
                        type="text"
                        {...register('attempt', { required: true })}
                        pattern="[A-Za-z]{5}"
                        maxLength={5}
                    />

                    {pageState === 'error' && (
                        <p data-testid="error" className="mb-2 text-red-600">
                            Word is not in the list
                        </p>
                    )}

                    <div>
                        <input
                            data-testid="submit"
                            type="submit"
                            name="submit"
                            className="hover:bg-blue-700 focus:shadow-outline mr-4 px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer"
                        />

                        <button
                            className="hover:bg-red-700 focus:shadow-outline px-4 py-2 font-bold text-white bg-red-600 rounded cursor-pointer"
                            onClick={backspaceClick}
                        >
                            ⌫
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    {pageState === 'success' && (
                        <React.Fragment>
                            <p className="mb-2">
                                Aren't you clever?! You got it in{' '}
                                {solutionAttempts.length} go
                                {solutionAttempts.length > 1 ? 'es' : ''}!
                            </p>
                        </React.Fragment>
                    )}
                    {pageState === 'fail' && (
                        <div>
                            <p className="mb-2">
                                You are human garbage. The solution is:{' '}
                                {solution.toUpperCase()}
                            </p>
                        </div>
                    )}
                    <button
                        onClick={resetGame}
                        className="hover:bg-blue-700 focus:shadow-outline px-4 py-2 font-bold text-white bg-blue-500 rounded"
                    >
                        Reset game
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
