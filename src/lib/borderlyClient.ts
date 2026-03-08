import type { BorderlyJSON, Category } from "@/types/borderly";

export const userFacingCategories: Record<Category, string> = {
	countries: "Countries",
	states: "US States",
	dmas: "DMAs",
	"canada-provinces": "Canada Provinces",
	"india-states": "India States",
	"india-districts": "India Districts",
} as const;

export const idToImageId: Record<Category, string> = {
	countries: "country",
	states: "state",
	dmas: "dma",
	"canada-provinces": "ca-province",
	"india-states": "in-state",
	"india-districts": "in-district",
} as const;

export async function getBorderlyJSON(category: Category) {
	const res = await fetch(`https://borderly.dev/data/index/${category}.json`);
	if (!res.ok) throw new Error("HTTP Status Error");
	const data = await res.json();
	if (data.type === "us-states") data.type = "states";
	return data as BorderlyJSON;
}
