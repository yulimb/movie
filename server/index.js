const Koa = require("Koa");
const app = new Koa();
const {
	nomal
} = require("./tpl/index.js");
app.use((ctx, next) => {
	ctx.type = "text/html;charset=utf-8";
	ctx.body = nomal;
});
app.listen(2333)