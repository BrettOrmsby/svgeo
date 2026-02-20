import type { BorderlyJSON } from "@/types/borderly";
import type { GameMode } from "@/types/intex";
import LocationShape from "./LocationShape";
import { useEffect, useState } from "react";
import TextPicker from "./TextPicker";
import OptionPicker from "./OptionPicker";
import { shuffle } from "@/lib/utils";
import { userFacingCategories } from "@/lib/borderlyClient";
import "./Game.css";
interface GameProps {
	mode: GameMode;
	data: BorderlyJSON;
}

export default function Game({ mode, data }: GameProps) {
	const [order, setOrder] = useState(() => shuffle([...data.data]));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [isAnswered, setIsAnswered] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	const reset = () => {
		setOrder(shuffle([...data.data]));
		setCurrentIndex(0);
		setCorrectAnswers(0);
		setIsAnswered(false);
		setIsCorrect(false);
	};

	useEffect(reset, [data]);

	const onAnswered = (value: string) => {
		const wasCorrect =
			normalizeString(value) === normalizeString(order[currentIndex].name);
		if (wasCorrect) setCorrectAnswers((prev) => prev + 1);
		setIsCorrect(wasCorrect);
		setIsAnswered(true);
	};

	const onNext = () => {
		setCurrentIndex((prev) => prev + 1);
		setIsAnswered(false);
	};

	const Picker = mode === "easy" ? OptionPicker : TextPicker;

	const AnswerPicker = currentIndex < data.data.length && (
		<>
			<LocationShape
				mode={mode}
				src={data.baseUrls.shape.replace("{id}", order[currentIndex].id)}
			/>
			<Picker
				order={order}
				index={currentIndex}
				onAnswered={onAnswered}
				correctAnswerId={order[currentIndex].id}
			/>
			{isAnswered && (
				<div className="answer-area">
					{isCorrect ? (
						<div className="card success">You are correct!</div>
					) : (
						<div className="card error">
							You are incorrect! The answer was{" "}
							<strong>{order[currentIndex].name}</strong>.
						</div>
					)}
					<button type="button" className="secondary" onClick={onNext}>
						Next
					</button>
				</div>
			)}
		</>
	);

	const capitalMode = mode.charAt(0).toUpperCase() + mode.slice(1);

	return (
		<section className="Game">
			<h1>
				{userFacingCategories[data.type]}: {capitalMode}
			</h1>
			<div className="completed-stats">
				<div className="card">
					Completed:&nbsp;
					<strong>
						{isAnswered ? currentIndex + 1 : currentIndex} / {order.length}
					</strong>
				</div>
				<div className="card success">
					Correct:&nbsp;
					<strong>
						{correctAnswers} / {order.length}
					</strong>
				</div>
			</div>
			{currentIndex >= data.data.length ? (
				<div className="finished-container">
					<h2>Congratulations!</h2>
					<p>You've completed them all!</p>
					<button onClick={reset} className="primary" type="button">
						Play Again
					</button>
				</div>
			) : (
				AnswerPicker
			)}
		</section>
	);
}

function normalizeString(str: string): string {
	return str
		.trim()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();
}
