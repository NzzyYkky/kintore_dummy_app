import React from 'react';
import { TimerState, TimerAction } from '../types';
import TimerInput from './TimerInput';

interface TimerControlsProps {
	state: TimerState;
	dispatch: React.Dispatch<TimerAction>;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
	state,
	dispatch,
}) => {
	const handleStart = () => dispatch({ type: 'START' });
	const handleStop = () => dispatch({ type: 'STOP' });

	return (
		<div className="mt-8 flex flex-col items-center justify-center">
			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">
				<TimerInput
					label="Set Seconds"
					value={state.setSeconds}
					onValueChange={(value) => {
						if (!state.isRunning) {
							dispatch({ type: 'SET_SET_SECONDS', payload: value });
						}
					}}
				/>
				<TimerInput
					label="Rest Seconds"
					value={state.restSeconds}
					onValueChange={(value) => {
						if (!state.isRunning) {
							dispatch({ type: 'SET_REST_SECONDS', payload: value });
						}
					}}
				/>
				<TimerInput
					label="Max Sets"
					value={state.maxSets}
					onValueChange={(value) => {
						if (!state.isRunning) {
							dispatch({ type: 'SET_MAX_SETS', payload: value });
						}
					}}
				/>
			</div>
			<div className="flex justify-center gap-4 mt-8">
				<button
					className="text-lg font-bold border-black border-[1px] rounded-full py-2 px-8"
					onClick={handleStart}
				>
					Start
				</button>
				<button
					className="text-lg font-bold bg-black text-white border-black border-[1px] rounded-full py-2 px-8"
					onClick={handleStop}
				>
					Stop
				</button>
			</div>
			<p className="mt-4 text-sm font-bold">※音が出ます。</p>
		</div>
	);
};
