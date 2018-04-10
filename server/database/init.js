const mongoose = require("mongoose");
const db = 'mongodb://localhost/douban-trailer';
const {
	resolve
} = require('path');
const glob = require('glob'); //批量加载，匹配规则
mongoose.Promise = global.Promise;

exports.initSchemas = () => {
	//匹配schema下所有的js文件
	glob.sync(resolve(__dirname, "./schema", '**/*.js')).forEach(require)
}



exports.connect = () => {
	let maxConnectTimes = 0;

	return new Promise((resolve, reject) => {

		if (process.env.NODE_ENV !== 'production') { //判断是否是生产环境
			mongoose.set('debug', true);
		}
		mongoose.connect(db); //链接db的地址
		mongoose.connection.on('disconnected', () => { //档断开链接的时候重新链接
			maxConnectTimes++;
			if (maxConnectTimes < 5) {
				mongoose.connect(db);
			} else {
				throw new Error("数据库挂了")
			}
		})
		mongoose.connection.on('error', err => { //档出错时报出错误
			maxConnectTimes++
			if (maxConnectTimes < 5) {
				mongoose.connect(db)
			} else {
				throw new Error('数据库挂了吧')
			}
		})
		mongoose.connection.on('open', () => { //档成功链接数据库
			resolve();
			// const Dog = mongoose.model('Dog', {
			// 	name: String
			// });  新建表dog
			// const doga = new Dog({
			// 	name: "Lucy"
			// })	塞入数据lucy
			// doga.save().then(() => {
			// 	console.log("wang")
			// })
			console.log('成功链接数据库')
		})
	})
}