export const GAMEMODES = ["easy", "medium", "hard"] as const;
export type GameMode = (typeof GAMEMODES)[number];

export function isMode(str: string): str is GameMode {
	return GAMEMODES.includes(str as GameMode);
}
