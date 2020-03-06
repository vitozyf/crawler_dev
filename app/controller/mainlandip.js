'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getHotmodelData() {
    const { ctx, service } = this;
    const res = await service.crawler.getHotmodelData();
    ctx.body = res;
  }
  async getMainlandIPs() {
    const { ctx, service } = this;
    const res = await service.mainlandip.getMainlandIPDatas();
    ctx.body = res;
  }
}

module.exports = HomeController;
