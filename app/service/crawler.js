
const Service = require('egg').Service;

const db = require('../db/models')

const superagent = require('superagent');
const cheerio = require('cheerio');

const reptileUrl = 'https://www.bom.ai/hotmodel';

class Crawler extends Service {
	async getHotmodelDomData() {
		try {
			return await superagent.get(reptileUrl);
		} catch (err) {
			throw err;
		}
  }

  async analyzeRes(res) {
    const $ = cheerio.load(res.text);
    const data = [];
    // 获取数据
    $('.bom_content .bom_second_cell .bom_second_xhs').each((i, elem) => {
			const _this = $(elem);
			const heatString = _this.find('.bom_second_icon').text();
			if (!isNaN(heatString)) {
				data.push({
					id: Number(heatString),
					model: _this.find('p a').text(),
					updatedTime: (new Date()).toLocaleString()
				});
			}
    });
		return data
	}
	
  async getHotmodelData() {
		const DomData = await this.getHotmodelDomData();
		const data = await this.analyzeRes(DomData);
		let res = null;
		try {
			res = await db.HotModel.bulkCreate(data, {updateOnDuplicate: ['model', 'updatedTime', 'updatedAt']});
		} catch (error) {
			throw error
		}
    return res;
  }
}

module.exports = Crawler;