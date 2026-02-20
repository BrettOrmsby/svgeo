import { Link } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import "./Header.css";

export default function Header() {
	return (
		<header>
			<div className="wrapper">
				<Link to="/" className="title-logo">
					<div className="circle">
						<MapPinned />
					</div>
					<span className="title">SVGEO</span>
				</Link>
				<div>
					<Link to="/play" className="button primary">
						Play
					</Link>
					<Link to="/" hash="learn" className="button secondary about-button">
						About
					</Link>
				</div>
			</div>
		</header>
	);
}
