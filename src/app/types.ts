export interface TimerState {
	setSeconds: number;
	restSeconds: number;
	currentTime: number;
	currentSet: number;
	maxSets: number;
	isResting: boolean;
	isRunning: boolean;
}

export type TimerAction =
	| { type: 'START' }
	| { type: 'STOP' }
	| { type: 'TICK' }
	| { type: 'SET_SET_SECONDS'; payload: number }
	| { type: 'SET_REST_SECONDS'; payload: number }
	| { type: 'SET_MAX_SETS'; payload: number };

export interface TimerInputProps {
	label: string;
	value: number;
	onValueChange: (value: number) => void;
}
