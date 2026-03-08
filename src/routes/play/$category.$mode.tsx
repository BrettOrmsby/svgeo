import { createFileRoute, notFound } from "@tanstack/react-router";
import { isCategory } from "@/types/borderly";
import { isMode } from "@/types/intex";
import { getBorderlyJSON, userFacingCategories } from "@/lib/borderlyClient";
import Game from "@/components/Game";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
	head: ({ params }) => ({
		meta: [
			{
				title: `SVGEO • ${userFacingCategories[params.category]} ${params.mode.charAt(0).toUpperCase() + params.mode.slice(1)}`,
			},
		],
	}),
	pendingComponent: () => <div>Loading...</div>,
	errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});

function Play() {
	const { mode } = Route.useParams();
	const borderlyData = Route.useLoaderData();
	return (
		<>
			<Header />
			<main className="game-main">
				<Game data={borderlyData} mode={mode} />
			</main>
			<Footer />
		</>
	);
}
