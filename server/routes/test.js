const Router = require("koa-router");
const router = new Router();
const {
	getAllMovies,
	getMovieDetail,
	getRelativeMovies
} = require('../service/movie')
router.get('/movies/all', async (ctx, next) => {
	const {
		type,
		year
	} = ctx.query
	const movies = await getAllMovies(type, year)

	ctx.body = {
		success: true,
		data: movies
	}
})

router.get('/movies/detail/:id', async (ctx, next) => {
	const id = ctx.params.id
	const movie = await getMovieDetail(id)
	const relativeMovies = await getRelativeMovies(movie)

	ctx.body = {
		data: {
			movie,
			relativeMovies
		},
		success: true
	}
})

module.exports = router