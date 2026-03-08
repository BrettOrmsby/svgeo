import { createFileRoute, notFound } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import Game from "@/components/Game";
import Header from "@/components/Header";
import { getBorderlyJSON, userFacingCategories } from "@/lib/borderlyClient";
import { isMode } from "@/types";
import { isCategory } from "@/types/borderly";

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
	loader: ({ params }) => getBorderlyJSON(params.category),

	head: ({ params }) => ({
		meta: [
			{
				title: `SVGEO • ${userFacingCategories[params.category]} ${capitalize(params.mode)}`,
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

function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
