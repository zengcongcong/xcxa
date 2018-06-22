var sliders = "#{$json}#",
	userInfo = "#{$json}#",
	address = "#{$json}#",
	homeContent = "#{$json}#",
	shortInfos = "#{$json}#",
	coupons = "#{$json}#",
	glassesType = "#{$json}#";
//-- beg
sliders = {
	"data": [{
			'src': '/ug/mall/assest/images/yuantiao.jpg',
			'href': 'www.baidu.com'
		},
		{
			'src': '/ug/mall/assest/images/shuijiao.jpg',
			'href': 'www.baidu.com'
		},
		{
			'src': '/ug/mall/assest/images/muwu.jpg',
			'href': 'www.baidu.com'
		},
		{
			'src': '/ug/mall/assest/images/cbd.jpg',
			'href': 'www.baidu.com'
		},
		{
			src: '/ug/mall/assest/images/magglass.gif',
			href: '#'
		}
	]
};
userInfo = {
	data: [{
		id: 1,
		name: '张三'
	}, {
		id: 2,
		name: '李四'
	}]
}
address = {
	data: [{
		userid: 1,
		data: [{
			address: '杭州西湖区1',
			isChecked: 0,
		}, {
			address: '杭州西湖区2',
			isChecked: 1,
		}, {
			address: '杭州西湖区3',
			isChecked: 1,
		}, {
			address: '杭州西湖区4',
			isChecked: 1,
		}, {
			address: '杭州西湖区5',
			isChecked: 1,
		}, {
			address: '杭州西湖区6',
			isChecked: 1,
		}]
	}]
}
homeContent = {
	data: [{
		"shop_type_id": 1,
		"title": '隐形相关',
		"child": [{
				id: 1,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			},
			{
				id: 2,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			},
			{
				id: 3,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			},
			{
				id: 4,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			}
		]
	}, {
		"shop_type_id": 2,
		"title": '隐形相关2',
		"child": [{
				id: 1,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			},
			{
				id: 2,
				title: '护理液',
				shortInfo: '名牌还便宜',
				img: {
					'src': '/ug/mall/assest/images/yuantiao.jpg',
					'href': 'www.baidu.com'
				}
			}
		]
	}]
};
shortInfos = {
	data: [{
		shop_type_id: 1,
		class_id: 0,
		type_id: 0,
		id: 1,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '138',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 20,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/magglass.gif',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 1,
		class_id: 0,
		type_id: 0,
		id: 2,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 30,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 1,
		class_id: 0,
		type_id: 1,
		id: 3,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 20,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 2,
		class_id: 0,
		type_id: 2,
		id: 1,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 50,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 1,
		class_id: 1,
		type_id: 0,
		id: 4,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 20,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 1,
		class_id: 2,
		type_id: 0,
		id: 4,
		fastfree: 0,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 20,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}, {
		shop_type_id: 2,
		class_id: 3,
		type_id: 0,
		id: 1,
		title: '金丝边圆形韩版潮复古平光镜圆脸文艺男配近视眼镜架超轻',
		salePrice: '139',
		price: '288',
		saleName: '特价',
		shop_stock: 2,
		shop_grid: 20,
		fastfree: 0,
		img: [{
			src: '/ug/mall/assest/images/shuijiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/cbd.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}, {
			src: '/ug/mall/assest/images/yuantiao.jpg',
			href: 'www.baidu.com',
			title: '分享'
		}]
	}]
};
/*receive:
0:未领取,1:已领取*/
coupons = {
	"data": [{
			shop_type_id: 1,
			id: 1,
			sign: '￥',
			price: 5,
			type: '消费券',
			short_info: '无门槛',
			validTime: '2017-10-31至2017-11-5',
			receive: 0
		},
		{
			shop_type_id: 1,
			id: 2,
			sign: '￥',
			price: 15,
			type: '优惠券',
			short_info: '满200元减15元',
			validTime: '2017-10-31至2017-11-5',
			receive: 1
		},
		{
			shop_type_id: 1,
			id: 3,
			sign: '￥',
			price: 10,
			type: '消费券',
			short_info: '无门槛',
			validTime: '2017-10-31至2017-11-5',
			receive: 1
		},
		{
			shop_type_id: 1,
			id: 4,
			sign: '￥',
			price: 20,
			type: '消费券',
			short_info: '满200元减15元',
			validTime: '2017-10-31至2017-11-5',
			receive: 0
		},
		{
			shop_type_id: 1,
			id: 5,
			sign: '￥',
			price: 30,
			type: '消费券',
			short_info: '无门槛',
			validTime: '2017-10-31至2017-11-5',
			receive: 0
		}
	]
};
glassesType = {
	data: [{
		shop_type_id: 1,
		id: 1,
		list: [{
			id: 1,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框1 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/yuantiao.jpg'
		}, {
			id: 2,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框2 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/cbd.jpg'
		}, {
			id: 3,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框3 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/logo.png'
		}, {
			id: 4,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框4 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/magglass.gif'
		}, {
			id: 5,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框5 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/muwu.jpg'
		}, {
			id: 6,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框6 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/shuijiao.jpg'
		}]
	}, {
		shop_type_id: 1,
		id: 2,
		list: [{
			id: 1,
			salePrice: '129',
			stock: '库存充足',
			title: '砂金框1 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/yuantiao.jpg'
		}, {
			id: 2,
			salePrice: '139',
			stock: '库存充足',
			title: '砂金框2 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/cbd.jpg'
		}, {
			id: 3,
			salePrice: '149',
			stock: '库存充足',
			title: '砂金框3 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/logo.png'
		}, {
			id: 4,
			salePrice: '159',
			stock: '库存充足',
			title: '砂金框4 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/magglass.gif'
		}, {
			id: 5,
			salePrice: '129',
			stock: '库存充足',
			title: '砂金框5 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/muwu.jpg'
		}, {
			id: 6,
			salePrice: '189',
			stock: '库存充足',
			title: '砂金框6 海蓝偏光片(送太阳镜)',
			src: '/ug/mall/assest/images/shuijiao.jpg'
		}]
	}]
}
var tmp = [coupons, shortInfos, sliders, homeContent, glassesType, userInfo, address];
for(var i in tmp) {
	tmp[i].code = 0;
	tmp[i].msg = 'ok';
}
//-- end