// Handle all requests and log a timestamp
export default async (ctx, next) => {
	const start = new Date();
	await next();

	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
}