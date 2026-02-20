import type { BorderlyJSON, Category } from "@/types/borderly";

export const userFacingCategories = {
	countries: "Countries",
	"us-states": "US States",
	dmas: "DMAs",
	"canada-provinces": "Canada Provinces",
	"canada-regions": "Canada Regions",
	"india-states": "India States",
};

export async function getBorderlyJSON(category: Category) {
	const res = await fetch(`https://borderly.dev/data/index/${category}.json`);
	if (!res.ok) throw new Error("HTTP Status Error");
	return (await res.json()) as BorderlyJSON;
}
