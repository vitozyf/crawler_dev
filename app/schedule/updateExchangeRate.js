'use strict';

const Subscription = require('egg').Subscription;

class UpdateExchangeRate extends Subscription {
  static get schedule() {
    return {
      cron: '30 * * * *',
      type: 'all'
    };
  }

  async subscribe() {
    await this.ctx.service.exchangeRate.getExchangeRates();
  }
}

module.exports = UpdateExchangeRate;
