import React from 'react';
import { TimerState } from '../types';

interface TimerDisplayProps {
	state: TimerState;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ state }) => {
	return (
		<div className="mt-8">
			<h2 className="text-[64px] md:text-[42px] font-bold text-center">
				{state.currentTime}
			</h2>
			<h3 className="mt-6">
				セット数: {state.currentSet} / {state.maxSets}
			</h3>
			<h3 className="mt-6 text-center text-lg font-bold">
				{state.isResting ? '休憩中' : 'セット中'}
			</h3>
		</div>
	);
};
