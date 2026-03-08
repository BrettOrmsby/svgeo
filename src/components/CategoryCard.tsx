import { Link } from "@tanstack/react-router";
import { idToImageId, userFacingCategories } from "@/lib/borderlyClient";
import { GAMEMODES } from "@/types";
import type { Category } from "@/types/borderly";
import "./CategoryCard.css";
import { useShapeStyleQuery } from "@/hooks/useShapeStyleQuery";

interface CategoryCardProps {
	category: Category;
	shapeId: string;
}

export default function CategoryCard({ category, shapeId }: CategoryCardProps) {
	const shapeStyleQuery = useShapeStyleQuery();

	const backgroundStyle = {
		"--bg-image": `url("https://borderly.dev/${idToImageId[category]}/${shapeId}.svg${shapeStyleQuery}")`,
	} as React.CSSProperties;

	return (
		<div className="card game-picker" style={backgroundStyle}>
			<h3>{userFacingCategories[category]}</h3>
			<div className="links">
				{GAMEMODES.map((mode) => (
					<Link
						key={mode}
						to="/play/$category/$mode"
						params={{ mode, category }}
						className="button primary"
					>
						{capitalize(mode)}
					</Link>
				))}
			</div>
		</div>
	);
}

function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
