export type GameMode = "easy" | "medium" | "hard";
export function isMode(str: string): str is GameMode {
	return ["easy", "medium", "hard"].includes(str);
}
