import type { BorderlyJSON } from "@/types/borderly";
import { useEffect, useRef, useState } from "react";
import "./TextPicker.css";

interface TextPickerProps {
	order: BorderlyJSON["data"];
	index: number;
	onAnswered: (value: string) => void;
}

export default function TextPicker({
	order,
	index,
	onAnswered,
}: TextPickerProps) {
	const [hasAnswered, setHasAnswered] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");

	useEffect(() => {
		setHasAnswered(false);
		setValue("");
		if (inputRef.current) {
			inputRef.current.disabled = false;
			inputRef.current?.focus();
		}
	}, [index, order]);

	useEffect(() => inputRef.current?.focus(), []);

	function chooseAnswer() {
		setHasAnswered(true);
		onAnswered(value);
	}

	return (
		<div className="text-answer-container">
			<input
				aria-label="Location"
				disabled={hasAnswered}
				placeholder="Enter the location"
				onKeyDown={(e) => e.key === "Enter" && chooseAnswer()}
				onChange={(event) => setValue(event.target.value)}
				value={value}
				ref={inputRef}
			/>
			<button
				className="primary"
				disabled={hasAnswered}
				onClick={chooseAnswer}
				type="button"
			>
				Submit
			</button>
		</div>
	);
}
