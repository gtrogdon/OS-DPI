import merge from "./_snowpack/pkg/mergerino.js";

export class State {
  constructor(persistKey = "") {
    this.persistKey = persistKey;
    /** @type {Set<function>} */
    this.listeners = new Set();
    /** @type {Object} */
    this.values = {};
    /** @type {Set<string>} */
    this.updated = new Set();
    if (this.persistKey) {
      /* persistence */
      const persist = window.sessionStorage.getItem(this.persistKey);
      if (persist) {
        this.values = JSON.parse(persist);
      }
    }
  }

  /** unified interface to state
   * @param {string} [name] - possibly dotted path to a value
   * @param {any} defaultValue
   * @returns {any}
   */
  get(name, defaultValue = undefined) {
    if (name && name.length) {
      return name
        .split(".")
        .reduce((o, p) => (o ? o[p] : defaultValue), this.values);
    } else {
      return undefined;
    }
  }

  /**
   * update the state with a patch and invoke any listeners
   *
   * @param {Object} patch - the changes to make to the state
   * @return {void}
   */
  update = (patch = {}) => {
    for (const key in patch) {
      this.updated.add(key);
    }
    this.values = merge(this.values, patch);
    for (const callback of this.listeners) {
      callback();
    }

    if (this.persistKey) {
      const persist = JSON.stringify(this.values);
      window.sessionStorage.setItem(this.persistKey, persist);
    }
  };
  /** observe - call this function when the state updates
   * @param {Function} callback
   */
  observe(callback) {
    this.listeners.add(callback);
  }

  /** return true if the given state has been upated since last you asked
   * @param {string} stateName
   * @returns boolean
   */
  hasBeenUpdated(stateName) {
    const result = this.updated.has(stateName);
    if (result) {
      this.updated.delete(stateName);
    }
    return result;
  }

  /** define - add a named state to the global system state
   * @param {String} name - name of the state
   * @param {any} defaultValue - value if not already defined
   */
  define(name, defaultValue) {
    // handle dotted names
    const patch = {};
    let p = patch;
    let dots = name.split(".");
    let i = 0;
    for (; i < dots.length - 1; i++) {
      p = p[dots[i]] = {};
    }
    p[dots[i]] = (/** @type {any} */ currentValue) =>
      currentValue || defaultValue;
    this.update(patch);
  }
  /** interpolate
   * @param {string} input
   * @returns {string} input with $name replaced by values from the state
   */
  interpolate(input) {
    let result = input.replace(/(\$[a-zA-Z0-9_.]+)/, (_, name) =>
      this.get(name)
    );
    result = result.replace(/\$\{([a-zA-Z0-9_.]+)}/, (_, name) =>
      this.get("$" + name)
    );
    return result;
  }
  /**
   * Normalize tags
   *
   * @param {string[]} tags - Tags that must be in each row
   * @return {string[]} normalized tags as an array
   */
  normalizeTags(tags) {
    /** @type {string[]} tags */
    // normalize
    return tags
      .map((t) => {
        if (t.startsWith("$")) return this.get(t) || "";
        else return t;
      })
      .filter((t) => t.length)
      .flat();
  }
}