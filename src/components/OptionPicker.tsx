import { useEffect, useState } from "react";
import { shuffle } from "@/lib/utils";
import type { BorderlyJSON } from "@/types/borderly";
import "./OptionPicker.css";

interface OptionPickerProps {
	order: BorderlyJSON["data"];
	index: number;
	onAnswered: (value: string) => void;
	correctAnswerId: string;
}

export default function OptionPicker({
	order,
	index,
	onAnswered,
	correctAnswerId,
}: OptionPickerProps) {
	const [possibleAnswers, setPossibleAnswers] = useState<
		BorderlyJSON["data"][number][]
	>([]);
	const [hasAnswered, setHasAnswered] = useState(false);

	useEffect(() => {
		const threeAnswers = [order[index], ...getTwoFakeAnswers(order, index)];

		setHasAnswered(false);
		setPossibleAnswers(shuffle(threeAnswers));
	}, [index, order]);

	function chooseAnswer(answer: string) {
		if (hasAnswered) return;
		setHasAnswered(true);
		onAnswered(answer);
	}

	return (
		<div className="button-answer-container">
			{possibleAnswers.map((answer) =>
				hasAnswered ? (
					<div
						key={answer.id}
						className={
							correctAnswerId === answer.id ? "card success" : "card error"
						}
					>
						{answer.name}
					</div>
				) : (
					<button
						key={answer.id}
						onClick={() => chooseAnswer(answer.name)}
						disabled={hasAnswered}
						type="button"
						className="secondary"
					>
						{answer.name}
					</button>
				),
			)}
		</div>
	);
}

function getTwoFakeAnswers(
	order: BorderlyJSON["data"],
	index: number,
): BorderlyJSON["data"] {
	const unanswered = shuffle(order.slice(index + 1));
	const twoFakeAnswers = [];
	if (unanswered.length === 0) {
		let answered = [...order];
		answered.pop();
		answered = shuffle(answered);
		twoFakeAnswers.push(answered[0]);
		twoFakeAnswers.push(answered[1]);
	} else if (unanswered.length === 1) {
		let answered = [...order];
		answered = shuffle(answered.filter((_, i) => i !== index));
		twoFakeAnswers.push(answered[0]);
		twoFakeAnswers.push(unanswered[0]);
	} else {
		twoFakeAnswers.push(unanswered[0]);
		twoFakeAnswers.push(unanswered[1]);
	}
	return twoFakeAnswers;
}
