import type { BorderlyJSON } from "@/types/borderly";
import type { GameMode } from "@/types/intex";
import LocationShape from "./LocationShape";
import { useEffect, useState } from "react";
import TextPicker from "./TextPicker";
import OptionPicker from "./OptionPicker";
import { shuffle } from "@/lib/utils";

interface GameProps {
	mode: GameMode;
	data: BorderlyJSON;
}

export default function Game({ mode, data }: GameProps) {
	const [order, setOrder] = useState(() => shuffle([...data.data]));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [isAnswered, setIsAnswered] = useState(false);

	useEffect(() => {
		setOrder(shuffle([...data.data]));
		setCurrentIndex(0);
		setCorrectAnswers(0);
		setIsAnswered(false);
	}, [data]);

	const onAnswered = (wasCorrect: boolean) => {
		if (wasCorrect) setCorrectAnswers((prev) => prev + 1);
		setIsAnswered(true);
	};

	const onNext = () => {
		// TODO: continue this
		if (currentIndex === order.length - 1) alert("You are done");
		setCurrentIndex((prev) => prev + 1);
		setIsAnswered(false);
	};

	const Picker = mode === "easy" ? OptionPicker : TextPicker;

	return (
		<div>
			{currentIndex + 1} / {order.length}
			Correct: {correctAnswers} / {isAnswered ? currentIndex + 1 : currentIndex}
			<LocationShape
				mode={mode}
				src={data.baseUrls.shape.replace("{id}", order[currentIndex].id)}
				height="50vh"
			/>
			<Picker order={order} index={currentIndex} onAnswered={onAnswered} />
			{isAnswered && (
				<button onClick={onNext} type="button">
					Next
				</button>
			)}
		</div>
	);
}
