//利用子进程分担主线程的压力爬视频信息

const cp = require("child_process"); //引进子进程
const {
	resolve
} = require("path"); // 引入路径
const mongoose = require('mongoose');
const Movie = mongoose.model("Movie");

(async () => {
	const script = resolve(__dirname, "../crawler/trail-list");
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
	child.on("message", data => {
		let result = data.result;
		result.forEach(async item => {
			// console.log(item)
			let movie = await Movie.findOne({
				doubanId: item.doubanId
			}); //在数据库里比对是否有这个id,如果没有就保存
			if (!movie) {
				movie = new Movie(item);
				await movie.save();
			}
		})
	})
})()