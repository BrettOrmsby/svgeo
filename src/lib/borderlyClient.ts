import type { BorderlyJSON, Category } from "@/types/borderly";

export const userFacingCategories = {
	countries: "Countries",
	states: "US States",
	"us-states": "US States",
	dmas: "DMAs",
	"canada-provinces": "Canada Provinces",
	"canada-regions": "Canada Regions",
	"india-states": "India States",
	"india-districts": "India Districts",
} as const;

export const idToImageId = {
	countries: "country",
	"us-states": "state",
	states: "state",
	dmas: "dma",
	"canada-provinces": "ca-province",
	"canada-regions": "ca-region",
	"india-states": "in-state",
	"india-districts": "in-district",
} as const;

export async function getBorderlyJSON(category: Category) {
	const res = await fetch(`https://borderly.dev/data/index/${category}.json`, {
		headers: {
			"Content-type": "application/json; charset=utf-8",
		},
	});
	if (!res.ok) throw new Error("HTTP Status Error");
	const data = (await res.json()) as BorderlyJSON;
	// console.log(data)
	return data;
}
