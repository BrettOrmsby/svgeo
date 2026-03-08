import { useEffect, useState } from "react";

export function useShapeStyleQuery() {
	const [query, setQuery] = useState("");

	useEffect(() => {
		const update = () => setQuery(getShapeStyleQuery());
		update();

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	return query;
}

function getShapeStyleQuery() {
	const bodyStyles = getComputedStyle(document.body);
	const bg = bodyStyles.getPropertyValue("--bg");
	const border = bodyStyles.getPropertyValue("--border");
	return `?fill=${bg.replace("#", "")}&stroke=${border.replace("#", "")}&strokeWidth=0.5`;
}
