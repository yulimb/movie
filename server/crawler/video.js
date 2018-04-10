//爬取详情页
const puppeteer = require('puppeteer');

const base = `https://movie.douban.com/subject/`;
const videoBase = `https://movie.douban.com/trailer/26710532/#content`;
const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
});
process.on('message', async movies => {

	console.log('Start visit the target page');


	const browser = await puppeteer.launch({
		args: ['--no-sandbox'], //非沙箱模式
		dumpio: false
	})

	const page = await browser.newPage(); //打开浏览器,开新页面
	for (var i = 0; i < movies.length; i++) {
		let doubanId = movies[i].doubanId
		await page.goto(base + doubanId, {
			waitUntil: 'networkidle2', //等待网络空闲，即页面打开完毕
		})

		await sleep(1000); //等待三秒
		const result = await page.evaluate(() => {

			var $ = window.$; //因为页面上已经加载了jquery，所以可以直接拿来用
			var it = $(".related-pic-video");
			if (it && it.length > 0) {
				var link = it.attr("href"); //视频详情地址
				var cover = it.find("img").attr("src"); //视频图片
				return {
					link,
					cover
				}
			}

			return {};
		})
		let video;
		if (result.link) {
			await page.goto(result.link, {
				waitUntil: "networkidle2"
			});
			await sleep(2000);
			video = await page.evaluate(() => {
				var $ = window.$;
				var it = $("source");
				if (it && it.length > 0) {
					return it.attr("src");
				}
				return '';
			});
		}
		const data = {
			video,
			doubanId,
			cover: result.cover
		}
		process.send(data) //发送子进程
	}
	browser.close(); //关闭浏览器
	process.exit(0) //关闭子进程
})