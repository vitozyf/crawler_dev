'use strict';

const Subscription = require('egg').Subscription;

let index = 0;

class updateEensurestock extends Subscription {
  static get schedule() {
    return {
      cron: '*/12 * * * *',
      type: 'all'
    };
  }

  async subscribe() {
    const { Hotmodels } = this.ctx.app.Cache;
    if (index > Hotmodels.length) {
      index = 0;
      return;
    }

    if (Hotmodels.length > 0) {
      if (Hotmodels[index]) {
        await this.ctx.service.crawler.getModelDetails(Hotmodels[index].model);
      }
      index++;
    }
  }
}

module.exports = updateEensurestock;
