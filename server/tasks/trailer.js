//利用子进程分担主线程的压力爬视频信息

const cp = require("child_process"); //引进子进程
const {
	resolve
} = require("path"); // 引入路径
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const Category = mongoose.model('Category');

(async () => {
	let movies = await Movie.find({
		$or: [{
			video: {
				$exists: false
			}
		}, {
			video: null
		}]
	});
	const script = resolve(__dirname, "../crawler/video");
	const child = cp.fork(script, []); //调用子进程的fork方法，传入script方法和数组
	let invoked = false; //用来标明子进程是否跑起来
	//档进程出错时，如果调用过就return invoked
	child.on("error", err => {
		if (invoked) return;
		invoked = true;
		console.log(err);
	});
	//档进退出时，如果调用过就return invoked

	child.on('exit', code => {
		if (invoked) return;
		invoked = true;
		let err = code === 0 ? null : new Error('exit code' + code);
		console.log(err);
	});
	//对child进行监听，获取返回内容data
	child.on('message', async data => {
		let doubanId = data.doubanId
		let movie = await Movie.findOne({
			doubanId: doubanId
		})

		if (data.video) {
			movie.video = data.video
			movie.cover = data.cover

			await movie.save()
		} else {
			await movie.remove()

			let movieTypes = movie.movieTypes

			for (let i = 0; i < movieTypes.length; i++) {
				let type = movieTypes[i]
				let cat = Category.findOne({
					name: type
				})

				if (cat && cat.movies) {
					let idx = cat.movies.indexOf(movie._id)

					if (idx > -1) {
						cat.movies = cat.movies.splice(idx, 1)
					}

					await cat.save()
				}
			}
		}
	})

	child.send(movies)
})()