import "./NotFound.css";
import { Link } from "@tanstack/react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="not-found-main">
				<h1>404 Not Found</h1>
				<img
					src="https://borderly.dev/country/li.svg?fill=f7d436&stroke=ecb732&strokeWidth=0.5&rotate=65"
					alt="distorted shape location"
					className="distorted-image"
				/>
				<p>Even the best geographers couldn't identify this one.</p>
				<Link to="/" className="button primary">
					Home
				</Link>
			</main>
			<Footer />
		</>
	);
}
