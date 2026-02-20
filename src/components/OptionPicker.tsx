import type { BorderlyJSON } from "@/types/borderly";
import { shuffle } from "@/lib/utils";
import { useEffect, useState } from "react";
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
	// TODO: try to avoid shapes that have already been identified (and just shuffle rest?)
	const [possibleAnswers, setPossibleAnswers] = useState<
		BorderlyJSON["data"][number][]
	>([]);
	const [hasAnswered, setHasAnswered] = useState(false);

	useEffect(() => {
		const firstDummy = getDummyAnswerIndex(order.length, [index]);
		const secondDummy = getDummyAnswerIndex(order.length, [index, firstDummy]);
		const threeAnswers = [order[index], order[firstDummy], order[secondDummy]];

		setPossibleAnswers(shuffle(threeAnswers));
		setHasAnswered(false);
	}, [index, order]);

	function chooseAnswer(answer: string) {
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

function getDummyAnswerIndex(length: number, invalid: number[]): number {
	while (true) {
		const dummy = getRandomIndex(length);
		if (!invalid.includes(dummy)) return dummy;
	}
}

function getRandomIndex(length: number) {
	return Math.floor(Math.random() * length);
}
