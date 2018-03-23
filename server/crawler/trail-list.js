//爬取列表页
const puppeteer = require('puppeteer');

const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`;

const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})

;
(async () => {

	console.log('Start visit the target page')

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'], //非沙箱模式
		dumpio: false
	})

	const page = await browser.newPage(); //打开浏览器,开新页面

	await page.goto(url, {
		waitUntil: 'networkidle2', //等待网络空闲，即页面打开完毕
	})

	await sleep(3000); //等待三秒

	await page.waitForSelector(".more") //等页面上的more加载出来

	for (let i = 0; i < 1; i++) {

		await sleep(3000);

		await page.click('.more')
	}

	const result = await page.evaluate(() => {

		var $ = window.$; //因为页面上已经加载了jquery，所以可以直接拿来用
		var items = $(".list-wp a");
		var links = [];
		if (items.length >= 1) {
			items.each((i, item) => {
				//获取每个预告片的id，名称，图片并替换成大图，分数
				let it = $(item);
				let doubanId = it.find("div").data("id");
				let title = it.find(".title").text();
				let rate = Number(it.find(".rate").text());
				let poster = it.find("img").attr("src").replace("s_ratio_poster", "l_ratio_poster");
				//https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2501892505.jpg
				links.push({
					doubanId: doubanId,
					title: title,
					rate: rate,
					poster: poster
				})
			})
		}
		return links;
	})
	browser.close(); //关闭浏览器
	process.send({
		result
	}) //发送子进程
	process.exit(0) //关闭子进程
})()