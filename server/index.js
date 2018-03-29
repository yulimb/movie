const Koa = require("Koa");
const {
	resolve
} = require('path');
const views = require("Koa-views");
const {
	connect,
	initSchemas,
	initAdmin
} = require("./database/init");
const mongoose = require("mongoose");
var fs = require("fs");
//利用done的fs写文件把数据写出来 看的清楚点
function saveProxys(data) {
	fs.writeFileSync("proxys.json", JSON.stringify(data));
	console.log("Save finished!");
}

// const router = require("./routes/test");
const R = require('ramda')
// const MIDDLEWARES = ['common', 'router'];
const MIDDLEWARES = ['router', 'parcel']
const useMiddlewares = (app) => {
	R.map(
		R.compose(
			R.forEachObjIndexed(
				initWith => initWith(app)
			),
			require,
			name => resolve(__dirname, `./middlewares/${name}`)
		)
	)(MIDDLEWARES)
};

(async () => {
	await connect();
	initSchemas(); //初始化schema 数据模型
	// const Movie = mongoose.model('Movie');
	// const movies = await Movie.find({});
	// saveProxys(movies)
	// for (var i = 0; i < movies.length; i++) {
	// 	let movie = movies[i];
	// 	movie.summary = " ";
	// 	movie.summary = null;
	// 	movie.year = '';
	// 	movie.title = '';
	// 	await movie.save();
	// }

	// require("./tasks/movie"); //require进来就能执行了,第一次爬所有的粗数据
	// require("./tasks/api"); //require进来就能执行了，利用爬到的数据以及豆瓣api获取详细数据
	// require("./tasks/trailer"); //require进来就能执行了,爬取电影详情页 获取预告片地址
	// console.log(movie)
	// 
	const app = new Koa()
	await useMiddlewares(app)
	app.listen(4455)
	// 
	// 
})();
// const app = new Koa();
// app.use(router.routes())
// 	.use(router.allowedMethods())
// app.use(views(resolve(__dirname, './views'), {
// 	extension: "pug"
// }))
// app.use(async (ctx, next) => {
// 	await ctx.render('index')
// })
// app.listen(2333)
// const {
// 	normal,
// 	demo
// } = require("./tpl");
// app.use((ctx, next) => {
// 	ctx.type = "text/html;charset=utf-8";
// 	ctx.body = main;
// });