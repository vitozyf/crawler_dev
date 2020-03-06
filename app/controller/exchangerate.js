'use strict';

const Controller = require('egg').Controller;

class ExchangeRate extends Controller {
  async getExchangeRates() {
    const { ctx, service } = this;
    const res = await service.exchangeRate.getExchangeRates();
    ctx.body = res;
  }
}

module.exports = ExchangeRate;
