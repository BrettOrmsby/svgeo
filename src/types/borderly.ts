export const CATEGORIES = [
	"countries",
	"states",
	"dmas",
	"canada-provinces",
	"india-states",
	"india-districts",
] as const;
export type Category = (typeof CATEGORIES)[number];

export function isCategory(str: string): str is Category {
	return CATEGORIES.includes(str as Category);
}

export interface Country {
	id: string;
	name: string;
	iso2: string;
	iso3: string;
	urls: {
		shape: string;
		flag: string;
		flagCircle: string;
	};
}
export interface Countries {
	type: "countries";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
		flag: string;
		flagCircle: string;
	};
	data: Country[];
}

export interface USState {
	id: string;
	name: string;
	code: string;
	fips: string;
	urls: {
		shape: string;
		flag: string;
		flagCircle: string;
	};
}
export interface USStates {
	type: "states";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
		flag: string;
		flagCircle: string;
	};
	data: USState[];
}

export interface DMA {
	id: string;
	name: string;
	code: string;
	urls: {
		shape: string;
	};
}
export interface DMAs {
	type: "dmas";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
	};
	data: DMA[];
}

export interface CanadaProvince {
	id: string;
	name: string;
	abbreviation: string;
	region: string;
	subregion: string;
	urls: {
		shape: string;
	};
}
export interface CanadaProvinces {
	type: "canada-provinces";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
	};
	data: CanadaProvince[];
}

export interface IndiaState {
	id: string;
	name: string;
	urls: {
		shape: string;
	};
}
export interface IndiaStates {
	type: "india-states";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
	};
	data: IndiaState[];
}

export interface IndiaDistrict {
	id: string;
	name: string;
	urls: {
		shape: string;
	};
}
export interface IndiaDistricts {
	type: "india-districts";
	count: number;
	description: string;
	baseUrls: {
		shape: string;
	};
	data: IndiaDistrict[];
}

export type BorderlyJSON =
	| Countries
	| USStates
	| DMAs
	| CanadaProvinces
	| IndiaStates
	| IndiaDistricts;
