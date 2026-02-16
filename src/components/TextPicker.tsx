import type { BorderlyJSON } from "@/types/borderly";
import { useEffect, useState } from "react";

interface TextPickerProps {
	order: BorderlyJSON["data"];
	index: number;
	onAnswered: (wasCorrect: boolean) => void;
}

export default function TextPicker({
	order,
	index,
	onAnswered,
}: TextPickerProps) {
	const [hasAnswered, setHasAnswered] = useState(false);
	const [wasCorrect, setWasCorrect] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		setHasAnswered(false);
		setWasCorrect(false);
		setValue("");
	}, [index, order]);

	function chooseAnswer() {
		const wasCorrect =
			normalizeString(value) === normalizeString(order[index].name);

		setHasAnswered(true);
		setWasCorrect(wasCorrect);
		onAnswered(wasCorrect);
	}

	return (
		<div>
			<input
				disabled={hasAnswered}
				onKeyDown={(e) => e.key === "Enter" && chooseAnswer()}
				onChange={(event) => setValue(event.target.value)}
				value={value}
			/>
			<button disabled={hasAnswered} onClick={chooseAnswer} type="button">
				Submit
			</button>
			{hasAnswered && (
				<div>
					{wasCorrect && "You are correct!"}
					{!wasCorrect &&
						"You are incorrect! the answer was " + order[index].name}
				</div>
			)}
		</div>
	);
}

function normalizeString(str: string): string {
	return str
		.trim()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();
}
