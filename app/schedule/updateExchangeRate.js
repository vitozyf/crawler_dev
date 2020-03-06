'use strict';

const Subscription = require('egg').Subscription;

class UpdateExchangeRate extends Subscription {
  static get schedule() {
    return {
      cron: '* */1 * * *',
      type: 'all'
    };
  }

  async subscribe() {
    await this.ctx.service.exchangeRate.getExchangeRates();
  }
}

module.exports = UpdateExchangeRate;
