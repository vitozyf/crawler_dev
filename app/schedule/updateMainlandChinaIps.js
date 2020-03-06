'use strict';

const Subscription = require('egg').Subscription;

let index = 0;

class updateEensurestock extends Subscription {
  static get schedule() {
    return {
      cron: '0, 30 20 * * *',
      type: 'all'
    };
  }

  async subscribe() {
    await this.ctx.service.mainlandip.getMainlandIPDatas();
  }
}

module.exports = updateEensurestock;
