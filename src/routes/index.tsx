import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<h2 id="learn">Learn</h2>
		</div>
	);
}
