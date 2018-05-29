export default (html, state) => `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title> SSR Preact App </title>
		</head>
		<body>
			<div id="app">${html}</div>
			<script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
			<script src="./bundle.js"></script>
		</body>
	</html>
`;