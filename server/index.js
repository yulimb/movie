const Koa = require("Koa");
const app = new Koa();
const {
	resolve
} = require('path');
const views = require("Koa-views");
// const {
// 	normal,
// 	demo
// } = require("./tpl");
// app.use((ctx, next) => {
// 	ctx.type = "text/html;charset=utf-8";
// 	ctx.body = main;
// });
app.use(views(resolve(__dirname, './views'), {
	extension: "pug"
}))
app.use(async (ctx, next) => {
	await ctx.render('index')
})
app.listen(2333)