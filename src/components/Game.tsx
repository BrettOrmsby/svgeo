import { useEffect, useState } from "react";
import { userFacingCategories } from "@/lib/borderlyClient";
import { shuffle } from "@/lib/utils";
import type { GameMode } from "@/types";
import type { BorderlyJSON } from "@/types/borderly";
import LocationShape from "./LocationShape";
import OptionPicker from "./OptionPicker";
import TextPicker from "./TextPicker";
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

	useEffect(() => reset(), [data]);

	const onAnswered = (value: string) => {
		if (isAnswered) return;

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
	const completed = isAnswered ? currentIndex + 1 : currentIndex;

	return (
		<section className="Game">
			<h1>
				{userFacingCategories[data.type]}: {capitalize(mode)}
			</h1>
			<div className="completed-stats">
				<div className="card">
					Completed:&nbsp;
					<strong>
						{completed} / {order.length}
					</strong>
				</div>
				<div className="card success">
					Correct:&nbsp;
					<strong>
						{correctAnswers} / {order.length}
					</strong>
				</div>
			</div>
			{currentIndex >= order.length ? (
				<div className="finished-container">
					<h2>Congratulations!</h2>
					<p>You've completed them all!</p>
					<button onClick={reset} className="primary" type="button">
						Play Again
					</button>
				</div>
			) : (
				currentIndex < data.data.length && (
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
				)
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

function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
