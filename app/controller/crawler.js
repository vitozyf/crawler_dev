'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async jianshu() {
		const { ctx, service } = this; 
		const res = await service.crawler.getHomeData();
    ctx.body = res;
  }
}

module.exports = HomeController;
