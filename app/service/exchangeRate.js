'use strict';

const Service = require('egg').Service;

const db = require('../db/models');

const superagent = require('superagent');
const cheerio = require('cheerio');

const crypto = require('crypto');

const url = 'https://www.boc.cn/sourcedb/whpj/index';

class ExchangeRate extends Service {
  async getExchangeRateDom(pageIndex = 1) {
    return await superagent.get(
      pageIndex > 1 ? `${url}_${pageIndex - 1}.html` : `${url}.html`
    );
  }

  async text2Data(pageIndex = 1, pageSize = 1) {
    const DomData = await this.getExchangeRateDom(pageIndex);

    const $ = cheerio.load(DomData.text);

    const Data = [];

    $('.publish>div>table>tbody>tr').each((i, elem) => {
      if (i === 0) {
        return;
      }
      const _this = $(elem);

      const currency = _this
        .find('td')
        .eq(0)
        .text()
        .trim();

      if (currency) {
        Data.push({
          id: crypto
            .createHash('md5')
            .update(currency)
            .digest('hex'),
          currency: currency,
          spotPurchasePrice: Number(
            _this
              .find('td')
              .eq(1)
              .text()
              .trim()
          ),
          purchasePrice: Number(
            _this
              .find('td')
              .eq(2)
              .text()
              .trim()
          ),
          spotOfferPrice: Number(
            _this
              .find('td')
              .eq(3)
              .text()
              .trim()
          ),
          cashOffer: Number(
            _this
              .find('td')
              .eq(4)
              .text()
              .trim()
          ),
          bankofChinadiscountedPrice: Number(
            _this
              .find('td')
              .eq(5)
              .text()
              .trim()
          ),
          releaseDate: _this
            .find('td')
            .eq(6)
            .text()
            .trim(),
          releaseTime: _this
            .find('td')
            .eq(7)
            .text()
            .trim()
        });
      }
    });

    if (pageIndex >= pageSize) {
      return Data;
    } else {
      return Data.concat(await this.text2Data(pageIndex + 1, pageSize));
    }
  }

  async getExchangeRates() {
    const DomData = await this.getExchangeRateDom(1);
    const $ = cheerio.load(DomData.text);

    // 分页
    // const PageSize = Number($('.turn_page>p>span').text()) || 1;

    const Data = await this.text2Data(1, 1);

    const res = await db.exchangeRate.bulkCreate(Data, {
      updateOnDuplicate: [
        'currency',
        'spotPurchasePrice',
        'purchasePrice',
        'spotOfferPrice',
        'cashOffer',
        'bankofChinadiscountedPrice',
        'releaseDate',
        'releaseTime'
      ]
    });

    return res;
  }
}

module.exports = ExchangeRate;
