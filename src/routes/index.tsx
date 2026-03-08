import { createFileRoute, Link } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import "@/styles/index.css";
import { idToImageId, userFacingCategories } from "@/lib/borderlyClient";
import type { Category } from "@/types/borderly";
import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
	component: App,
});

interface CategoryCardData {
	id: Category;
	shape: string;
}

const categories: CategoryCardData[] = [
	{
		id: "countries",
		shape: "ca",
	},
	{
		id: "canada-provinces",
		shape: "on",
	},
	{
		id: "states",
		shape: "ca",
	},
	{
		id: "india-states",
		shape: "up",
	},
	{
		id: "dmas",
		shape: "803",
	},
	{
		id: "india-districts",
		shape: "350",
	},
];

function App() {
	const [shapeStyleQuery, setShapeStyleQuery] = useState(``);
	useEffect(() => {
		const updateShapeStyles = () => setShapeStyleQuery(getShapeStyleQuery());
		updateShapeStyles();

		const colourScheme = window.matchMedia("(prefers-color-scheme: dark)");
		colourScheme.addEventListener("change", updateShapeStyles);
		return () => colourScheme.removeEventListener("change", updateShapeStyles);
	});

	const scrollIntoView = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
							<div
								key={category.id}
								className="card game-picker"
								style={
									{
										"--bg-image": `url("https://borderly.dev/${idToImageId[category.id]}/${category.shape}.svg${shapeStyleQuery}")`,
									} as React.CSSProperties
								}
							>
								<h3>{userFacingCategories[category.id]}</h3>
								<div className="links">
									<Link
										to="/play/$category/$mode"
										params={{ mode: "easy", category: category.id }}
										className="button primary"
									>
										Easy
									</Link>
									<Link
										to="/play/$category/$mode"
										params={{ mode: "medium", category: category.id }}
										className="button primary"
									>
										Medium
									</Link>
									<Link
										to="/play/$category/$mode"
										params={{ mode: "hard", category: category.id }}
										className="button primary"
									>
										Hard
									</Link>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer></Footer>
		</>
	);
}

function getShapeStyleQuery() {
	const bodyStyles = getComputedStyle(document.body);
	const bg = bodyStyles.getPropertyValue("--bg");
	const border = bodyStyles.getPropertyValue("--border");
	return `?fill=${bg.replace("#", "")}&stroke=${border.replace("#", "")}&strokeWidth=0.5`;
}
