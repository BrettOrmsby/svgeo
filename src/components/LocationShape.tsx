import type { GameMode } from "@/types/intex";
import { useEffect, useState } from "react";

interface LocationShapeProps {
	mode: GameMode;
	src: string;
	height: string;
}

export default function LocationShape({
	mode,
	src,
	height,
}: LocationShapeProps) {
	// TODO: loading on src change
	const [rotation, setRotation] = useState(
		mode === "hard" ? Math.floor(Math.random() * 360) : 0,
	);

	useEffect(() => {
		setRotation(mode === "hard" ? Math.floor(Math.random() * 360) : 0);
	}, [src, mode]);

	return (
		<img
			src={src}
			alt="Location Shape"
			style={{ height, transformOrigin: "center", rotate: `${rotation}deg` }}
		/>
	);
}
