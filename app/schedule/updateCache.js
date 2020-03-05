'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      cron: '0 4 * * *',
      type: 'all',
      immediate: true
    };
  }

  async subscribe() {
    this.ctx.app.Cache.Hotmodels = await this.ctx.service.crawler.getHotmodels();
  }
}

module.exports = UpdateCache;
