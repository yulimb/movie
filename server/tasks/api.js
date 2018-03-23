// http://api.douban.com/v2/movie/subject/1764796
//根据豆瓣的api 获取数据
const rp = require("request-promise-native") //request请求api，

async function fetchMovie(item) {
	const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
	const res = await rp(url);
	return res
};
(async () => {
	let movies = [{
		doubanId: 26710532,
		title: '傲骨之战 第二季',
		rate: 9.6,
		poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2515458639.jpg'
	}, {
		doubanId: 30161289,
		title: '弟之夫',
		rate: 8.2,
		poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2513510133.jpg'
	}, {
		doubanId: 26915555,
		title: '老男孩',
		rate: 6.5,
		poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2515496055.jpg'
	}];
	movies.map(async movie => {
		let movieData = await fetchMovie(movie);
		try {
			movieData = JSON.parse(movieData)
			console.log(movieData.summary)
		} catch (err) {
			console.log(err)
		}
	})
})()