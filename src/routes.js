import AC from './components/async_load'; //动态加载

export default [{
		name: '首页',
		icon: 'home',
		path: '/',
		component: AC(() =>
			import ('./views/home'))
	},
	// , {
	//   name: '详情页',
	//   path: '/detail/:id',
	//   component: AC(() =>
	//     import ('./views/movie/detail'))
	// },
	{
		name: '后台入口',
		icon: 'admin',
		path: '/add',
		component: AC(() =>
			import ('./views/admin/add'))
	}
	// {
	//   name: '后台电影列表',
	//   icon: 'admin',
	//   path: '/admin/list',
	//   component: AC(() =>
	//     import ('./views/admin/list'))
	// }
]