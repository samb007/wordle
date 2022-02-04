import './App.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import React from 'react';
import { getInitialSolution, isWordAllowed } from './helpers/gameLogic';

type Input = {
    attempt: string;
};

function App() {
    const { register, handleSubmit } = useForm<Input>();
    const [solution, setSolution] = React.useState(getInitialSolution());
    const [solutionAttempts, setSolutionAttempts] = React.useState<string[]>([
        'raise',
        'waste',
    ]);
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

    console.log(getInitialSolution());

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-black">Solution: {solution}</h1>
            <div className="flex flex-col items-center justify-center">
                {solutionAttempts.map((solutionAttempt) => {
                    return (
                        <div className="flex flex-row m-4">
                            {solutionAttempt.split('').map((letter) => {
                                return (
                                    <div className="p-4 m-1 border">
                                        {letter.toUpperCase()}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center max-w-sm"
            >
                <input
                    className="focus:shadow-outline w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none"
                    type="text"
                    {...register('attempt', { required: true })}
                    pattern="[A-Za-z]{5}"
                />
                {errorState && (
                    <p data-testid="error" className="text-red-600">
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
