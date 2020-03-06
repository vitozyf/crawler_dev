'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getHotmodelData', controller.crawler.getHotmodelData);
  router.get('/getModelDetails', controller.crawler.getModelDetails);
  router.get('/getMainlandIPs', controller.mainlandip.getMainlandIPs);
};
