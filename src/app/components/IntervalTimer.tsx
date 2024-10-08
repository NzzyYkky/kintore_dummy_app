'use client';

import React from 'react';
import { useIntervalTimer } from '../hooks/useIntervalTimer';
import { TimerControls } from './TimerControls';
import { TimerDisplay } from './TimerDisplay';

export const IntervalTimer: React.FC = () => {
	const { state, dispatch } = useIntervalTimer();

	return (
		<div className="flex flex-col justify-center items-center w-full pt-8 md:h-[100vh] md:pd-0">
			<h1 className="text-center text-responsive-large font-bold">
				筋トレ用アプリ
			</h1>
			<TimerControls state={state} dispatch={dispatch} />
			<TimerDisplay state={state} />
		</div>
	);
};
