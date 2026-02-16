import type { BorderlyJSON } from "@/types/borderly";
import { shuffle } from "@/lib/utils";
import { useEffect, useState } from "react";

interface OptionPickerProps {
	order: BorderlyJSON["data"];
	index: number;
	onAnswered: (wasCorrect: boolean) => void;
}

export default function OptionPicker({
	order,
	index,
	onAnswered,
}: OptionPickerProps) {
	// TODO: try to avoid shapes that have already been identified (and just shuffle rest?)
	const [possibleAnswers, setPossibleAnswers] = useState<
		BorderlyJSON["data"][number][]
	>([]);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [wasCorrect, setCorrect] = useState(false);

	useEffect(() => {
		const firstDummy = getDummyAnswerIndex(order.length, [index]);
		const secondDummy = getDummyAnswerIndex(order.length, [index, firstDummy]);
		const threeAnswers = [order[index], order[firstDummy], order[secondDummy]];

		setPossibleAnswers(shuffle(threeAnswers));
		setHasAnswered(false);
		setCorrect(false);
	}, [index, order]);

	function chooseAnswer(answer: string) {
		const isCorrect = answer === order[index].name;
		setHasAnswered(true);
		setCorrect(isCorrect);
		onAnswered(isCorrect);
	}

	return (
		<div>
			{possibleAnswers.map((answer) => (
				<div key={answer.id}>
					<div>
						<strong>{answer.name}</strong>
					</div>
					<button
						onClick={() => chooseAnswer(answer.name)}
						disabled={hasAnswered}
						type="button"
					>
						Answer?
					</button>
				</div>
			))}
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

function getDummyAnswerIndex(length: number, invalid: number[]): number {
	while (true) {
		const dummy = getRandomIndex(length);
		if (!invalid.includes(dummy)) return dummy;
	}
}

function getRandomIndex(length: number) {
	return Math.floor(Math.random() * length);
}
