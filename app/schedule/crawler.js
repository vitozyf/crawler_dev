'use strict';

const Subscription = require('egg').Subscription;

const superagent = require('superagent');
const cheerio = require('cheerio');

const reptileUrl = 'http://www.jianshu.com/';

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
			type: 'all', // 指定所有的 worker 都需要执行
			disable: true
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = this.getJianshuIndexData();
    this.analyzeRes(res);
  }

  async getJianshuIndexData() {
    return superagent.get(reptileUrl).end((err, res) => {
      // 抛错拦截
      if (err) {
        throw err;
      }
      // 等待 code
      return res;
    });
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
        slug: _this
          .find('.title')
          .attr('href')
          .replace(/\/p\//, ''),
        author: {
          slug: _this
            .find('.avatar')
            .attr('href')
            .replace(/\/u\//, ''),
          avatar: _this.find('.avatar img').attr('src'),
          nickname: replaceText(_this.find('.blue-link').text()),
          sharedTime: _this.find('.time').attr('data-shared-at'),
        },
        title: replaceText(_this.find('.title').text()),
        abstract: replaceText(_this.find('.abstract').text()),
        thumbnails: _this.find('.wrap-img img').attr('src'),
        collection_tag: replaceText(_this.find('.collection-tag').text()),
        // reads_count:
        //   replaceText(
        //     _this
        //       .find('.ic-list-read')
        //       .parent()
        //       .text()
        //   ) * 1,
        // comments_count:
        //   replaceText(
        //     _this
        //       .find('.ic-list-comments')
        //       .parent()
        //       .text()
        //   ) * 1,
        // likes_count:
        //   replaceText(
        //     _this
        //       .find('.ic-list-like')
        //       .parent()
        //       .text()
        //   ) * 1,
      });
    });
    // 生成数据
    // 写入数据, 文件不存在会自动创建
    // fs.writeFile(__dirname + '/data/article.json', JSON.stringify({
    //     status: 0,
    //     data: data
    // }), function (err) {
    //     if (err) throw err;
    //     console.log('写入完成');
    // });
    console.log(data);
  }
}

module.exports = UpdateCache;
