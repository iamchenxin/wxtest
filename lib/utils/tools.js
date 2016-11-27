'use strict';

const util = require('util');

function JSONstring(ob) {
  return JSON.stringify(ob, null, 2);
}

function log() {
  console.log.apply(null, arguments);
}

function warn() {
  console.warn.apply(null, arguments);
}

function format(v) {
  return util.inspect(v, { depth: null });
}

function formatProp(v) {
  if (typeof v === 'object' && v != null) {
    const ob = v;
    const str = Object.keys(ob).map(key => {
      return `${ key }:<br/>\n ${ util.inspect(ob[key], { depth: null }) }\n\n\n`;
    }).join('<br/>\n');
    return str;
  } else {
    return format(v);
  }
}

module.exports = {
  JSONstring,
  format,
  formatProp
};
//# sourceMappingURL=tools.js.map
