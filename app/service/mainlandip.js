const crypto = require('crypto');

const Service = require('egg').Service;

const db = require('../db/models');

const superagent = require('superagent');
const cheerio = require('cheerio');

const url =
  'http://raw.githubusercontent.com/ym/chnroutes2/master/chnroutes.txt';

class MainlandIP extends Service {
  getMainlandIPDom() {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .set(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
        )
        .set(
          'If-None-Match',
          "W/'465141146ee86f3abea608a04333d73dcdabf2c29dab0b1b5941709446fa4076'"
        )
        .end((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    });
  }
  async getMainlandIPDatas() {
    const Dom = await this.getMainlandIPDom();
    const IpDatas = Dom.text
      .split('\n')
      .filter(item => !!item && item[0] !== '#')
      .map(ip => {
        return {
          id: crypto
            .createHash('md5')
            .update(ip)
            .digest('hex'),
          ip
        };
      });
    const res = await db.MainlandChinaIp.bulkCreate(IpDatas, {
      updateOnDuplicate: ['ip']
    });
    return res;
  }
}

module.exports = MainlandIP;
