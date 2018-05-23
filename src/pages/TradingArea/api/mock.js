import Mock, {Random} from '@/assets/js/mock.js'
var index = Mock.mock('http://api.com/index', {
  // "user|5-10": [{
  //   'name': '@cname', //中文名称
  //   'age|1-100': 100, //100以内随机整数  属性值100只用来确定类型
  //   'birthday': '@date("yyyy-MM-dd")', //日期
  //   'city': '@city(true)'//中国城市
  // }],
  'swiper': [{
    'imgPath': 'http://ooy41p0x9.bkt.clouddn.com/image/julong/banner1.png',
    'id': '@id'
  }, {
    'imgPath': 'http://ooy41p0x9.bkt.clouddn.com/image/julong/banner2.png',
    'id': '@id'
  }, {
    'imgPath': 'http://ooy41p0x9.bkt.clouddn.com/image/julong/banner3.png',
    'id': '@id'
  }],

  'section1': {
    'list': [{
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/Ladies1.png',
      'name': '女装',
      'id': '76'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/men1.png',
      'name': '男装',
      'id': '78'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/Digital1.png',
      'name': '数码',
      'id': '82'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/package1.png',
      'name': '箱包',
      'id': '85'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/homedecoration1.png',
      'name': '家装',
      'id': '88'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/Hometextiles1.png',
      'name': '家纺',
      'id': '89'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/householdelectrical1.png',
      'name': '家电器',
      'id': '83'
    }, {
      'imgPath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/children1.png',
      'name': '玩具/童装',
      'id': '80'
    }],
    'lis': [
      {
        'id': '3',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hkb.png',
        'name': '汉口北'
      },
      {
        'id': '28',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/oyd.png',
        'name': '欧亚达'
      },
      {
        'id': '18',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jjdlsc.png',
        'name': '暨济电力商城'
      },
      {
        'id': '8',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/zsdd.png',
        'name': '中山大道'
      },
      {
        'id': '25',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/dfjd.png',
        'name': '多福家电'
      },
      {
        'id': '2',
        'imgurl': 'http://ooy41p0x9.bkt.clouddn.com/julong/images/dlk.png',
        'name': '舵落口大市场'
      },
      {
        'id': '11',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/ggbxj.png',
        'name': '光谷步行街'
      },
      {
        'id': '46',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hlds.png',
        'name': '汉来灯饰广场'
      },
      {
        'id': '32',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hxmkl.png',
        'name': '红星美凯龙'
      }
    ],
    'list1': [
      {
        'id': '@id',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/fstd.png',
        'name': '服饰天地',
        'list': [{
          'id': '4',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/mec.png',
          'name': '摩尔城',
          'company_id': '61'
        }, {
          'id': '5',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hnpgc.png',
          'name': '海宁皮革城',
          'company_id': '142'
        }, {
          'id': '7',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/njhbxj.png',
          'name': '菱角湖步行街',
          'company_id': '33'
        }, {
          'id': '9',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hzj.png',
          'name': '汉正街/汉正国际/汉正广场/品牌广场',
          'company_id': '138'
        }, {
          'id': '13',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/wsbmc.png',
          'name': '万商白马广场',
          'company_id': '52'
        },
        {
          'id': '12',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jdkgwgy.png',
          'name': '街道口购物公园',
          'company_id': '41'
        }]
      },
      {
        'id': '29',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jjjc.png',
        'name': '家具建材',
        'company_id': '20',
        'list': [{
          'id': '33',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/xjjj.png',
          'name': '香江家居'
        }, {
          'id': '30',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/zbmjjgc.png',
          'name': '中部名家居广场',
          'company_id': '61'
        }, {
          'id': '35',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/yygjjj.png',
          'name': '友谊国际家居',
          'company_id': '20'
        }, {
          'id': '36',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jxgjjc.png',
          'name': '金鑫国际建材',
          'company_id': '61'
        }, {
          'id': '40',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/yxjj.png',
          'name': '月星家居/南国大家装',
          'company_id': '61'
        }, {
          'id': '27',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/lykjjj.png',
          'name': '龙阳康家家居',
          'company_id': '61'
        }, {
          'id': '45',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jrzj.png',
          'name': '居然之家',
          'company_id': '61'
        }, {
          'id': '42',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jssdjj.png',
          'name': '家盛时代家居',
          'company_id': '61'
        }, {
          'id': '31',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hmjjjgc.png',
          'name': '好美家家居广场',
          'company_id': '61'
        }, {
          'id': '44',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/ngds.png',
          'name': '南国灯饰',
          'company_id': '61'
        }, {
          'id': '34',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/cqds.png',
          'name': '长青灯饰城',
          'company_id': '61'
        }, {
          'id': '47',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hqjj.png',
          'name': '红旗家居',
          'company_id': '61'
        }, {
          'id': '48',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hfjsjj.png',
          'name': '合富金生家居',
          'company_id': '61'
        }, {
          'id': '29',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/jlkxjjjc.png',
          'name': '金龙凯旋家居建材',
          'company_id': '61'
        }, {
          'id': '38',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hpdsj.png',
          'name': '和平大世界',
          'company_id': '61'
        }, {
          'id': '41',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/stjcjj.png',
          'name': '生态建材家居',
          'company_id': '61'
        }]
      },
      {
        'id': '20',
        'imgurl': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/smdsc.png',
        'name': '数码大商城',
        'company_id': '61',
        'list': [{
          'id': '24',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/dzl.png',
          'name': '大智路'
        }, {
          'id': '19',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hztxsmc.png',
          'name': '华中通讯数码城',
          'company_id': '61'
        }, {
          'id': '23',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/hsgczbl.png',
          'name': '洪山广场中北路',
          'company_id': '61'
        }, {
          'id': '21',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/dndsj.png',
          'name': '电脑大世界',
          'company_id': '61'
        }, {
          'id': '22',
          'imgpath': 'http://ozrdx2iqj.bkt.clouddn.com/julong/img/njdngc.png',
          'name': '南极地电脑广场',
          'company_id': '61'
        }]
      }
    ]
  },
  'section2|10': {
    'list|10': [{
      'title': '@first',
      'price|99-1000': 100,
      'intro': Random.paragraph(),
      'imgPath': Random.image('#dec4e0', '#333', 'png', ''),
      'id': '@id'
    }],
    'lis|4': [{
      'title': '@first',
      'price|99-1000': 100,
      'intro': Random.paragraph(),
      'imgPath': Random.image('100x90', '#FF7F50', '#333', 'png', ''),
      'id': '@id'
    }],
    'banner': Random.image('400x100', '#b97cc9', '#FFF', 'png', 's2-banner')
  },

  'section3': {
    'list|4': [{
      'title': '@last',
      'start': Random.time('HH:mm'),
      // 在end数组里随机取一个
      'imgPath': Random.image('320x200', '#f5f2a5', '#333', 'png', ''),
      'id': '@id',
      'price|99-1000': 100,
      'end|1': ['2017/09/23 02:00:00', '2017/09/23 11:00:00', '2017/09/23 14:00:00', '2017/09/23 13:00:00']
    }],

    'banner': Random.image('400x100', '#30f673', '#FFF', 'png', 's3-banner')

  },

  'section4': {
    'list|4': [{
      'title': '@first',
      'imgPath': Random.image('400x400', '#e2f630', '#333', 'png', ''),
      'price|99-1000': 100,
      'intro': Random.paragraph(),
      'id': '@id'
    }],
    'banner': Random.image('400x100', '#ffcc33', '#FFF', 'png', 's4-banner')
  }

})

/* var detail = Mock.mock('http://api.com/detail', {
  'view|1': [{
    'title|1': ['一加手机5 (A5000) 全网通  移动联通电信4G手机', '三星 Galaxy S8 移动联通电信4G手机 ', '荣耀9 全网通 标配版 4GB+64GB 移动联通电信4G手机 ', 'OPPO R11 全网通 手机', '小米6 全网通 6GB+128GB 陶瓷尊享版 移动联通电信4G手机 ', '新诺基亚（NOKIA）105 移动联通2G手机 老人手机', '小辣椒 红辣椒4A 标准版  全网通 移动联通电信4G手机 ', '锤子 坚果Pro 全网通 移动联通电信4G手机 ', '360手机 N5 全网通 移动联通电信4G手机 ', '乐视 S3 爵迹版  移动联通电信4G手机 '
    ],
    'intro': Random.cparagraph(2),
    'id': '@id',
    'price|99-1000': 100,
    'chose|3': [{
      'col|+1': ['土豪金', '东北银', '喜庆红'],
      'size|+1': ['128g', '64g', '32g']
    }]
  }],

  'swiper|2': [{
    'imgSrc': Random.image('400x400', '#ffcc33', '#FFF', 'png', ''),
    'id': '@id'
  }],

  'contentImgSrc|8': [{
    'imgSrc': Random.image('600x600', '#5a9e6e', '#FFF', 'png', '')
  }]
}) */

var detail = Mock.mock('http://api.com/shopdetail', {
  'swiper|5': [{
    'imgPath': Random.image('400x400', '#ffcc33', '#FFF', 'png', ''),
    'id': '@id'
  }]
})

var category = Mock.mock('http://api.com/category', {
  'aside|14': [{
    'title': '@cname',
    'list|60': [{
      'title': '@last',
      'imgPath': Random.image('2000x2000', '#5169b4', '#FFF', 'png', '')

    }]
  }]
})

var shop = Mock.mock('http://api.com/shop', {

  'shop_content': [{
    'id': '@id',
    'title': '@first',
    'message': '加绒超级保暖袜子爱不释脚',
    'price': '129',
    'people': '645',
    'imgPath': './static/images/kdl.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '少女心粉嫩粉嫩的袜子快入手',
    'price': '129',
    'people': '60',
    'imgPath': './static/images/kbd.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '能治愈失恋情结的加绒超厚袜子温暖你过冬',
    'price': '129',
    'people': '3000',
    'imgPath': './static/images/kkt.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '超好看卡通珊瑚袜',
    'price': '129',
    'people': '2',
    'imgPath': './static/images/kly.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '不想编了，就是袜子',
    'price': '129',
    'people': '6.6',
    'imgPath': './static/images/knz.jpg'
  }],

  'shop_new': [{
    'id': '@id',
    'title': '@first',
    'message': '加绒超级保暖袜子爱不释脚',
    'price': '345',
    'people': '645',
    'imgPath': './static/images/cls.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '少女心粉嫩粉嫩的袜子快入手',
    'price': '129',
    'people': '60',
    'imgPath': './static/images/ctx.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '能治愈失恋情结的加绒超厚袜子温暖你过冬',
    'price': '126',
    'people': '3000',
    'imgPath': './static/images/cxf.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '超好看卡通珊瑚袜',
    'price': '130',
    'people': '2',
    'imgPath': './static/images/cxx.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '不想编了，就是袜子',
    'price': '450',
    'people': '6.6',
    'imgPath': './static/images/cyd.jpg'
  }, {
    'id': '@id',
    'title': '@first',
    'message': '最新款袜子',
    'price': '100',
    'people': '6.6',
    'imgPath': './static/images/czz.jpg'
  }]
})

var tread = Mock.mock('http://api.com/tread', {
  'classify': {
    'box': [{
      'name': '男包'
    }, {
      'name': '钱包'
    }, {
      'name': '箱子'
    }],
    'address': [{
      'address': '楚河汉街',
      'store': '1',
      'shop': [{
        'sname': '蒙娜丽莎包包店',
        'sdis': '全场八折起',
        'level': '巨龙旗舰店',
        'address': '楚河汉界1号店'
      }, {
        'sname': '潮包店',
        'sdis': '全场九折起',
        'level': '巨龙旗舰店',
        'address': '楚河汉界2号店'
      }, {
        'sname': '龙猫包店',
        'sdis': '',
        'level': '巨龙旗舰店',
        'address': '楚河汉界3号店'
      }]
    }, {
      'address': '汉口北',
      'store': '2',
      'shop': [{
        'sname': '鲨鱼包店',
        'sdis': '今日促销',
        'level': '巨龙品牌店',
        'address': '汉口北1号店'
      }, {
        'sname': '潮包店（汉口北店）',
        'sdis': '全场九折',
        'level': '巨龙品牌店',
        'address': '汉口北2号店'
      }]
    }, {
      'address': '江汉路',
      'store': '3',
      'shop': [{
        'sname': '旅行创意店',
        'sdis': '全场八折起',
        'level': '巨龙旗舰店',
        'address': '江汉路1号店'
      }, {
        'sname': '不想起名字了的店',
        'sdis': '',
        'level': '巨龙旗舰店',
        'address': '江汉路2号店'
      }, {
        'sname': '就这样店',
        'sdis': '全场九折起',
        'level': '巨龙旗舰店',
        'address': '江汉路3号店'
      }]
    }, {
      'address': '光谷步行街',
      'store': '4',
      'shop': [{
        'sname': '又要起名字店',
        'sdis': '一律2元',
        'level': '巨龙品牌店',
        'address': '光谷步行街1号店'
      }, {
        'sname': '潮包店（光谷步行街）',
        'sdis': '今日促销',
        'level': '巨龙旗舰店',
        'address': '光谷步行街2号店'
      }, {
        'sname': '出差店',
        'sdis': '全场一折',
        'level': '巨龙旗舰店',
        'address': '光谷步行街3号店'
      }]
    }, {
      'address': '虎泉',
      'store': '5',
      'shop': [{
        'sname': '就一家店',
        'sdis': '全场八折',
        'level': '巨龙旗舰店',
        'address': '虎泉1号店'
      }]
    }, {
      'address': '户部巷',
      'store': '6',
      'shop': [{
        'sname': '终于完了店',
        'sdis': '全场八折',
        'level': '巨龙旗舰店',
        'address': '户部巷1号店'
      }, {
        'sname': '潮包店',
        'sdis': '全场九折',
        'level': '巨龙旗舰店',
        'address': '户部巷2号店'
      }]
    }]
  }
})

export {index, detail, category, shop, tread}
