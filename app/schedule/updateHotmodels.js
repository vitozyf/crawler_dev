'use strict';

const Subscription = require('egg').Subscription;

class UpdateHotmodels extends Subscription {
	static get schedule() {
    return {
			// interval: '1m', // 1 分钟间隔
			cron: '0 3 * * *',
			// cron: '*/5 * * * * *',
			type: 'all', // 指定所有的 worker 都需要执行
    };
	}
	
	async subscribe() {
		this.ctx.logger.info('定时任务日志', (new Date()).toLocaleString())
   await this.ctx.service.crawler.getHotmodelData();
  }
}

module.exports = UpdateHotmodels;