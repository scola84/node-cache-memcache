export default class MemCache {
  constructor() {
    this._storage = null;
    this._lifetime = 0;
  }

  destroy() {}

  storage(value) {
    if (typeof value === 'undefined') {
      return this._storage;
    }

    this._storage = value;
    return this;
  }

  lifetime(value) {
    if (typeof value === 'undefined') {
      return this._lifetime;
    }

    this._lifetime = value;
    return this;
  }

  get(key, callback = () => {}) {
    this._storage.get(key, (error, data) => {
      if (error) {
        callback(error);
        return;
      }

      callback(null, data ? JSON.parse(data) : null);
    });
  }

  set(key, value, lifetime, callback = () => {}) {
    if (typeof lifetime === 'function') {
      callback = lifetime;
      lifetime = null;
    }

    lifetime = (lifetime || this._lifetime) / 1000;
    this._storage.set(key, JSON.stringify(value), lifetime, callback);
  }

  delete(key, callback = () => {}) {
    this._storage.del(key, callback);
  }
}
