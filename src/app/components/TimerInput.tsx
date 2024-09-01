import React from 'react';
import { TimerInputProps } from '../types';

const TimerInput: React.FC<TimerInputProps> = ({
	label,
	value,
	onValueChange,
}) => {
	return (
		<div className="mx-auto flex flex-col justify-center w-fit p-4 gap-4">
			<label className="text-base mx-auto w-fit">{label}</label>
			<input
				className="block border-black border-[1px] rounded-sm px-2"
				type="number"
				value={value}
				onChange={(e) => onValueChange(parseInt(e.target.value))}
			/>
		</div>
	);
};

export default TimerInput;
