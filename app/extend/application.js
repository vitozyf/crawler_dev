const CACHE_NAME = Symbol('Application#cache');

const Cache = {
  Hotmodels: []
};

module.exports = {
  get Cache() {
    return this[CACHE_NAME] || Cache;
  },

  set Cache(cache) {
    Object.assign(this[CACHE_NAME], cache);
  }
};
