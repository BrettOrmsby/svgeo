import { Link } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import "./Header.css";

export default function Header() {
	return (
		<header className="nav">
			<nav className="wrapper">
				<Link to="/" className="title-logo">
					<div className="circle">
						<MapPinned aria-label="SVGEO Home" />
					</div>
					<span className="title">SVGEO</span>
				</Link>
				<div>
					<Link to="/" hash="play" className="button primary">
						Play
					</Link>
					<Link
						to="/"
						hash="how-to-play"
						className="button secondary about-button"
					>
						About
					</Link>
				</div>
			</nav>
		</header>
	);
}
