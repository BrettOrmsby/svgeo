import { useEffect, useState } from "react";
import type { GameMode } from "@/types";
import "./LocationShape.css";

interface LocationShapeProps {
	mode: GameMode;
	src: string;
}

export default function LocationShape({ mode, src }: LocationShapeProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [rotation, setRotation] = useState(
		mode === "hard" ? Math.floor(Math.random() * 360) : 0,
	);

	useEffect(() => {
		setRotation(mode === "hard" ? Math.floor(Math.random() * 360) : 0);
		setIsLoading(true);
		setIsError(false);
	}, [src, mode]);

	const bodyStyles = getComputedStyle(document.body);
	const bg = bodyStyles.getPropertyValue("--button-primary-bg");
	const border = bodyStyles.getPropertyValue("--button-primary-border");
	const styleQuery = `?fill=${bg.replace("#", "")}&stroke=${border.replace("#", "")}&strokeWidth=0.5&rotate=${rotation}`;

	if (isError)
		return (
			<div className="location-shape">
				<div>Failed to Load Image</div>
			</div>
		);
	return (
		<div className="location-shape">
			{isLoading && <div className="loader"></div>}
			<img
				src={src + styleQuery}
				alt="Location Shape"
				style={{ display: isLoading ? "none" : "inline-block" }}
				onLoad={() => setIsLoading(false)}
				onError={() => {
					setIsError(true);
					setIsLoading(false);
				}}
			/>
		</div>
	);
}
