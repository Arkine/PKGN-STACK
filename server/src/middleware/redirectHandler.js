// Handles all server status errors and redirects user to homepage
export default async (ctx, next) => {
	try {
		await next();
		const status = ctx.status || 404;

		if (status === 404) {
			await ctx.redirect('/');
		}
	} catch (error) {
		ctx.status = error.status || 500;
		await ctx.redirect('/');
	}
}