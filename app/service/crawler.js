const Service = require('egg').Service;

const db = require('../db/models');

const superagent = require('superagent');
const cheerio = require('cheerio');

const hotmodelUrl = 'https://www.bom.ai/hotmodel';
const modelDetailUrl = 'http://www.bom.ai/ensurestock';

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
    return data;
  }

  async getHotmodelData() {
    const DomData = await this.getUrlRes(hotmodelUrl);
    const data = await this.analyzeRes(DomData);
    let res = null;
    try {
      res = await db.HotModel.bulkCreate(data, {
        updateOnDuplicate: ['model', 'updatedTime', 'updatedAt']
      });
    } catch (error) {
      throw error;
    }
    return res;
  }

  async getHotmodels() {
    try {
      const res = await db.HotModel.findAll();
      return res;
    } catch (err) {
      throw err;
    }
  }

  getEnsurestockData(res) {
    const $ = cheerio.load(res.text);
    const data = [];
    $('.bom_Merchant_list .stock-view').each((i, elem) => {
      const _this = $(elem);
      const Merchant = _this
        .find('.bom_Merchant_hidtwo')
        .text()
        .trim()
        .split('|');
      const QtyString = _this
        .find('.cell-qty')
        .text()
        .trim();
      data.push({
        supplierName: _this
          .find('.supplier-name a')
          .text()
          .trim(),
        model: _this
          .find('.model .bomID_Merchant_XH')
          .text()
          .trim(),
        wty: Number(QtyString) ? Number(QtyString) : null,
        inventory: _this
          .find('.bom_Merchant_time span')
          .text()
          .trim(),
        brand: _this
          .find('.cell-brand')
          .text()
          .trim(),
        package: _this
          .find('.cell-package')
          .text()
          .trim(),
        year: _this
          .find('.cell-batch')
          .text()
          .trim(),
        warehouse: _this
          .find('.bomID_addcard')
          .text()
          .trim(),
        instructions: Merchant[0] ? Merchant[0].trim() : '',
        quality: Merchant[1] ? Merchant[1].trim() : '',
        delivery: Merchant[2] ? Merchant[2].trim() : '',
        price: _this
          .find('.Bom_Merchant_guan')
          .text()
          .trim(),
        qq: _this.find('.bomID_Merchant_Qbtn.qq').data('qq')
      });
    });
    return data;
  }

  async getModelDetails(model = 'STM8S003F3P6') {
    const DomData = await this.getUrlRes(`${modelDetailUrl}/${model}.html`);
    const data = await this.getEnsurestockData(DomData);
    let res = null;
    try {
      res = await db.EnsureStock.bulkCreate(data);
    } catch (err) {
      throw err;
    }
    return res;
  }
}

module.exports = Crawler;
