import React from 'react';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { answer } from './helpers/gameLogic';

type Input = {
	attempt: string;
};

function App() {
	const { register, handleSubmit } = useForm<Input>();
	const [solutionAttempts, setSolutionAttempts] = React.useState<string[]>([
		'raise',
		'waste',
	]);

	const onSubmit: SubmitHandler<Input> = ({ attempt }) => {
		setSolutionAttempts([...solutionAttempts, attempt]);
		console.log(attempt);
	};

	console.log(answer());

	return (
		<div>
			<div className="flex justify-center flex-col items-center">
				{solutionAttempts.map((solutionAttempt) => {
					return (
						<div className="m-4 flex flex-row">
							{solutionAttempt.split('').map((letter) => {
								return <div className="p-4 m-1 border">{letter}</div>;
							})}
						</div>
					);
				})}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					{...register('attempt', { required: true })}
					pattern="[A-Za-z]{5}"
				/>
				<input type="submit" />
			</form>
		</div>
	);
}

export default App;
