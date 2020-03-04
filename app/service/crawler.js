
const Service = require('egg').Service;

const db = require('../db/models')

const superagent = require('superagent');
const cheerio = require('cheerio');

const hotmodelUrl = 'https://www.bom.ai/hotmodel';
const modelDetailUrl = "https://www.bom.ai/ensurestock/"

class Crawler extends Service {
	async getUrlRes(url) {
		try {
			return await superagent.get(url);
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
					updatedTime: new Date()
				});
			}
    });
		return data
	}
	
  async getHotmodelData() {
		const DomData = await this.getUrlRes(hotmodelUrl);
		const data = await this.analyzeRes(DomData);
		let res = null;
		try {
			res = await db.HotModel.bulkCreate(data, {updateOnDuplicate: ['model', 'updatedTime', 'updatedAt']});
		} catch (error) {
			throw error
		}
    return res;
	}
	
	async getModelDetails(model = 'STM8S003F3P6'){
		let  DomData = null;
		// return `${modelDetailUrl}${model}.html`
		try {
			DomData = await superagent.get('https://s.hqew.com/BM43THA80C.html');
		} catch (err) {
			throw err;
		}
		return DomData
	}
}

module.exports = Crawler;