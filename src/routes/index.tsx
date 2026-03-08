import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "@/styles/index.css";
import { MapPinned } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import type { Category } from "@/types/borderly";

export const Route = createFileRoute("/")({
	component: App,
});

interface CategoryCardData {
	category: Category;
	shapeId: string;
}

const categories: CategoryCardData[] = [
	{
		category: "countries",
		shapeId: "ca",
	},
	{
		category: "canada-provinces",
		shapeId: "on",
	},
	{
		category: "states",
		shapeId: "ca",
	},
	{
		category: "india-states",
		shapeId: "up",
	},
	{
		category: "dmas",
		shapeId: "803",
	},
	{
		category: "india-districts",
		shapeId: "350",
	},
];

function App() {
	return (
		<>
			<header className="hero">
				<div className="circle">
					<MapPinned />
				</div>
				<h1>SVGEO</h1>
				<p>Can you name the location from its shape?</p>
				<div className="button-container">
					<button
						className="primary"
						onClick={() => scrollIntoView("play")}
						type="button"
					>
						Play
					</button>
					<button
						className="secondary"
						onClick={() => scrollIntoView("how-to-play")}
						type="button"
					>
						How to Play
					</button>
				</div>
			</header>
			<main>
				<section>
					<h2 id="how-to-play">How To Play</h2>
					<div>
						<div className="card steps">
							<div className="header">
								<div className="circle">1</div>
								<h3>Pick the Category</h3>
							</div>
							<p>
								Locations from your category will be randomized and their images
								will appear one at a time. Try to guess the correct name to
								succeed!
							</p>
						</div>
						<div className="card steps">
							<div className="header">
								<div className="circle">2</div>
								<h3>Pick the Difficulty</h3>
							</div>
							<div className="difficulty-container">
								<div className="card success">
									<h4>Easy</h4>
									<p>Pick from 3 names.</p>
								</div>
								<div className="card warning">
									<h4>Medium</h4>
									<p>Enter the location name.</p>
								</div>
								<div className="card error">
									<h4>Hard</h4>
									<p>Now the location is rotated.</p>
								</div>
							</div>
						</div>

						<div className="card steps">
							<div className="header">
								<div className="circle">3</div>
								<h3>Start Playing</h3>
							</div>
							<p>Guess the image location and try to get through them all!</p>
						</div>
					</div>
				</section>

				<section>
					<h2 id="play">Play</h2>

					<div className="game-modes">
						{categories.map((category) => (
							<CategoryCard {...category} key={category.category} />
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

function scrollIntoView(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
