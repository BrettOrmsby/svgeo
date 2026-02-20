import { createFileRoute, notFound } from "@tanstack/react-router";
import { isCategory } from "@/types/borderly";
import { isMode } from "@/types/intex";
import { getBorderlyJSON } from "@/lib/borderlyClient";
import Game from "@/components/Game";
import Header from "@/components/Header";

/*
 * - Easy: have 3-5 options to choose from
 * - Medium: need to enter the name
 * - Hard: svg is rotated/flipped
 */

export const Route = createFileRoute("/play/$category/$mode")({
	component: Play,
	params: {
		parse: (params) => {
			if (!isMode(params.mode)) throw notFound();
			if (!isCategory(params.category)) throw notFound();

			return {
				category: params.category,
				mode: params.mode,
			};
		},
	},
	loader: async ({ params }) => {
		return await getBorderlyJSON(params.category);
	},
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function Play() {
	const { mode } = Route.useParams();
	const borderlyData = Route.useLoaderData();
	return (
		<>
			<Header />
			<main>
				<Game data={borderlyData} mode={mode} />
			</main>
		</>
	);
}
