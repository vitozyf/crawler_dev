
const Service = require('egg').Service;

const superagent = require('superagent');
const cheerio = require('cheerio');

const reptileUrl = 'https://www.bom.ai/hotmodel';

class Crawler extends Service {
	async getJianshuIndexDomData() {
		try {
			return await superagent.get(reptileUrl);
		} catch (err) {
			throw err;
		}
  }

  async analyzeRes(res) {
    const $ = cheerio.load(res.text);
    /**
     * 存放数据容器
     * @type {Array}
     */
    const data = [];
    // 获取数据
    $('#list-container .note-list li').each(function(i, elem) {
      const _this = $(elem);
      data.push({
        id: _this.attr('data-note-id'),
        // slug: _this
        //   .find('.title')
        //   .attr('href')
        //   .replace(/\/p\//, ''),
        // author: {
        //   slug: _this
        //     .find('.avatar')
        //     .attr('href')
        //     .replace(/\/u\//, ''),
        //   avatar: _this.find('.avatar img').attr('src'),
        //   nickname: replaceText(_this.find('.blue-link').text()),
        //   sharedTime: _this.find('.time').attr('data-shared-at'),
        // },
        // title: replaceText(_this.find('.title').text()),
        // abstract: replaceText(_this.find('.abstract').text()),
        // thumbnails: _this.find('.wrap-img img').attr('src'),
        // collection_tag: replaceText(_this.find('.collection-tag').text()),
      });
    });
		return data
	}
	
  async getHomeData() {
		const DomData = await this.getJianshuIndexDomData();
		// const res = await this.analyzeRes(DomData);
    return DomData.text;
  }
}

module.exports = Crawler;