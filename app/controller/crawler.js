'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getHotmodelData() {
    const { ctx, service } = this;
    const res = await service.crawler.getHotmodelData();
    ctx.body = res;
  }
  async getModelDetails() {
    const { ctx, service } = this;
    const res = await service.crawler.getModelDetails();
    ctx.body = res;
  }
}

module.exports = HomeController;
