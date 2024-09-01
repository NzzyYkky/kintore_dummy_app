import { useReducer, useEffect } from 'react';
import { TimerState, TimerAction } from '../types';
import useSound from 'use-sound';
import nextConfig from '../../../next.config.mjs';
const BASE_PATH = nextConfig.basePath || '';

const initialState: TimerState = {
	setSeconds: 4,
	restSeconds: 2,
	currentTime: 4,
	currentSet: 1,
	maxSets: 5,
	isResting: false,
	isRunning: false,
};

function validatePositiveInteger(value: number): number {
	return Math.max(1, Math.floor(value));
}

function reducer(state: TimerState, action: TimerAction): TimerState {
	switch (action.type) {
		case 'START':
			return {
				...state,
				isRunning: true,
				currentTime: state.setSeconds,
				currentSet: 1,
				isResting: false,
			};
		case 'STOP':
			return {
				...state,
				isRunning: false,
				currentTime: state.setSeconds,
				currentSet: 1,
				isResting: false,
			};
		case 'TICK':
			if (state.currentTime <= 1) {
				if (state.isResting) {
					const nextSet = state.currentSet + 1;
					if (nextSet > state.maxSets) {
						return {
							...state,
							isRunning: false,
							currentTime: state.setSeconds,
							isResting: false,
						};
					}
					return {
						...state,
						currentTime: state.setSeconds,
						isResting: false,
						currentSet: nextSet,
					};
				} else {
					if (state.currentSet === state.maxSets) {
						return {
							...state,
							isRunning: false,
							currentTime: state.setSeconds,
							isResting: false,
						};
					}
					return {
						...state,
						currentTime: state.restSeconds,
						isResting: true,
					};
				}
			}
			return { ...state, currentTime: state.currentTime - 1 };
		case 'SET_SET_SECONDS':
			return { ...state, setSeconds: validatePositiveInteger(action.payload) };
		case 'SET_REST_SECONDS':
			return { ...state, restSeconds: validatePositiveInteger(action.payload) };
		case 'SET_MAX_SETS':
			return { ...state, maxSets: validatePositiveInteger(action.payload) };
		default:
			return state;
	}
}

export function useIntervalTimer() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [playTick] = useSound(`${BASE_PATH}/tick.wav`);
	const [playSetStart] = useSound(`${BASE_PATH}/set.wav`);
	const [playRestStart] = useSound(`${BASE_PATH}/set.wav`);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (state.isRunning) {
			interval = setInterval(() => {
				dispatch({ type: 'TICK' });
				playTick();

				// NOTE:セットが終わる時
				if (state.currentTime === 1 && !state.isResting) {
					if (state.currentSet < state.maxSets) {
						playRestStart();
					}
				}
				// NOTE:休憩が終わる時
				else if (state.currentTime === 1 && state.isResting) {
					if (state.currentSet < state.maxSets) {
						playSetStart();
					}
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [
		state.isRunning,
		state.currentTime,
		state.isResting,
		state.currentSet,
		state.maxSets,
		playTick,
		playSetStart,
		playRestStart,
	]);

	return { state, dispatch };
}
